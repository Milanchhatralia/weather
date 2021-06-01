import React from 'react';
import {Utils} from '../Data/Utils'

import AtAGlance from './elements/AtAGlance';

import ArrowUp from '../res/icons/up-arrow.svg'
import ArrowDown from '../res/icons/down-arrow.svg'
import Wind from '../res/icons/wind.svg'
import Humidity from '../res/icons/humidity.svg'
import Visibility from '../res/icons/visibility.svg'


const WeatherCardPrimary = props => {
    const { data } = props;
    const {sunrise, sunset} = data.sys;
    const localDateTime = Utils.getUTCDateTime(data.timezone);
    const sunOffset = Utils.getSunOffset(localDateTime, sunrise, sunset);
    const { wind:{speed, deg}, visibility, main:{humidity} } = data;

    return (
        <div className="weather-card-primary">

            <div className="d-flex align-items-center">
                <div className="d-inline-block">
                    <span className="font-larger semi-bold">{data.name}</span>
                    <span className="font-smaller light text-grey d-block">
                        <span className="medium">{Utils.getCleanTime(localDateTime)}</span>&nbsp;&nbsp;
                        {Utils.getCleanDate(localDateTime)} 
                    </span>
                </div>
                <img className="ml-auto weather-img" src={data.weather.icon} alt="" />
            </div>
            <div className="info">
                <span className="font-huge"><span className="bold">{data.main.celcius.temp}</span>˚C</span>
                <div className=" light">
                    <span>{data.weather.main}</span>
                    <span className='high-low'>
                        <span className="mr-3">
                            <img src={ArrowUp} alt="" />
                            {data.main.celcius.temp_max}˚C
                        </span>
                        <span>
                            <img src={ArrowDown} alt="" />
                            {data.main.celcius.temp_min}˚C
                        </span>
                    </span>
                </div>
            </div>

            {
                (sunOffset > 10 && sunOffset < 90)
                ? 
                <div className="horizon">
                    <div className="timeline">
                        <span style={{left: `${sunOffset}%`}} className="sun"></span>
                    </div>
                    <div className="d-flex mt-1">
                        <span>{Utils.getCleanTime(sunrise)}</span>
                        <span className="ml-auto">{Utils.getCleanTime(sunset)}</span>
                    </div>
                </div>
                : <></>
            }
            
            <div className="atAGlance">
                {
                    (speed !== null)
                    ?
                    <AtAGlance iconSrc={Wind} >
                        <span className="semi-bold">{Utils.degToCompass(deg)}</span>&nbsp;&nbsp;
                        <span>{Math.round(speed)} km </span>
                    </AtAGlance>
                    : <></>
                }
                {
                    (visibility>0)
                    ? 
                    <AtAGlance iconSrc={Visibility} >
                        <span>{visibility/1000} km</span>
                    </AtAGlance>
                    : <></>
                }
                {
                    (humidity>0)
                    ?
                    <AtAGlance iconSrc={Humidity} >
                        <span>{humidity}%</span>
                    </AtAGlance>
                    : <></>
                }
            </div>
            
        </div>
    );
}
 
export default WeatherCardPrimary;