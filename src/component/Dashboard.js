import React, {useEffect, useRef, useState} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Switch from '@material-ui/core/Switch';
import {makeStyles,withStyles} from "@material-ui/core/styles";
import {options} from '../DropDownData';
import useFetch from "../hook/useFetch";
import ItemFilter from "./ItemFilter";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
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
        fontWeight:'600'
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
        zIndex:'-1'
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
    const classes = useStyles();
    const listRef = useRef();
    const {data,error} = useFetch('http://localhost:8000/requests')
    const [toggle, setToggle] = useState(false);
    const [procbtn,setProcbtn] = useState(0);
    const [matbtn,setMatbtn] = useState(0);
    const [filter, setFilter] = useState([]);

    useEffect(() => {

        const handleClose = (e) => {
            if(listRef.current && !listRef.current.contains(e.target)){
                document.getElementById("ProcessList").style.display = "none"
                document.getElementById("MaterialList").style.display = "none"
            }
        }

        document.addEventListener('mousedown',handleClose);
        return () => { window.addEventListener('mousedown',handleClose); }
    })

    const handleClick = (type) =>{
        let none = (type === "MaterialList") ? "ProcessList" : "MaterialList"

        if(document.getElementById(type).style.display === "flex"){
            document.getElementById(type).style.display = "none"

        }else if(type){
            document.getElementById(type).style.display = "flex"
            document.getElementById(none).style.display = "none"
        }
    }

    const handleCheck = (isChecked,item) => {

        if(isChecked){
            setFilter(filter => filter.concat(item))
        }else{
            setFilter(filter.filter((val) => val !== item))
        }
        handleBtn(isChecked,item)
        handleReset(isChecked,item)
    }

    const handleBtn = (isChecked,item) => {
        const ProcStyle = document.getElementById("ProcessBtn").style
        const MatStyle = document.getElementById("MaterialBtn").style
        const ItemType = (options.process.indexOf(item) > -1) ? ProcStyle : MatStyle;

        if(isChecked){
            ItemType.color = "#FFFFFF"
            ItemType.backgroundColor = "#1565C0"
            {ItemType === ProcStyle ? setProcbtn(procbtn + 1) : setMatbtn(matbtn + 1) }

        }else{
            if((ItemType === ProcStyle && procbtn === 1) || (ItemType === MatStyle && matbtn === 1)){
                ItemType.color = "#000"
                ItemType.backgroundColor = "#FFFFFF"
            }
            {ItemType === ProcStyle ? setProcbtn(procbtn - 1) : setMatbtn(matbtn - 1) }
        }
    }

    const handleToggle = () => {
        setToggle(!toggle)
    }

    const handleReset = (isChecked,target) => {
        const btn = document.getElementById("FilterReset")

        if(isChecked){
            btn.style.display = "flex"

        }else{
            if(filter.length === 1){
                btn.style.display = "none"
            }

            if(target === 'button'){
                btn.style.display = "none"
                setFilter([])
                setProcbtn(0)
                setMatbtn(0)

                document.getElementById("ProcessBtn").style.color = "#000"
                document.getElementById("ProcessBtn").style.backgroundColor = "#FFFFFF"
                document.getElementById("MaterialBtn").style.color = "#000"
                document.getElementById("MaterialBtn").style.backgroundColor = "#FFFFFF"
            }
        }
    }

    return(
        <>
            <React.Fragment>
                <CssBaseline/>
                <Container maxWidth="lg" className={classes.DashBoard}>
                        <Box className={classes.TitleBox}>
                            <span className={classes.Title}>들어온 요청</span>
                            <span className={classes.Content}>파트너님에게 딱 맞는 요청서를 찾아보세요.</span>
                        </Box>

                        <Box className={classes.FilterBtn}>
                        <Box className={classes.DropDownBox} ref={listRef}>
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
                                    { matbtn === 0 ? <img src="img/arrow_drop_down.png" style={{width:'10px',height:'5px'}} alt=""/> : <img src="img/arrow_drop_down_white.png" style={{width:'10px',height:'5px'}} alt=""/>}
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
                        </Box>
                            <div id="FilterReset" className={classes.ResetBtn} onClick={() => handleReset(false,'button')}>
                                <img src="img/refresh.png" style={{width:'16px',height:'16px',margin:'8px'}}/> 필터링 리셋
                            </div>
                            <div className={classes.Toggle} >
                                <div style={{cursor:'pointer'}} onClick={() => handleToggle()}><ToggleSwitch checked={toggle}/></div>상담 중인 요청만 보기
                            </div>
                        </Box>
                        <Box>
                            { data && <ItemFilter filter={filter} toggle={toggle ? 1 : 0} data={data} error={error}/>}
                        </Box>
                </Container>
            </React.Fragment>

        </>
    )
}

export default Dashboard