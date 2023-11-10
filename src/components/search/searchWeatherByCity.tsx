import {getCurrentWeather, getWeatherForecast} from "../API/getWeatherAPI"
import {Box, Button, makeStyles, TextField} from "@material-ui/core"
import { useState } from "react"
import { toast } from 'react-toastify'

export const SearchWeatherByCity = ({ onSearch }: any) => {
    const classes = useStyles()
    const [city, setCity] = useState('')
    const handleSearch = async () => {
        try {
            const [currentWeatherResponse, forecastResponse] = await Promise.all([
                getCurrentWeather(city),
                getWeatherForecast(city, 3),
            ]);
            onSearch({
                city,
                currentWeather: currentWeatherResponse.data.data[0],
                forecast: forecastResponse.data.data,
            });
        } catch (error) {
            toast.error('Invalid Parameters supplied.');
            setCity('');
        }
    };

    return (
        <Box>
            <TextField
                value={city}
                required
                type={'text'}
                variant={'outlined'}
                className={classes.textInput}
                placeholder={'Enter city...'}
                onChange={(event) => setCity(event.target.value)}
            />
            <Button
                onClick={handleSearch}
                disabled={city.length < 3}
                className={classes.inputBtn}
            >
                Find weather
            </Button>
        </Box>
    );
}
const useStyles = makeStyles(() => ({
    inputBtn: {
        color: '#fff',
        backgroundColor: '#8795ee',
        '&:hover': {
            backgroundColor: '#aab5ee',
        }
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
}));
