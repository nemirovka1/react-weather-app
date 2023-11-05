import React from "react"
import { Box, makeStyles, Typography } from "@material-ui/core"
import { CurrentWeather } from "./types/types"

export const WeatherCard = ({ currentWeather }: { currentWeather: CurrentWeather }) => {
    const classes = useStyles()

    return (
        <Box className={classes.weatherContainer}>
            <Box>
                <Box className={classes.top}>
                    <Typography className={classes.cityName}>{currentWeather?.city_name}</Typography>
                    <Typography className={classes.currentTemp}>{currentWeather.temp.toFixed()}°C</Typography>
                    <Box className={classes.description}>
                        <Typography className={classes.descriptionText}>{currentWeather?.weather?.description}</Typography>
                    </Box>
                </Box>
                <Box className={classes.bottom}>
                    <Box>
                        <Typography className={classes.bold}>{currentWeather?.app_temp.toFixed()}°C</Typography>
                        <Typography className={classes.bold}>Feels Like</Typography>
                    </Box>
                    <Box>
                        <Typography className={classes.bold}>{currentWeather?.rh}%</Typography>
                        <Typography className={classes.bold}>Humidity</Typography>
                    </Box>
                    <Box>
                        <Typography className={classes.bold}>{currentWeather?.wind_spd.toFixed()} MPH</Typography>
                        <Typography className={classes.bold}>Wind Speed</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    weatherContainer: {
        maxWidth: 500,
        margin: 'auto',
        borderRadius: 20,
        backgroundColor: 'rgba(92, 98, 129, 0.9)',
        padding: '0 1rem',
        position: 'relative',
        top: '4%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            width: 300,
        },
        '@media (max-width: 600px)': {
            width: 245,
        },
    },
    top: {
        width: '100%',
        margin: '1rem auto',
    },
    description: {
        cursor: 'inherit',
        flex: '1 1',
        marginRight: 15,
        color: '#fff',
        textAlign: 'right',
    },
    bottom: {
        display: 'flex',
        justifyContent: 'space-evenly',
        textAlign: 'center',
        width: '100%',
        margin: '1rem auto',
        padding: '1rem',
        borderRadius: '12px',
        backgroundColor: 'rgba(255,255,255, 0.2)',
    },
    bold: {
        color: '#fff',
        fontWeight: 700,
    },
    cityName: {
        fontSize: 22,
        fontWeight: 600,
        color: '#fff',
    },
    currentTemp: {
        fontSize: 24,
        fontWeight: 800,
        color: '#fff',
    },
    descriptionText: {
        fontSize: 20,
        fontWeight: 600,
        color: '#fff',
    },
}));

