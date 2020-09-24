import React from 'react';
import WeatherImages from './WeatherImages';

class WeatherMulti extends React.Component {

    //Get openweather icons for forecast
    getIcon = (code) => {
        return `http://openweathermap.org/img/wn/${code}@4x.png`;
    }

    convertDate = (epoch) => {
        var date = new Date(0)
        date.setUTCSeconds(epoch);
        return (date.toDateString());
    }

    convertTime = (epoch) => {
        var time = new Date(0);
        time.setUTCSeconds(epoch);
        var minutes = time.getMinutes();
        var hours = time.getHours();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        if (hours < 10) {
            hours = "0" + hours;
        }
        time = hours + ":" +  minutes;
        return time;
    }

    displayDailyWeather() {
        if (this.props.weather.daily) {
            return (
                this.props.weather.daily.map((day, index) => {
                    return (
                        <div className="ui fluid card" key={index}>
                            <div className="content">
                                <div className="image left">
                                    <img alt="" src={this.getIcon(day.weather[0].icon)}></img>
                                </div>
                                <div className="image custom right">
                                    <WeatherImages 
                                        code= {day.weather[0].id}
                                        imageListDetails={this.props.imageListDetails}
                                    ></WeatherImages>
                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Date</div>
                                    <div className="header middle custom">{this.convertDate(day.dt)}</div>
                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Forecast</div>
                                    <div className="header middle custom">{day.weather[0].main}</div>
                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Temp Morning:</div>
                                    <div className="header middle custom">{day.temp.morn}&#176;F</div>

                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Temerature Daytime:</div>
                                    <div className="header middle custom">{day.temp.day}&#176;F</div>

                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Temp Evening:</div>
                                    <div className="header middle custom">{day.temp.eve}&#176;F</div>

                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Temp Night:</div>
                                    <div className="header middle custom">{day.temp.night}&#176;F</div>

                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Humidity:</div>
                                    <div className="header middle custom">{day.humidity}%</div>

                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Wind:</div>
                                    <div className="header middle custom">{day.wind_speed} MPH</div>
                                </div>
                            </div>
                        </div>    
                    );
                })
            );
        }
        return (
            <div>Loading Weather...</div>
        )
    }

    displayHourlyWeather() {
        if (this.props.weather.hourly) {
            return (
                this.props.weather.hourly.map((hour, index) => {
                    return (
                        <div className="ui fluid card custom" key={index}>
                            <div className="content">
                                <div className="image left">
                                    <img alt="" src={this.getIcon(hour.weather[0].icon)}></img>
                                </div>
                                <div className="image custom right">
                                    <WeatherImages 
                                        code= {hour.weather[0].id}
                                        imageListDetails={this.props.imageListDetails}
                                    ></WeatherImages>
                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Time</div>
                                    <div className="header middle custom">{this.convertTime(hour.dt)}</div>
                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Forecast</div>
                                    <div className="header middle custom">{hour.weather[0].main}</div>
                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Temperature:</div>
                                    <div className="header middle custom">{hour.temp}&#176;F</div>

                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Feels Like:</div>
                                    <div className="header middle custom">{hour.feels_like}&#176;F</div>

                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Humidity:</div>
                                    <div className="header middle custom">{hour.humidity}%</div>

                                </div>
                                <div className="header wrapper">
                                    <div className="header custom">Wind:</div>
                                    <div className="header middle custom">{hour.wind_speed} MPH</div>
                                </div>
                            </div>
                        </div>    
                    );
                })
            );
        }
        return (
            <div>Loading Weather...</div>
        )
    }

    render() {
        if (this.props.selectedForecast === "hourly") {
            return (
                <React.Fragment>{this.displayHourlyWeather()}</React.Fragment>
            );
        }
        return (
            <React.Fragment>{this.displayDailyWeather()}</React.Fragment>

        )
    }
}

export default WeatherMulti;