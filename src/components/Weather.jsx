import React, { useEffect, useState } from 'react';
import {fetchWeatherFromPlace} from '../Data/fetchWeather'

import WeatherCardPrimary from './WeatherCardPrimary';
import WeatherForcast from './WeatherForcast';

const Weather = props => {
    const [minute, setMinute] = useState(0);
    const [data, setData] = useState(null);
    const [loaded, setLoaded] = useState(false)
    const [status, setStatus] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setMinute(minute => minute + 1);
        }, 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        console.log("changed");
        (async () => {
            setData(null)
            let response = await fetchWeatherFromPlace(props.place);
            setLoaded(true);
            setStatus(response.cod);
            setData(response);
        })()
    },[props.place, minute]);
    
    return (
        (loaded && data !== null) ?
            (status === 200)
            ? 
            <>
                <WeatherCardPrimary data={data} />
                {
                    (data.daily !== null)
                    ? <WeatherForcast daily={data.daily} />
                    : null
                }
            </>
            :
            <div className="center mt-5">
                <span className=" semi-bold">Something went wrong</span>
            </div>
        : null
    );
}
 
export default Weather;