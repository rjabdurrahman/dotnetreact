import React, { Component } from 'react'
import ProfileCard from '../ProfileCard/ProfileCard';
import axios from 'axios';
import { API_URL } from '../../config';

export class ProfileList extends Component {
    constructor() {
        super();
        this.state = {
            doctors: []
        }
    }

    componentDidMount() {
        axios.get(`${API_URL}/doctor`)
        .then(res => this.setState({doctors: res.data}))
        .catch(err => console.log(err));
    }
    
    render() {
        const doctorList = this.state.doctors.map((profile, index) => (
            <ProfileCard key={index} profile={profile} />
        ));
        return (
            <div className="w3-container" style={{ marginTop: 0, paddingTop: '80px', marginBottom: '20px' }}>
                <div className="w3-border w3-card-2">
                    <ul className="w3-ul">
                        <li className=" w3-light-gray">
                            <h3>Doctors</h3>
                        </li>
                    </ul>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px', marginBottom: '15px' }}>
                        {doctorList}
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileList
