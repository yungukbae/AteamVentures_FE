import {Theme, makeStyles, createStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme:Theme) => createStyles({
    ItemCard:{
        display:'flex',
        flexDirection:'column',
        minWidth:'210px',
        height:'356px',
        padding:'24px 16px',
        border:'1px solid #E5E5E5',
        borderRadius:'4px',
        backgroundColor:'#FFFFFF',
        "&:hover":{
            border: '1px solid #2196F3'
        }
    },
    CardTop:{
        display:'flex',
        flexDirection:'column',
        width:'100%',
        height:'108px',
        borderBottom:'1px solid #E5E5E5'
    },
    Header:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        width:'100%',
        height:'24px',
        marginBottom:'4px',
    },
    Title:{
        height:'24px',
        fontSize:'16px',
        fontWeight:'bold',
        lineHeight:'24px'
    },
    Meeting:{
        width:'50px',
        height:'24px',
        fontSize:'12px',
        lineHeight:'24px',
        textAlign:'center',
        border:'1px solid #FFA000',
        borderRadius:'12px',
        color:'#FFA000'
    },
    Client:{
        height:'21px',
        fontSize:'14px',
        textAlign:'left',
        marginBottom:'24px'
    },
    OrderExp:{
        height:'20px',
        fontSize:'14px',
        lineHeight:'20px',
        color:'#939FA5'
    },
    CardBottom:{
        display:'flex',
        flexDirection:'column',
        gap:'8px',
        width:'100%',
        height:'104px',
        margin:'32px 0'
    },
    OrderInfo:{
        display:'flex',
        flexDirection:'row',
        gap:'32px',
        width:'100%',
        height:'20px'
    },
    OrderProp:{
        width:'70px',
        height:'20px',
        fontSize:'14px',
        lineHeight:'20px',
        textAlign:'left',
        color:'#323D45'
    },
    OrderValue:{
        height:'20px',
        fontWeight:'bold',
        fontSize:'14px',
        lineHeight:'20px',
    },
    CardBtn:{
        display:'flex',
        flexDirection:'row',
        gap:'8px',
        width:'192px',
        height:'32px',
    },
    DetailBtn:{
        width:'108px',
        height:'32px',
        fontSize:'14px',
        lineHeight:'32px',
        textAlign:'center',
        outline:'0',
        border:'0',
        borderRadius:'4px',
        backgroundColor:'#2196F3',
        color:'#FFFFFF',
        cursor:'pointer'
    },
    ChatBtn:{
        width:'76px',
        height:'32px',
        fontSize:'14px',
        lineHeight:'32px',
        textAlign:'center',
        outline:'0',
        border:'1px solid #2196F3',
        borderRadius:'4px',
        backgroundColor:'#FFFFFF',
        color:'#2196F3',
        cursor:'pointer'
    }
}))

interface ItemData{
        id:number,
        title:string,
        client:string,
        due:string,
        count:number,
        amount:number,
        method:string[],
        material:string[],
        status:string,
}

const ItemList = ({data}:{data:ItemData}) => {
    
    const classes = useStyles();

    return(
        <>
            <div key={data.id} className={classes.ItemCard}>
                <div className={classes.CardTop}>
                    <div className={classes.Header}>
                        <div className={classes.Title}>{data.title}</div>
                        { data.status === "상담중" &&
                            <div className={classes.Meeting}>상담중</div>}
                    </div>
                    <div className={classes.Client}>{data.client}</div>
                    <div className={classes.OrderExp}>{data.due} 까지 납기</div>
                </div>
                <div className={classes.CardBottom}>
                    <div className={classes.OrderInfo}>
                        <div className={classes.OrderProp}>도면개수</div>
                        <div className={classes.OrderValue}>{data.count}개</div>
                    </div>
                    <div className={classes.OrderInfo}>
                        <div className={classes.OrderProp}>총 수량</div>
                        <div className={classes.OrderValue}>{data.amount}개</div>
                    </div>
                    <div className={classes.OrderInfo}>
                        <div className={classes.OrderProp}>가공방식</div>
                        <div className={classes.OrderValue}>{data.method.join(", ")}</div>
                    </div>
                    <div className={classes.OrderInfo}>
                        <div className={classes.OrderProp}>재료</div>
                        <div className={classes.OrderValue}>{data.material.join(", ")}</div>
                    </div>
                </div>
                <div className={classes.CardBtn}>
                    <button className={classes.DetailBtn}>요청 내역 보기</button>
                    <button className={classes.ChatBtn}>채팅하기</button>
                </div>
            </div>
        </>
    )
}

export default ItemList