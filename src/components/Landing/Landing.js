import React, { Component } from 'react'
import update from 'react-addons-update';
import axios from 'axios';
import Overlay from '../Overlay';
import { API_URL } from '../../config';

export class Landing extends Component {

    constructor() {
        super()
        this.state = {
            showRegister: false,
            regType: 'Doctor',
            user: {
                username: '',
                password: '',
                userType: 1
            },
            agree: false,
            confirmPassword: '',
            userType: global.localStorage.getItem('user') ? JSON.parse(global.localStorage.getItem('user')).userType : 0
        }
    }

    inputHandler = (event) => {
        this.state.user[event.target.name] = event.target.value;
        this.setState({ user: this.state.user });
    }

    updateType = (n) => {
        this.setState(
            { user: update(this.state.user, { userType: { $set: n } }) }
        )
    }

    confirmPasswordHandler = (event) => {
        this.setState({ confirmPassword: event.target.value });
    }

    submitHandler = (event) => {
        event.preventDefault();
        if (!this.state.agree) {
            alert('Please Agree Terms and Rules!');
            return;
        }
        console.log(this.state.user);
        axios.post(`${API_URL}/user`, this.state.user)
            .then(res => {
                alert('You are registered as ' + res.data.userName);
                global.localStorage.setItem('user', JSON.stringify(res.data));
                this.setState({
                    showRegister: false,
                    user: {
                        username: '',
                        email: '',
                        password: '',
                        type: 1
                    },
                    agree: false,
                    confirmPassword: ''
                });
                global.location.reload();
            })
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                <Overlay>
                    <div style={this.state.userType === 0 ? { display: 'block' } : { display: 'none' }}>
                        <h1 style={{ fontSize: '65px', textAlign: 'center', color: 'white' }} className="ex-font">Get Started As A</h1>
                        <div className="mont-font" style={{ fontSize: '25px', textAlign: 'center' }}>
                            <button className="w3-btn main-bg-color" onClick={() => { this.setState({ showRegister: true, regType: 'Doctor' }); this.updateType(1) }}>Doctor</button>
                            <button className="w3-btn main-bg-color" onClick={() => { this.setState({ showRegister: true, regType: 'Patient' }); this.updateType(2) }}>Patient</button>
                        </div>
                    </div>
                    <div style={this.state.userType === 1 ? { display: 'block', width: '800px' } : { display: 'none' }}>
                        <h1 style={{ fontSize: '65px', textAlign: 'center', color: 'white' }} className="ex-font">Show Your List and Prescribe Easily</h1>
                        <div className="mont-font" style={{ fontSize: '25px', textAlign: 'center' }}>
                            <a href="/create-post" style={{ marginBottom: '20px' }} className="w3-btn main-bg-color">Patient List</a><br/>
                            <a href="/posts" className="w3-btn w3-white">Issue Prescription</a>
                        </div>
                    </div>
                    <div style={this.state.userType === 2 ? { display: 'block', width: '800px', marginLeft: 'auto' } : { display: 'none' }}>
                        <h1 style={{ fontSize: '65px', textAlign: 'center', color: 'white' }} className="ex-font">View Doctors and Take an Apoinment Easily</h1>
                        <div className="mont-font" style={{ fontSize: '25px', textAlign: 'center' }}>
                            <a href="/posts" className="w3-btn main-bg-color">View Doctors</a><br/>
                            <a href="/" style={{ marginBottom: '20px' }} className="w3-btn w3-white">Take and Appoinment</a>
                        </div>
                    </div>
                </Overlay>
                {/* Register Modal Start */}
                {this.state.showRegister && <div className="w3-modal" style={{ display: 'block' }}>
                    <div className="w3-modal-content w3-animate-zoom div-box" style={{ backgroundColor: 'transparent' }}>
                        <div className="w3-light-gray w3-card-4 margin-auto">
                            <div className="w3-container main-bg-color div-title">
                                <span className="w3-button w3-display-topright" onClick={() => { this.setState({ showRegister: false }) }}>×</span>
                                <h2>Register As a {this.state.regType}</h2>
                            </div>
                            <div className="w3-container">
                                <form onSubmit={this.submitHandler}>
                                    <div className="w3-row w3-section">
                                        <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                            <label className="w3-medium">Username</label>
                                        </div>
                                        <div className="w3-rest">
                                            <input className="w3-input w3-border" type="text" name="username" onChange={e => this.inputHandler(e)} required />
                                        </div>
                                    </div>
                                    <div className="w3-row w3-section">
                                        <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                            <label className="w3-medium">Password</label>
                                        </div>
                                        <div className="w3-rest">
                                            <input className="w3-input w3-border" type="password" name="password" onChange={e => this.inputHandler(e)} required />
                                        </div>
                                    </div>
                                    <div className="w3-row w3-section">
                                        <div className="w3-col" style={{ width: '120px', padding: '10px' }}>
                                            <label className="w3-medium">Re Passowrd</label>
                                        </div>
                                        <div className="w3-rest">
                                            <input className="w3-input w3-border" type="password" required />
                                        </div>
                                    </div>
                                    <p>
                                        <input className="w3-check" onChange={() => this.setState({ agree: true })} type="checkbox" />
                                        <label style={{ fontSize: '12px', color: 'indigo' }}> I accept the <a style={{ color: 'blue' }} href="terms">Terms and Conditions</a>.</label></p>
                                    <p>
                                    </p><p className="clearfix">
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

export default Landing
