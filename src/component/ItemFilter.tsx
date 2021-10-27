import ItemList from "./ItemList";
import React, {useEffect, useState} from "react";
import { Theme, makeStyles, createStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fade from '@material-ui/core/Fade';
import {options} from '../DropDownData';

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
        zIndex:99,
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
    }
}));

interface ItemFilterProps {
    filter: string[];
    toggle: number;
    data: any[],
    error: string;
}

const ItemFilter = ({filter,toggle,data,error}: ItemFilterProps) => {

        const classes = useStyles();
        const [loading, setLoading] = useState(false)
        let [item,setItem] = useState<object[]>([])

        useEffect(() => {
            setLoading(true)

            setTimeout(() => {
                let result:object[] = []
                let material = filter.filter(val => options.material.includes(val)) //필터 재료값
                let method = filter.filter(val => options.process.includes(val))    //필터 가공방식
                {data && data.forEach(({value, idx}:{value: { material:string,method:string },idx:number}):object => {
                        let intersection: string[] = []
                        let itemValue: string[] = []
                        itemValue = itemValue.concat(filter)

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


                if(toggle === 1) {                                          //토글 적용시
                    setItem(data.filter((val:{status:string}) => val.status === "상담중"))
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
        },[filter,toggle])

    return (
        <>
            { item.length > 0 ? <ItemList data={item}/> : <div className={classes.NoItem}>조건에 맞는 경적 요청이 없습니다.</div>}
        <Fade in={loading}>
        <div className={classes.Progress}>
            <CircularProgress size={80} className={classes.Circle}/>
        </div>
        </Fade>
        </>
    )
}

export default  ItemFilter
