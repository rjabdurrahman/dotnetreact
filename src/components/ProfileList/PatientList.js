import React, { Component } from 'react'
import axios from 'axios';
import { API_URL } from '../../config';
import avater from './avater.png';

export class PatientList extends Component {
    constructor() {
        super();
        this.state = {
            patients: [],
            pat: null,
            doctor: JSON.parse(global.localStorage.user)
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/pappoinment`)
            .then(res => {
                this.setState({ patients: res.data });
                console.log(res.data)
            })
            .catch(err => console.log(err));
    }

    render() {
        const patientList = this.state.patients.map((patient, index) => (
            <li onClick={() => this.setState({ pat: patient })} key={index} className="w3-bar">
                <img src={avater} alt="patient" className="w3-bar-item w3-circle w3-hide-small" style={{ width: '85px' }} />
                <div className="w3-bar-item">
                    <span className="w3-large">{patient.name}</span><br />
                    <span>{patient.problem}</span>
                </div>
            </li>
        ));
        return (
            <div style={{ marginTop: 0, paddingTop: '80px', marginBottom: '20px' }}>
                {/* Patient List */}
                <div className="w3-container">
                    <h4>Patient List</h4>
                    <ul className="w3-ul w3-card-4">
                        {patientList}
                    </ul>
                </div>
                {/* Patient List End */}
                <div className="w3-container" style={{ marginTop: '20px' }}>
                    <div className="w3-border w3-card-2">
                        <ul className="w3-ul">
                            <li className=" w3-light-gray">
                                <h3>Prescription</h3>
                            </li>
                        </ul>
                        <div style={{ margin: '25px' }}>
                            {
                                this.state.pat &&
                                <div style={{ borderBottom: '1px solid black' }}>
                                    <h3>Name: {this.state.pat.name}</h3>
                                    <p>Age: {this.state.pat.age}</p>
                                    <p>Address: {this.state.pat.address}</p>
                                </div>
                            }
                            <h2>&#8478;</h2>
                            <div style={{ height: '400px' }}>
                                Write Here....
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PatientList
