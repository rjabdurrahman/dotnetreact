import React, { Component } from 'react';
import axios from 'axios';
import './TopNav.css';
import '../../App.css';
import { API_URL } from '../../config'


class TopNav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            logged: global.localStorage.getItem('user') ? true : false,
            type: global.localStorage.getItem('user') ? JSON.parse(global.localStorage.getItem('user')).userType : 0,
        }
        console.log(this.state)
    }
    usernameInputHandler = (event) => {
        this.setState({ username: event.target.value });
    }
    passwordInputHandler = (event) => {
        this.setState({ password: event.target.value });
    }
    submitHandler = (event) => {
        event.preventDefault();
        axios.post(`${API_URL}/login`, { username: this.state.username, password: this.state.password })
            .then(res => {
                this.setState({ logged: true });
                global.localStorage.setItem('user', JSON.stringify(res.data));
                global.location.reload();
            })
            .catch(err => {
                console.log(err);
                alert('Username or Password is Incorrect!');
            });
    }

    logOutHandler = () => {
        this.setState({ logged: false });
        global.localStorage.removeItem('user');
    }

    render() {
        return (
            <header>
                <div className="header-nav" style={{ justifyContent: 'space-between' }}>
                    <div style={{ fontFamily: '"Pacifico", cursive', fontSize: '25px' }}>
                        <a href="/">
                            <h2 style={{ margin: '0' }} className="pac-font">Appoinment</h2>
                        </a>
                    </div>
                    <div style={this.state.logged ? { display: 'none' } : { display: 'block' }}>
                        <form className="flex top-login" onSubmit={this.submitHandler}>
                            <input type="text" className="w3-input" placeholder="Username" name="username" value={this.state.username} onChange={this.usernameInputHandler} required />
                            <input type="password" className="w3-input" placeholder="Password" name="password" value={this.state.password} onChange={this.passwordInputHandler} required />
                            <button className="w3-white">Login</button>
                        </form>
                    </div>
                    <div className="top-login" style={this.state.logged ? { display: 'block' } : { display: 'none' }}>
                        <div className="w3-bar" style={this.state.type === 1 ? { display: 'block' } : { display: 'none' }}>
                            <a href="/" className="w3-bar-item w3-button w3-bottombar">HOME</a>
                            <a href="/patients" className="w3-bar-item w3-button w3-bottombar">PATIENT LIST</a>
                            <a href="/prescribe" className="w3-bar-item w3-button w3-bottombar">PRESCRIBE</a>
                            <a href="/" className="w3-bar-item w3-button w3-bottombar" onClick={this.logOutHandler}>LOG OUT</a>
                        </div>
                        <div className="w3-bar" style={this.state.type === 2 ? { display: 'block' } : { display: 'none' }}>
                            <a href="/" className="w3-bar-item w3-button w3-bottombar">HOME</a>
                            <a href="/apoinment" className="w3-bar-item w3-button w3-bottombar">APPOINMENT</a>
                            <a href="/mypres" className="w3-bar-item w3-button w3-bottombar">MY PRESCRIPTIONS</a>
                            <a href="/" className="w3-bar-item w3-button w3-bottombar" onClick={this.logOutHandler}>LOG OUT</a>
                        </div>
                    </div>
                </div>
            </header>
        );
    }
}

export default TopNav;