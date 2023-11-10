import {Box, Button, makeStyles} from "@material-ui/core";
import {Forecast} from "../Forecast";
import React, {useState} from "react";
import { getWeatherForecast } from "../API/getWeatherAPI";
import { toast } from "react-toastify";
import {ForecastList} from "../types/types";

export const ForecastForDays = ({ city, onForecast, forecast }: {city: string, onForecast: any, forecast: ForecastList[]}) => {
    const classes = useStyles()
    const [forecastDays, setForecastDays] = useState(3)

    if(forecast.length === 0) return null
    const handleForecastChange = (days: number) => {
        setForecastDays(days)
        getWeatherForecast(city, days)
            .then((response) => {
                onForecast({
                    forecast: response.data.data
                })
            })
            .catch(() => {
                toast.error('Something went wrong');
            });
    };

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
}

const useStyles = makeStyles((theme) => ({
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
