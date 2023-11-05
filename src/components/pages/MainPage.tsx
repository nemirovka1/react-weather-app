import { Box, Button, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import { useNavigate } from "react-router-dom"
import HeaderLogo from '../../assets/Header logo.svg'

export const MainPage = () => {
    const navigate = useNavigate()
    const classes = useStyles()

    return  (
        <Box className={classes.fullscreenBlock}>
            <Box className={classes.headerLogoBox}>
                <img src={HeaderLogo} alt={'Logo'}/>
                <Typography className={classes.mainTitle}>Open Weather API</Typography>
            </Box>
            <Box className={classes.btnBox}>
                <Button className={classes.mainBtn} onClick={()=> navigate('/weather_page')}>
                    Find Forecast
                </Button>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles({
    fullscreenBlock: {
        width: '100vw',
        height: '100vh',
        padding: 50,
    },
    headerLogoBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
    },
    mainTitle: {
        fontSize: 40,
        fontWeight: 400,
        textAlign: 'center',
    },
    btnBox: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: 200,
    },
    mainBtn: {
        backgroundColor: '#7085e3',
        color: '#fff',
        padding: '10px 42px',
        '&:hover': {
            backgroundColor: '#0831ea',
        },
    },
});


