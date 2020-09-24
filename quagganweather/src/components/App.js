import React from 'react';
import Weather from './weather/Weather';

class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <Weather></Weather>
            </div>
        );
    }
}
export default App;