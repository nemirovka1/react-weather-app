import React, {useMemo, useState } from "react"
import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { WEATHER_API_KEY, WEATHER_API_URL } from "../constants"
import { Forecast } from "../Forecast"
import { WeatherCard } from "../WeatherCard"
import { CurrentWeather, ForecastList } from "../types/types"
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const WeatherPage = () => {
    const classes = useStyles()
    const [city, setCity] = useState('')
    const [currentWeather, setCurrentWeather] = useState<CurrentWeather | null>()
    const [forecast, setForecast] = useState<ForecastList[]>([])
    const navigate = useNavigate()
    const [forecastDays, setForecastDays] = useState(3)
    const [error,setError] = useState(false)
    const getWeatherByCity = async () => {
        try {
            const [currentWeatherResponse, forecastResponse] = await Promise.all([
                axios.get(`${WEATHER_API_URL}/current?city=${city}&key=${WEATHER_API_KEY}`),
                axios.get(`${WEATHER_API_URL}/forecast/daily?city=${city}&days=${forecastDays}&key=${WEATHER_API_KEY}`),
            ])
            setCurrentWeather(currentWeatherResponse.data.data[0])
            setForecast(forecastResponse.data.data)
        } catch (error) {
            setError(true)
            toast.error('Invalid Parameters supplied.')
            setCity('')
            setCurrentWeather(null)
            setForecast([])
        }
    }
    const handleForecastChange = (days: number) => {
        setForecastDays(days)
        axios.get(`${WEATHER_API_URL}/forecast/daily?city=${city}&days=${days}&key=${WEATHER_API_KEY}`)
            .then((response)=> {
                setForecast(response.data.data)
            })
            .catch(() => {
                toast.error('Something went wrong')
                setCity('')
            })
    }

    const startPolling = () => {
        if (!error && city) {
            getWeatherByCity();
            const pollingInterval = 120000;
            const pollingTimer = setInterval(() => {
                getWeatherByCity();
            }, pollingInterval);

            return () => {
                clearInterval(pollingTimer);
            };
        }
    };

    const renderWeatherContent = useMemo(() => {
        if(!currentWeather) return null
        return <WeatherCard currentWeather={currentWeather}/>
    }, [currentWeather])


    const renderForecastContent = useMemo(() => {
        if(!forecast || forecast.length === 0) return null
        const forecastButtons = [
            { days: 3, label: '3 days' },
            { days: 5, label: '5 days' },
            { days: 7, label: '7 days' },
        ];

        return (
             <Box className={classes.forecastContainer}>
                <Box className={classes.forecastDaysBox}>
                    {forecastButtons.map((buttonData) => (
                        <Button
                            key={buttonData.days}
                            onClick={() => handleForecastChange(buttonData.days)}
                            className={classes.forecastBtn}
                            style={{
                                backgroundColor: forecastDays === buttonData.days ? '#606ec0' : '#f3f2f2',
                            }}
                        >
                            {buttonData.label}
                        </Button>
                    ))}
                </Box>
                 <Forecast data={forecast}/>
             </Box>
        )
    }, [forecast,forecastDays])

    return  (
        <Box className={classes.container}>
            <Box className={classes.backToMainBox}>
                <Button onClick={()=> navigate('/')} className={classes.backToMainBtn}>Back to Main</Button>
            </Box>
            <Typography className={classes.mainTitle}>Weather App</Typography>
            <Box className={classes.weatherBox}>
               <TextField
                   value={city}
                   required
                   type={'text'}
                   variant={'outlined'}
                   className={classes.textInput}
                   placeholder={'Enter city...'}
                   onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
                       setCity(event.target.value)
                       setError(false)
                   }}
               />
               <Button
                   onClick={startPolling}
                   disabled={city.length < 3}
                   className={classes.inputBtn}
               >
                   Find weather
               </Button>
           </Box>
            {renderWeatherContent}
            {renderForecastContent}
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
    weatherContainer: {
        maxWidth: 500,
        margin: 'auto',
        borderRadius: 20,
        backgroundColor: '#5c6281',
        padding: '0 1rem',
        position: 'relative',
        top: '4%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        [theme.breakpoints.down('md')]: {
            width: 300,
        },
        '@media (max-width: 400px)': {
            width: 245,
        },
    },
    inputBtn: {
        color: '#fff',
        backgroundColor: '#8795ee',
        '&:hover': {
            backgroundColor: '#aab5ee',
        }
    },
    top: {
        width: '100%',
        margin: '1rem auto',
    },
    textInput: {
        width: 350,
        borderRadius: 5,
        backgroundColor: 'rgba(255,255,255, 0.3)',
        '& .MuiOutlinedInput-input': {
            padding: 8,
        },
        '@media (max-width: 500px)': {
            width: '245px',
        },
    },
    forecastContainer: {
        display: "flex",
        flexDirection: 'column',
        marginTop: 25,
    },
    forecastDaysBox: {
        marginBottom: 25,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },
    forecastBtn: {
        padding: '5px 50px',
        fontSize: 14,
        fontWeight: 600,
        backgroundColor: '#e5e5e5',
        borderRadius: 5,
        '@media (max-width: 740px)': {
            fontSize: 10,
            fontWeight: 600,
            padding: '5px 20px',
        },
    }
}));
