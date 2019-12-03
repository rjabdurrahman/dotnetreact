import React, { Component } from 'react'
import './ProfileCard.css';
import ProfileImg from './profile.jpg';
import axios from 'axios';
import { API_URL } from '../../config';

export class ProfileCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            patientId: JSON.parse(global.localStorage.getItem('user')).userId,
            problem: '',
            showProblem: false
        }
        this.appoinmentHandler = this.appoinmentHandler.bind(this);
    }

    appoinmentHandler(e) {
        e.preventDefault();
        axios.post(`${API_URL}/appoinment`, { doctorId: this.props.profile.doctorId, patientId: this.state.patientId, problem: this.state.problem, prescription: '' })
            .then(res => {
                console.log(res.data);
                this.setState({ showProblem: false });
                alert('Your appoinment Confirmed to ' + this.props.profile.name);
            })
            .catch(err => console.log(err));
    }

    render() {
        let { name, specialist, institution } = this.props.profile;
        return (
            <div key={this.props.data} className="profile-card" style={{ margin: '0 10px' }}>
                <img src={ProfileImg} alt={ProfileImg} style={{ width: '100%', maxHeight: '300px' }} />
                <h1 style={{ textTransform: 'uppercase' }}>{this.props.name}</h1>
                <p className="title">{name}</p>
                <p>{specialist} Specailist</p>
                <p>({institution})</p>
                <p style={{ margin: 0, padding: 0 }}><button onClick={() => { this.setState({ showProblem: true }) }}>Reserve Appoinment</button></p>
                {/* Register Modal Start */}
                {this.state.showProblem && <div className="w3-modal" style={{ display: 'block' }}>
                    <div className="w3-modal-content w3-animate-zoom div-box" style={{ backgroundColor: 'transparent' }}>
                        <div className="w3-light-gray w3-card-4 margin-auto">
                            <div className="w3-container main-bg-color div-title">
                                <span className="w3-button w3-display-topright" onClick={() => { this.setState({ showProblem: false }) }}>×</span>
                                <h2>Write Your Problem</h2>
                            </div>
                            <div className="w3-container">
                                <form onSubmit={this.appoinmentHandler}>
                                    <div className="w3-row w3-section">
                                        <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                            <label className="w3-medium">Problem</label>
                                        </div>
                                        <div className="w3-rest">
                                            <input className="w3-input w3-border" type="text" name="username" onChange={e => this.setState({ problem: e.target.value })} required />
                                        </div>
                                    </div>
                                    <p className="clearfix">
                                        <button className="w3-btn main-bg-color div-title" style={{ float: 'right' }}>Submit</button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>}
                {/* Register Modal End */}
            </div>
        )
    }
}

export default ProfileCard
