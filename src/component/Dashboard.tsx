import React, { useEffect, useRef, useState} from 'react';
import {options} from '../UseData';
import ItemFilter from "./ItemFilter";
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Switch from '@material-ui/core/Switch';
import {Theme, makeStyles, createStyles,withStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
    DashBoard:{
        padding:'40px 83px',
        [theme.breakpoints.down(670)]: {
            padding:'24px 20px',
        }
    },
    TitleBox:{
        display:'flex',
        flexDirection:'column',
    },
    Title:{
        width:'97px',
        height:'32px',
        fontSize:'20px',
        lineHeight:'32px',
        fontWeight:600
    },
    Content:{
        width:'284px',
        height:'24px',
        fontSize:'16px',
        color:'#323D45'
    },
    FilterBtn:{
        display:'flex',
        flexDirection:'row',
        [theme.breakpoints.down(670)]: {
        flexWrap:'wrap'
    }
    },
    DropDownBox:{
        display:'flex',
        flexFlow:'row nowrap',
        gap:'8px',
        height:'32px',
        marginTop:'32px',
    },
    DropDown:{
        display:'flex',
        gap:'12px',
        height:'32px',
        padding:'4px 12px',
        alignItems:'center',
        fontSize:'12px',
        border:'1px solid #939FA5',
        boxSizing:'border-box',
        borderRadius:'4px',
        cursor:'pointer',
        whiteSpace:'nowrap',
        "&:hover":{
            border: '1px solid #2196F3'
        }
    },
    CheckboxList:{
        position:'absolute',
        display:'none',
        gap:'8px',
        width:'130px',
        marginTop:'4px',
        padding:'16px 12px',
        border:'1px solid #939FA5',
        borderRadius:'4px',
        backgroundColor:'#FFFFFF',
        flexFlow:'column nowrap',
        [theme.breakpoints.down(670)]: {
            zIndex:'999',
        }
    },
    ItemList:{
        display:'flex',
        gap:'10px',
        height:'20px',
        fontSize:'14px',
        lineHeight:'20px'
    },
    ResetBtn:{
        display:'none',
        gap:'8px',
        width:'110px',
        height:'32px',
        marginTop:'32px',
        marginLeft:'12px',
        fontSize:'12px',
        lineHeight:'32px',
        color:'#2196F3',
        backgroundColor:'rgba(255,255,255,0)',
        cursor:'pointer',
        whiteSpace:'nowrap',
    },
    Toggle:{
        display:'flex',
        flexFlow:'row',
        gap:'16px',
        height:'32px',
        padding:'1px',
        marginTop:'32px',
        marginLeft:'auto',
        fontSize:'14px',
        lineHeight:'32px',
        whiteSpace:'nowrap',
        [theme.breakpoints.down(670)]: {
            width:'100%',
            margin:'20px auto 0 0',
        }

    }

}))

const ToggleSwitch = withStyles({
    root:{
        padding:'0px',
        height:'32px',
        zIndex:-1
    },
    switchBase: {
        padding:'0px',
        left:'15%',
        top:'20%',
        color: '#F5F5F5',
        '&$checked': {
            color: '#2196F3',
        },
        '&$checked + $track': {
            backgroundColor: '#BBDEFB',
        },
    },
    checked: {},
    track: {
        position:'relative',
        width:'34px',
        height:'14px',
        left:'50%',
        top:'50%',
        transform:'translate(-50%,-50%)',
        backgroundColor:'#C2C2C2'
    },
})(Switch);

const Dashboard = () => {
    const classes = useStyles();                                                              //스타일 적용을 위한 상수
    const listRef = useRef<HTMLDivElement>(null);                                             //클릭 이벤트 요소를 지정하기위한 상수
    const [toggle, setToggle] = useState<boolean>(false);                                     //토글 스위치 제어를 위한 변수
    const [procbtn,setProcbtn] = useState<number>(0);                                         //가공방식 드롭다운 리스트에서 선택한 옵션을 담기위한 변수
    const [matbtn,setMatbtn] = useState<number>(0);                                           //재료 드롭다운 리스트에서 선택한 옵션을 담기위한 변수
    const [filter, setFilter] = useState<string[]>([]);                                       //필터 항목을 담기위한 변수
    

    useEffect(() => {
        const handleClose = (e: MouseEvent): void => {                                        //드롭다운 요소 외에 클릭시 드롭다운을 닫는 이벤트 함수
            const ProcList = document.getElementById("ProcessList") as HTMLDivElement                
            const MatBtn = document.getElementById("MaterialList") as HTMLDivElement                 
            if(listRef.current && !listRef.current.contains(e.target as Node)){               //드롭다운 요소 내부에서에서 클릭이 일어났는지 판단하는 구문
                ProcList.style.display = "none"                                               //드롭다운 요소가 아닐경우 드롭다운 리스트 숨기기
                MatBtn.style.display = "none"
            }
        }
        document.addEventListener('mousedown',handleClose);                                    //클릭 이벤트가 발생할 경우 handlClose 함수 호출
        return () =>  document.removeEventListener('mousedown', handleClose);
    },[listRef])

    const handleClick = (type:string):void =>{                                                      //드롭다운 클릭 이벤트 함수
        let none = (type === "MaterialList") ? "ProcessList" : "MaterialList"                  //클릭한 필터를 구분을 위한 변수
        const ClickEle = document.getElementById(type) as HTMLDivElement                       //드롭다운 엘리먼트 style속성 제어를 위한 상수 선언
        const NoneEle = document.getElementById(none) as HTMLDivElement

        if(ClickEle.style.display  === "flex"){                                                //열려있는 드롭다운의 경우 닫기위한 구문
            ClickEle.style.display = "none"
        }else if(type){                                                                        //드롭다운이 열려있지 않은 경우
            ClickEle.style.display = "flex"
            NoneEle.style.display = "none"
        }
    }

    const handleCheck = (isChecked:boolean, item:string):void => {                                   //체크박스 체크 이벤트 함수
        if(isChecked){                                                                          //체크되었다면 필터 변수에 추가
            setFilter(filter => filter.concat(item))
        }else{
            setFilter(filter.filter((val) => val !== item))                                     //체크가 풀렸다면 해당 필터 변수에서 제거
        }
        handleBtn(isChecked, item)                                                              //드롭다운 버튼 style속성 제어를 위한 함수
        handleReset(isChecked, item)                                                            //필터 리셋 버튼 이벤트 함수
    }

    const handleBtn = (isChecked:boolean, item:string):void => {                                     //필터(드롭다운) 버튼 style속성 제어를 위한 함수      
        const ProcBtn = document.getElementById("ProcessBtn") as HTMLDivElement                 //가공방식 드롭다운 스타일 제어를 위한 상수
        const MatBtn = document.getElementById("MaterialBtn") as HTMLDivElement                 //재료 드롭다운 스타일 제어를 위한 상수
        const ItemType = (options.process.indexOf(item) > -1) ? ProcBtn : MatBtn;               //체크박스 클릭이벤트가 일어난 드롭다운을 구분하기 위한 상수
        
        if(isChecked){                                                                          //체크되었다면 style속성 변경
            ItemType.style.color = "#FFFFFF"
            ItemType.style.backgroundColor = "#1565C0"
            {ItemType === ProcBtn ? setProcbtn(procbtn + 1) : setMatbtn(matbtn + 1) }            //해당 드롭다운 체크 갯수 증가

        }else{
            if((ItemType === ProcBtn && procbtn === 1) || (ItemType === MatBtn && matbtn === 1)){      //체크가 해제되고 하나만 체크되어있을 경우 해당 버튼 style속성 변경
                ItemType.style.color = "#000"
                ItemType.style.backgroundColor = "#FFFFFF"
            }
            {ItemType === ProcBtn ? setProcbtn(procbtn - 1) : setMatbtn(matbtn - 1) }           //하나만 체크된 경우가 아니면 체크된 갯수 감소
        }
    }

    const handleToggle = ():void => setToggle(!toggle)                                               //토글 스위치 클릭 이벤트 함수
        
    

    const handleReset = (isChecked:boolean, item:string):void => {                                   //필터 리셋 버튼 이벤트 함수
        const ResetStyle = document.getElementById("FilterReset") as HTMLDivElement
        const ProcBtn = document.getElementById("ProcessBtn") as HTMLDivElement                 //가공방식 드롭다운 스타일 제어를 위한 상수
        const MatBtn = document.getElementById("MaterialBtn") as HTMLDivElement                 //재료 드롭다운 스타일 제어를 위한 상수

        if(isChecked){                                                                          //체크된 항목이 있을경우 표시
            ResetStyle.style.display = "flex"
        }else{
            if(filter.length === 1){                                                            //체크가 해제되고 필터항목이 1개였을경우
                ResetStyle.style.display = "none"                                               //리셋 버튼 숨기기
            }

            if(item === 'button'){                                                              //리셋버튼이 클릭된 경우
                setFilter([])                                                                   //필터 초기화
                setProcbtn(0)                                                                   //드롭다운 초기화
                setMatbtn(0)                                                                    

                ResetStyle.style.display = "none"                                               //리셋 버튼 숨기기
                ProcBtn.style.color = "#000"                                                  //드롭다운 스타일 초기화
                ProcBtn.style.backgroundColor = "#FFFFFF"
                MatBtn.style.color = "#000"
                MatBtn.style.backgroundColor = "#FFFFFF"
            }
        }
    }

    return(
        <>
            <Container maxWidth="lg" className={classes.DashBoard}>
                <CssBaseline/>    
                    <div className={classes.TitleBox}>
                        <span className={classes.Title}>들어온 요청</span>
                        <span className={classes.Content}>파트너님에게 딱 맞는 요청서를 찾아보세요.</span>
                    </div>

                    <div className={classes.FilterBtn}>
                    <div className={classes.DropDownBox} ref={listRef}>
                        <div>
                            <div id="ProcessBtn" className={classes.DropDown} style={{minWidth:'98px',maxWidth:'113px'}} onClick={() => handleClick("ProcessList")}>
                                { procbtn === 0 ? "가공방식" : `가공방식(${procbtn})`}
                                { procbtn === 0 ? <img src="img/arrow_drop_down.png" style={{width:'10px',height:'5px'}} alt="no arrow img"/>
                                    : <img src="img/arrow_drop_down_white.png" style={{width:'10px',height:'5px'}} alt="no arrow img"/>}
                            </div>
                            <div id="ProcessList" className={classes.CheckboxList} >
                                {options.process.map((item,idx) => {
                                    return (
                                        <label key={idx} className={classes.ItemList}>
                                        <input type="checkbox" checked={filter.indexOf(item) > -1} onChange={(e) => handleCheck(e.target.checked,item)}/>{item}
                                        </label>)
                                })}
                            </div>
                        </div>
                        <div>
                            <div id="MaterialBtn" className={classes.DropDown} style={{minWidth:'76px',maxWidth:'91px'}} onClick={() => handleClick("MaterialList")}>
                                { matbtn === 0 ? "재료" : `재료(${matbtn})` }
                                { matbtn === 0 ? <img src="img/arrow_drop_down.png" style={{width:'10px',height:'5px'}} alt="no arrow img"/> 
                                : <img src="img/arrow_drop_down_white.png" style={{width:'10px',height:'5px'}} alt="no arrow img"/>}
                            </div>
                            <div id="MaterialList" className={classes.CheckboxList}>
                                {options.material.map((item,idx) => {
                                    return (
                                        <label key={idx} className={classes.ItemList}>
                                            <input type="checkbox" checked={filter.indexOf(item) > -1} onChange={(e) => handleCheck(e.target.checked,item)}/>{item}
                                        </label>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                        <div id="FilterReset" className={classes.ResetBtn} onClick={() => handleReset(false,"button")}>
                            <img src="img/refresh.png" style={{width:'16px',height:'16px',margin:'8px' }} alt="no reset img"/> 필터링 리셋
                        </div>
                        <div className={classes.Toggle} >
                            <div style={{cursor:'pointer'}} onClick={() => handleToggle()}>
                                <ToggleSwitch checked={toggle}/>
                            </div>상담 중인 요청만 보기
                        </div>
                    </div>
                    <div>
                        <ItemFilter filter={filter} toggle={toggle ? 1 : 0}/>
                    </div>
            </Container>
        </>
    )
}

export default Dashboard