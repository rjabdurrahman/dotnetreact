import React, { Component } from 'react'
import axios from 'axios';
import { API_URL } from '../../config';

export class Prescription extends Component {
    constructor() {
        super();
        this.state = {
            doctors: [],
            doc: null
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/pdocs`)
            .then(res => {
                this.setState({
                    doctors: res.data.filter(
                        x => x.patientId === JSON.parse(global.localStorage.getItem('user')).userId
                    )
                });
                console.log(this.state)
            })
            .catch(err => console.log(err));
    }

    render() {
        const doctorList = this.state.doctors.map((doctor, index) => (
            <li onClick={() => this.setState({ doc: doctor })} key={index} className="w3-bar">
                <div className="w3-bar-item">
                    <span className="w3-large">{doctor.name}</span><br />
                </div>
            </li>
        ));
        return (
            <div style={{ marginTop: 0, paddingTop: '80px', marginBottom: '20px' }}>
                {/* Patient List */}
                <div className="w3-container">
                    <h4>Doctors List</h4>
                    <ul className="w3-ul w3-card-4">
                        {doctorList}
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
                                this.state.doc &&
                                <div style={{ borderBottom: '1px solid black' }}>
                                    <h3>Dr. {this.state.doc.name}</h3>
                                    <p>Specialist: {this.state.doc.specialist} ({this.state.doc.institution})</p>
                                    <p>Mobile: {this.state.doc.mobile}</p>
                                </div>
                            }
                            <h2>&#8478;</h2>
                            {
                                this.state.doc &&
                                <p>Problem: {this.state.doc.problem}</p>
                            }
                            <p>---------------</p>
                            <div style={{ height: '400px' }}>
                                <div
                                    style={{ width: '100%', height: '100%', border: 'none', outline: 'none', fontSize: '22px' }}>
                                    {this.state.doc && this.state.doc.prescription}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Prescription
