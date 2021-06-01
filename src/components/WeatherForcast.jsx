import React from 'react';
import {Utils} from '../Data/Utils';
const WeatherForcast = (props) => {

    let {daily} = props;
    return (
        <div className="daily-forcast negative-margin-mobile">
        {
            (daily.slice(1).map((item,i)=>{
                return (
                    <div key={i} className="daily-item">
                        <p className="font-smaller light">{Utils.getDayName(item.dt)}</p>
                        <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} alt="" />
                        <p className="font-larger semi-bold">{Utils.kelvinToCelsius(item.temp.day)}</p>
                    </div>
                )
            }))
        }
        </div>
    )
}

export default WeatherForcast;