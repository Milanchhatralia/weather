const directions=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];

const Utils = {
    isNull: value => value == null || value === undefined,
    validateObject: (object, schema) => Object.keys(schema)
                                            .filter(key => !schema[key](object[key]))
                                            .map(key => new Error(`${key} is invalid.`)),
    degToCompass: value => {
        let compassVal = parseInt((value/22.5) + 0.5);
        return directions[(compassVal % 16)];
    },
    kelvinToCelsius: kelvin => Math.round(kelvin - 275.15) + "˚C",
    celsiusToFeh: celsius => Math.round(Math.floor(celsius * (9/5) + 32)),
    getCleanTime: timestamp => {
        let date = new Date(timestamp*1000);
        let hour = (date.getHours() % 12) || 12;
        let meridian = (date.getHours() / 12) > 1 ? " PM" : " AM";
        return hour+":"+date.getMinutes() + meridian;
    },
    getHorizonOffset: (localTime, sunrise, sunset) => {
        let current = Date.now()/1000;
        let horizon = sunset - sunrise;
        let currentPosition = current - sunrise;
        return Math.round(currentPosition / horizon * 100);
    },
    getCleanDate: timestamp => {
        let date = new Date(timestamp*1000);
        let day = date.toLocaleString("default", { weekday: "long" })
        let month = date.toLocaleString('en-us', { month: 'short' });
        return day + ", " + date.getDate() + " " + month;
    },
    getDayName: timestamp => {
        let date = new Date(timestamp*1000);
        let day = date.toLocaleString("default", { weekday: "long" })
        return day;
    },
    getUTCDateTime: offset => {
        let date = new Date();
        offset = offset/60/60;
        let localTime = date.getTime();
        let localOffset = date.getTimezoneOffset() * 60000;
        let utc = localTime + localOffset;

        let newDateTime = utc + (3600000 * offset);    
        let convertedDateTime = new Date(newDateTime).getTime();
        console.log(convertedDateTime)
        return convertedDateTime/1000;
        // return convertedDateTime.toLocaleString();
    },
    getSunOffset: (current, sunrise, sunset) => {
        if(!sunrise < current < sunset) return 0;
        let horizon = sunset - sunrise;
        let offset = (current - sunrise) / horizon * 100;
        console.log(horizon, (current- sunrise), offset)
        return offset;
    }
    
}

export {Utils};