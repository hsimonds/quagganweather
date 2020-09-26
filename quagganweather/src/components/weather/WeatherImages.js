import React from 'react';
import './WeatherImages.css'
    
class WeatherImages extends React.Component {

    //Choose appropriate image based on weather code
    //https://openweathermap.org/weather-conditions
    chooseImage = (code) => {
        var id = "";
        if (code >= 200 && code < 300) {
            id="rain";
        }
        if (code >=300 && code <400) {
            id="bowl";
        }
        if (code >=500 && code <600) {
            id="bubble";
        }
        if (code >=600 && code <700) {
            id="hoodie-up";
        }
        if (code === 800) {
            id="vacation";
        }
        if (code >800 && code <900) {
            id="hoodie-down";
        }

        var imageURL = '';
        if (this.props.imageListDetails) {    
            for (const [,value] of Object.entries(this.props.imageListDetails)) {
                if (value.id === id) {
                    imageURL = value.url;
                }   
            }
            return imageURL;
        }
    }  

    renderImage = () => {
        return (
            <img alt="" className="ui medium image custom"  src={this.chooseImage(this.props.code)}></img>
        );
    }

    render() {       
        return (
            <React.Fragment>
                {this.renderImage()}
            </React.Fragment>
        )
    }
}

export default WeatherImages;