import React, {useMemo, useState } from "react"
import { Box, Button, makeStyles, Typography } from "@material-ui/core"
import { useNavigate } from "react-router-dom"
import { WeatherCard } from "../WeatherCard"
import { CurrentWeather, ForecastList } from "../types/types"
import 'react-toastify/dist/ReactToastify.css'
import {SearchWeatherByCity} from "../search/searchWeatherByCity";
import {ForecastForDays} from "../forecastForDays/ForecastForDays";

export const WeatherPage = () => {
    const classes = useStyles()
    const [cityName, setCity] = useState('')
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>()
    const [forecast, setForecast] = useState<ForecastList[]>([])
    const navigate = useNavigate()

    const handleSearch = ({ currentWeather, forecast, city }: {currentWeather: CurrentWeather, forecast: ForecastList[], city: string}) => {
        setCurrentWeather(currentWeather);
        setForecast(forecast);
        setCity(city)
    };
    const handleForecastForDays = ({forecast}: {forecast: ForecastList[]}) => {
        setForecast(forecast);
    }

    const renderWeatherContent = useMemo(() => {
        if(!currentWeather) return null
        return <WeatherCard currentWeather={currentWeather}/>
    }, [currentWeather])


    return  (
        <Box className={classes.container}>
            <Box className={classes.backToMainBox}>
                <Button onClick={()=> navigate('/')} className={classes.backToMainBtn}>Back to Main</Button>
            </Box>
            <Typography className={classes.mainTitle}>Weather App</Typography>
            <Box className={classes.weatherBox}>
                <SearchWeatherByCity onSearch={handleSearch} />
            </Box>
            {renderWeatherContent}
            <ForecastForDays forecast={forecast} city={cityName} onForecast={handleForecastForDays}/>
        </Box>
    )
}

const useStyles = makeStyles((theme) => ({
    container: {
        padding: 30,
    },
    backToMainBtn: {
        padding: '3px 10px',
        fontSize: 12,
        borderRadius: 8,
        fontWeight: 400,
        backgroundColor: '#5c6281',
        color: '#fff',
    },
    mainTitle: {
        fontSize: 40,
        fontWeight: 400,
        textAlign: 'center',
        color: '#fff',
        marginBottom: 20,
    },
    backToMainBox: {
        display: 'flex',
        justifyContent: 'start',
    },
    weatherBox: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        gap: 20,
        [theme.breakpoints.down('md')]: {
           flexDirection: 'column',
        },
    },
}));
