import React, {useEffect, useState} from "react";
import ItemList from "./ItemList";
import useFetch from "../hook/useFetch";
import {options} from '../UseData';
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';


const useStyles = makeStyles((theme: Theme) => createStyles({
    Progress:{
        position:'fixed',
        width:'100vw',
        height:'100vh',
        left:'0',
        top:'0',
        zIndex:999,
        backgroundColor:'rgba(211,211,211,0.4)'
    },
    Circle:{
        position:'fixed',
        left:'50%',
        top:'50%',
        transform:'transition(-50%,50%)',
    },
    NoItem:{
        width:'100%',
        height:'100px',
        marginTop:'32px',
        border:'1px solid #C2C2C2',
        borderRadius:'4px',
        lineHeight:'100px',
        textAlign:'center',
        color:'#939FA5'
    }, ItemList:{
        display:'grid',
        gridTemplateColumns:'1fr 1fr 1fr',
        gap:'8px',
        width:'100%',
        marginTop:'30px',
        padding:'2px 0',
        [theme.breakpoints.down(990)]: {
            gridTemplateColumns:'1fr 1fr',
        },
        [theme.breakpoints.down(600)]: {
            gridTemplateColumns:'1fr',
        }
    }
}));

interface ItemFilterProps {
    filter: string[];
    toggle: number;
}

interface  Item{
    id:number,
    title:string,
    client:string,
    due:string,
    count:number,
    amount:number,
    method:string[],
    material:string[],
    status:string
}

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const ItemFilter = ({filter,toggle}:ItemFilterProps ) => {

        const classes = useStyles();
        const [loading, setLoading] = useState<boolean>(false)                              //로딩 표시 상태 제어용 변수
        const [isOpen, setIsOpen] = useState<boolean>(false)                                //에러 알림창 상태 제어용 변수
        const {data,error} = useFetch('http://localhost:8000/requests')                     //데이터와 에러를 가져오는 변수
        let [item,setItem] = useState<Item[]>([])                                           //필터링된 데이터를 담는 변수

        useEffect(() => {
            setLoading(true)                                                                //로딩창 표시
            setTimeout(() => {
                let result:Item[] = []                                                      //필터 조건에 맞을경우 해당 오브젝트를 담는 변수
                let material:string[] = filter.filter(val => options.material.includes(val))//필터 재료값
                let method:string[] = filter.filter(val => options.process.includes(val))   //필터중 가공방식에 해당하는 필터

                {data && data.forEach((value:Item) => {                                     //data를 필터링 하기위한 반복문
                        let intersection: string[] = []                                     //필터와 data의 교집합을 담을 변수
                        let itemValue: string[] = []                                        //item의 가공방법 또는 재질을 담기위한 변수
                        itemValue = itemValue.concat(value.material,value.method)           

                        if (material.length > 0 && method.length > 0) {
                            intersection = itemValue.filter(val => filter.includes(val))
                            if (intersection.length > 0 && intersection.length === filter.length) {
                                result = result.concat(value)
                            }

                        } else if (material.length > 0) {
                            intersection = itemValue.filter(val => material.includes(val));
                            if (intersection.length > 0) {
                                result = result.concat(value)
                            }

                        } else if (method.length > 0) {
                            intersection = itemValue.filter(val => method.includes(val));
                            if (intersection.length > 0) {
                                result = result.concat(value)
                            }
                        }
                        return result
                    })
                }

                if(toggle === 1) { //토글 적용시
                    let toggleItem = data.filter((val:{status:string}) => val.status === "상담중")
                    setItem(toggleItem)
                    setLoading(false)
                }else if(result.length > 0){                                //필터 적용했을떄
                    setItem(result)
                    setLoading(false)
                }else if(filter.length > 0 && result.length === 0){
                    setItem(result)
                    setLoading(false)
                }else{
                    setItem(data)
                    setLoading(false)
                }
                
                {error && setIsOpen(true)}
            },500)


        },[filter,toggle,data,error])

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setIsOpen(false)
    }

    return (
        <>
            <Snackbar anchorOrigin={{ vertical: 'top',horizontal: 'center' }}  open={isOpen} autoHideDuration={3000} onClose={handleClose}>
                    <Alert onClose={handleClose} style={{color:'#e53935'}} severity="error">
                            데이터를 서버에서 불러오지 못했습니다.
                    </Alert>
            </Snackbar>
            { item.length > 0 ?
                <Box className={classes.ItemList}>{item.map((item) => {return(<ItemList key={item.id} data={item}/>)})}</Box>
                : <div className={classes.NoItem}>조건에 맞는 견적 요청이 없습니다.</div>}

        <Fade in={loading}>
            <div className={classes.Progress}>
                <CircularProgress size={80} className={classes.Circle}/>
            </div>
        </Fade>
        </>
    )
}

export default  ItemFilter
