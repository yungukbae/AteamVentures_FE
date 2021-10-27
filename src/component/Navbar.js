import React, {useEffect, useRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import Box from '@material-ui/core/Box';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    AppBar:{
        height:'70px',
        backgroundColor:'#1565C0',
        [theme.breakpoints.down(670)]:{
            height:'44px'
        }
    },
    ToolBar:{
        display:'flex',
          padding:'0 40px',
          [theme.breakpoints.down(670)]:{
            height:'44px',
            padding:'0px 20px'
          }
    },
    MenuBtn:{
      display:'none',
        [theme.breakpoints.down(670)]:{
          display:'flex'
        }
    },
    LogoBtn:{
        width:'160px',
        height:'20px',
        padding:'0',
        margin:'25px 0',
        outline:'0',
        border:'0',
        backgroundColor:'rgba( 255, 255, 255, 0 )',
        cursor:'pointer',
        [theme.breakpoints.down(670)]:{
            width:'92px',
            height:'12px',
            margin:'16px'
        }
    },
    NavBtn:{

        position:'absolute',
        display:'flex',
        flexFlow:'row nowrap',
        gap:'32px',
        alignItems:'center',
        padding:'0',
        height:'20px',
        right:'40px',
        top:'25px',
        [theme.breakpoints.down(670)]:{
            display:'none'
        }

    },
    ClientName:{

        height:'20px',
        padding:'0px',
        lineHeight:'20px',
        whiteSpace: 'nowrap',
        color:'#FFFFFF'

    },
    Divider:{
        width:'1px',
        height:'16px',
        borderLeft:'2px solid #FFFFFF'
    },
    LogoutBtn:{

        width:'52px',
        height:'20px',
        padding:'0px',
        lineHeight:'20px',
        whiteSpace: 'nowrap',
        color:'#FFFFFF',

    },
    BigLogo:{
        display:'flex',
        height:'100%',
        [theme.breakpoints.down(670)]:{
            display:'none'
        }
    },
    SmallLogo:{
        display:'none',
        height:'100%',
        [theme.breakpoints.down(670)]:{
            display:'flex'
        }
    },
    MenuBox:{
        position:'fixed',
        display:'flex',
        flexFlow:'row',
        width:'100%',
        height:'100%',
        left:'0',
        top:'0'
    },
    Menu:{
        width:'280px',
        height:'100%',
        backgroundColor:'#FFFFFF',
        zIndex:'99999'
    },
    MenuBack:{
        position:"fixed",
        width:'100%',
        height:'100%',
        backgroundColor:'#000000',
        opacity:'0.5'
    },
    MenuTop:{
        width:'100%',
        height:'44px',
        padding:'16px 20px',
        borderBottom:'1px solid #E5E5E5'
    },
    MenuMain:{
        display:'flex',
        flexDirection:'column',
        gap:'4px',
        width:'100%',
        height:'100px',
        padding:'36px 0 0 32px'
    },
    MenuList:{
        height:'30px',
        textAlign:'left',
        padding:'5px 0',
        marginRight:'auto',
        fontSize:'14px',
        lineHeight:'20px',
        cursor:'pointer'
    }



}));


const Navbar = () => {
    const classes = useStyles();
    const menuRef = useRef();
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleClose = (e) => {
            if(menuRef.current && !menuRef.current.contains(e.target)){
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown',handleClose);
        return () => { window.addEventListener('mousedown',handleClose); }
    })

    const handleClick = () => {
        console.log('click')
        setIsOpen(!isOpen)
    }


    return(
        <>
            <div className={classes.root}>
                <AppBar className={classes.AppBar} position="static">
                    <div className={classes.ToolBar}>
                        <IconButton edge="start" onClick={() => handleClick()} className={classes.MenuBtn} color="inherit" aria-label="menu">
                            <MenuIcon />
                        </IconButton>

                        <div>
                            <button className={classes.LogoBtn}>
                                <img src="img/capalogo.png" className={classes.BigLogo} alt="CAPA 파트너스"/>
                                <img src="img/capalogosmall.png" className={classes.SmallLogo} alt="CAPA 파트너스"/>
                            </button>
                        </div>

                        <div className={classes.NavBtn}>
                            <Button className={classes.ClientName}>
                                <img src="img/clientlogo.svg"style={{width:'17px', height:'15px',padding:'2.5px 0px', marginRight:'8px'}} alt="Client Logo"/>A 가공 업체
                            </Button>

                            <div className={classes.Divider}/>

                            <Button className={classes.LogoutBtn}>로그아웃</Button>
                        </div>
                    </div>
                </AppBar>

                <div>

                    <Fade in={isOpen}>
                        <Box className={classes.MenuBox}>
                            <Slide direction="right" in={isOpen} mountOnEnter unmountOnExit>
                            <div className={classes.Menu} ref={menuRef}>
                                <div className={classes.MenuTop}>
                                    <img src="img/capapartners.png" style={{height:'12px'}} alt="CAPA Parteners"/>
                                </div>
                                <div className={classes.MenuMain}>
                                    <div className={classes.MenuList}>
                                        <img src="img/menuclientlogo.svg" style={{width:'15px', height:'15px',padding:'2.5px 0px', marginRight:'8px'}} alt="Client Logo"/> 파트너정밀가공                                    </div>

                                    <div className={classes.MenuList}>로그아웃</div>
                                </div>
                            </div>
                            </Slide>
                            <div className={classes.MenuBack}>
                            </div>
                        </Box>
                </Fade>
                </div>
            </div>
        </>
    )
}

export default Navbar