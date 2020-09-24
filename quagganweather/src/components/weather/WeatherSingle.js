import React from 'react';
import WeatherImages from './WeatherImages';
import './Weather.css';

class WeatherSingle extends React.Component {

    displayCurrentWeather() {
        if (this.props.weather.current) {
            return (
                <div className="ui fluid card custom">
                    <div className="content">
                        <div className="image custom right">
                            <WeatherImages 
                                code={this.props.weather.current.weather[0].id}
                                imageListDetails={this.props.imageListDetails}
                            ></WeatherImages>
                        </div>
                        <div className="header wrapper">
                            <div className="header custom">Current Weather:</div>
                            <div className="header middle custom">{this.props.weather.current.weather[0].main}</div>
                        </div>
                        <div className="header wrapper">
                            <div className="header custom">Current Temperature:</div>
                            <div className="header middle custom">{this.props.weather.current.temp}&#176;F</div>

                        </div>
                        <div className="header wrapper">
                            <div className="header custom">Feels Like:</div>
                            <div className="header middle custom">{this.props.weather.current.feels_like}&#176;F</div>

                        </div>
                        <div className="header wrapper">
                            <div className="header custom">Humidity:</div>
                            <div className="header middle custom">{this.props.weather.current.humidity}%</div>

                        </div>
                        <div className="header wrapper">
                            <div className="header custom">Wind:</div>
                            <div className="header middle custom">{this.props.weather.current.wind_speed} MPH</div>

                        </div> 
                    </div>
                </div>
            );
        }
        return (
            <div>Loading Weather...</div>
        )
    }

    render() {
        return (
            <React.Fragment>{this.displayCurrentWeather()}</React.Fragment>
        );
    }

}

export default WeatherSingle;