import ItemList from "./ItemList";
import React, {useEffect, useState} from "react";
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import Box from '@material-ui/core/Box';
import {options} from '../DropDownData';
import useFetch from "../hook/useFetch";

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
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

interface  ItemSet{
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


const ItemFilter = ({filter,toggle}:ItemFilterProps ) => {

        const classes = useStyles();
        const [loading, setLoading] = useState(false)
        const {data,error} = useFetch('http://localhost:8000/requests')
        let [item,setItem] = useState<ItemSet[]>([])

        useEffect(() => {
            setLoading(true)
            setTimeout(() => {
                let result: ItemSet[] = []
                let material:string[] = filter.filter(val => options.material.includes(val)) //필터 재료값
                let method:string[] = filter.filter(val => options.process.includes(val))    //필터 가공방식
                {data && data.forEach((value:ItemSet) => {
                        let intersection: string[] = []
                        let itemValue: string[] = []
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

            },500)
        },[filter,toggle,data])

    return (
        <>
            { item.length > 0 ?
                <Box className={classes.ItemList}>{item.map((item) => {return(<ItemList key={item.id} data={item}/>)})}</Box>
                : <div className={classes.NoItem}>조건에 맞는 경적 요청이 없습니다.</div>}

        <Fade in={loading}>
            <div className={classes.Progress}>
                <CircularProgress size={80} className={classes.Circle}/>
            </div>
        </Fade>
        </>
    )
}

export default  ItemFilter
