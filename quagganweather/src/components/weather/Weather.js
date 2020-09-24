import React from 'react';
import WeatherSingle from './WeatherSingle';
import WeatherMulti from './WeatherMulti';
import weather from '../api/weather';
import guildWars from '../api/guildWars';

//Overriding semantic UI styling
import './Weather.css';

class Weather extends React.Component {
    state = {
        selectedForecast: "daily",
        imageListDetails: [],
        errorMessage: null, 
        weather: {}
    }
 
    componentDidMount = async () => {
        //wait until we have list of asset details from guildWars API's
        this.getImageListDetails(await this.getImageAssetList());
        this.getCurrentWeather(await this.getLocationInfo());
    }

    //Setup helper method - Get list of keys for images
    getImageAssetList = async () => {
        const response = await guildWars.get("/quaggans");
        return response.data;
    }

    //Setup helper method - Get image details and store in state to avoid extra api calls later
    getImageListDetails = async (assetList) => {
        assetList.forEach(async imageKey => {
            var response = await guildWars.get(`/quaggans/${imageKey}`);
            response = response.data;
            this.setState ((prevState, state) => {
                return {imageListDetails:[...prevState.imageListDetails, response]};        
            })
        })
    }

    //Setup helper method - Get user long/lat coords
    getLocationInfo = async () => {
        return new Promise((response, reject) => {
            window.navigator.geolocation.getCurrentPosition(response, reject)
        }).then((pos) => {return pos.coords});
        
    }

    //Setup helper method - Get weather details (current/hourly/daily)
    getCurrentWeather = async (coords) => {
        const response = await weather.get(`/data/2.5/onecall?lat=${coords.latitude}&lon=${coords.longitude}&units=imperial&appid=0eae7dece67d9db8fd52305f4d06dff8`);
        this.setState({weather: response.data});
    }

    //Update state when user selects a different forecast type
    onSelectForcastType = (type) => {
        this.setState({selectedForecast: type});
    }

    renderButtons = () => {
        return (
            <div className="ui buttons custom">
                <button 
                    onClick={() => this.onSelectForcastType("current")} 
                    className="ui green button"
                >Current Weather</button>
                <button 
                    onClick={() => this.onSelectForcastType("hourly")}
                    className="ui blue button"
                >Hourly Weather</button>
                <button 
                    onClick={() => this.onSelectForcastType("daily")}
                    className="ui orange button"
                >Daily Weather</button>
            </div>
        );
    }

    render() {
        if (this.state.selectedForecast !=="current") {
            return (
                <React.Fragment>
                    {this.renderButtons()}
                    <WeatherMulti 
                        weather={this.state.weather}
                        imageListDetails={this.state.imageListDetails} 
                        selectedForecast={this.state.selectedForecast}
                    ></WeatherMulti>
                </React.Fragment>
            );
        }
        return (
            <React.Fragment>
                {this.renderButtons()}
                <WeatherSingle 
                    imageListDetails={this.state.imageListDetails} 
                    weather={this.state.weather}
                ></WeatherSingle>
            </React.Fragment>

        );
    }
}


export default Weather;