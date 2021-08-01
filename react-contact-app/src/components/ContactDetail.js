import React from 'react';
import user from '../images/user.jpg'
import { Link } from "react-router-dom"

const ContactDetail = (props) => {
    const { name, email } = props.location.state.contact

    return (
        <div className="main" style={{ marginTop: "50px" }}>
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>
            <div className="centered">
                <Link to="/">
                    <button className="ui button blue">
                        <i className="circular users icon"></i> Back to List
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;