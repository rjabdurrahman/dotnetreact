import React, { Component } from 'react'
import './ProfileCard.css';
import ProfileImg from './profile.jpg';

export class ProfileCard extends Component {
    render() {
        let {doctorId, name, specialist, institution, mobile} = this.props.profile;
        return (
            <div key={this.props.data} className="profile-card" style={{margin: '0 10px'}}>
                <img src={ProfileImg} alt={ProfileImg} style={{ width: '100%', maxHeight: '300px' }} />
                <h1 style={{ textTransform: 'uppercase' }}>{this.props.name}</h1>
                <p className="title">{name}</p>
                <p>{specialist} Specailist</p>
                <p>({institution})</p>
                <p style={{ margin: 0, padding: 0 }}><button>Reserve Appoinment</button></p>
            </div>
        )
    }
}

export default ProfileCard
