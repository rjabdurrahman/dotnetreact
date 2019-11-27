import React, { Component } from 'react'
import axios from 'axios'

export class Weather extends Component {

    constructor() {
        super();
        this.state = {
            weather: []
        }
    }

    componentDidMount() {
        axios.get('https://localhost:5001/api/WeatherForecast')
            .then(res => { this.setState({ weather: res.data }); })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.weather.map((x, index) => <li key={index}>{x.summary}</li>)
                    }
                </ul>
            </div>
        )
    }
}

export default Weather
