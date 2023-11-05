import { Box, makeStyles, Typography } from "@material-ui/core"
import React from "react"
import Slider from "react-slick"
import { ForecastList } from "./types/types"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const WEEK_DAYS = ['Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
export const Forecast = ({ data }: { data: ForecastList[] }) => {
    const dayInAWeek = new Date().getDay()
    const classes = useStyles()
    const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(WEEK_DAYS.slice(0, dayInAWeek))

    const settings = {
        dots: true,
        infinite: true,
        speed: 1500,
        autoplay: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 740,
                settings: { slidesToShow: 1, slidesToScroll: 1, infinite: true }
            },
            {
                breakpoint: 1097,
                settings: { slidesToShow: 2, slidesToScroll: 1, infinite: true }
            },
            {
                breakpoint: 1200,
                settings: { slidesToShow: 3, slidesToScroll: 1, infinite: true }
            }
        ]
    };

    return (
        <Box className={classes.container}>
                <Slider {...settings}>
                    {data.map((item: ForecastList, idx: number) => (
                        <div key={idx}>
                           <Box className={classes.forecastContainer}>
                               <Box className={classes.dailyItem}>
                                   <img src={`https://cdn.weatherbit.io/static/img/icons/${item.weather.icon}.png`} className={classes.iconSmall} alt="weather" />
                                   <Typography className={classes.dailyItemDay}>{forecastDays[idx]}</Typography>
                               </Box>
                               <Box>
                                   <Typography className={classes.dailyTemp}>{item?.temp.toFixed()}°C</Typography>
                                   <Box className={classes.description}>
                                       <Typography className={classes.descriptionText}>{item?.weather.description}</Typography>
                                   </Box>
                                   <Box className={classes.bottom}>
                                       <Box>
                                           <Typography className={classes.bold}>{item?.app_max_temp.toFixed()}°C</Typography>
                                           <Typography className={classes.bold}>Feels Like</Typography>
                                       </Box>
                                       <Box>
                                           <Typography className={classes.bold}>{item?.rh}%</Typography>
                                           <Typography className={classes.bold}>Humidity</Typography>
                                       </Box>
                                       <Box>
                                           <Typography className={classes.bold}>{item?.wind_spd.toFixed()} MPH</Typography>
                                           <Typography className={classes.bold}>Wind Speed</Typography>
                                       </Box>
                                   </Box>
                               </Box>
                           </Box>
                        </div>
                    ))}
                </Slider>
        </Box>
    )
}

const useStyles = makeStyles(() =>({
    container: {
        margin: '0 auto',
        width: '100%',
        borderColor: 'white',
    },
    forecastContainer: {
        display: 'flex',
        flexDirection: 'column',
        margin: '0 auto',
        width: '90%',
        borderRadius: 20,
        backgroundColor: 'rgba(92, 98, 129, 0.9)',
        padding: '1rem',
        '@media (max-width: 1480px)': {
            width: '350px !important',
        },
        '@media (max-width: 1280px)': {
            width: '300px !important',
        },
        '@media (max-width: 1040px)': {
            width: '280px !important',
        },
        '@media (max-width: 630px)': {
            width: '250px !important',
        },
        '@media (max-width: 500px)': {
            width: '245px !important',
        },
    },
    dailyItem: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap:10,
        cursor: 'pointer',
        height: 60,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        borderRadius: 15,
        fontSize: 14,
        padding: '5px 20px',
    },
    iconSmall: {
        width: '70px !important',
    },
    dailyItemDay: {
        fontSize: 18,
        textAlign: 'start',
        cursor: 'inherit',
        color: '#212121',
        flex: '1 1',
        fontWeight: 600,
        marginLeft: 15,
    },
    description: {
        cursor: 'inherit',
        flex: '1 1',
        marginRight: 15,
        textAlign: 'right',
    },
    bottom: {
        display: 'flex',
        justifyContent: 'space-evenly',
        textAlign: 'center',
        margin: '1rem auto',
        padding: '1rem',
        borderRadius: '12px',
        backgroundColor: 'rgba(255,255,255, 0.2)',
    },
    bold: {
        color: '#fff',
        fontWeight: 700,
    },
    dailyTemp: {
        textAlign: 'start',
        fontSize: 26,
        paddingLeft: 12,
        fontWeight: 800,
        color: '#fff',
    },
    descriptionText: {
        fontSize: 20,
        fontWeight: 600,
        color: '#fff',
    },
}));
