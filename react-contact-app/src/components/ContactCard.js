import React from 'react';
import user from '../images/user.jpg'
import { Link } from "react-router-dom"

const ContactCard = (props) => {

    const { id, name, email } = props.contacts;

    return (
        <div className="item">
            <div className="ui grid">
                <div className="one wide column">
                    <img className="ui avatar image" src={user} alt="user" />
                </div>
                <div className="thirteen wide column content">
                    <Link to={{ pathname: `/contact/${id}`, state: { contact: props.contacts } }} >
                        {/* <Link to={`/contact/${id}`} > */}
                        <div className="header">
                            {name}
                        </div>
                        <div>
                            {email}
                        </div>
                    </Link>
                </div>
                <div className="two wide column">
                    <i className="trash alternate outline icon right"
                        style={{ color: "red", marginTop: "8px", cursor: "pointer" }} onClick={() => props.clickHandler(id)}>
                    </i>
                    <Link to={{ pathname: `/edit`, state: { contact: props.contacts } }}>
                        <i className="edit alternate outline icon right"
                            style={{ color: "red", marginTop: "8px", marginLeft: "10px", cursor: "pointer" }}>
                        </i>
                    </Link>
                </div>
            </div>

        </div>
    )
};

export default ContactCard;