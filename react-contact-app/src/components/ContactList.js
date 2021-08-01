import React, { useRef } from 'react';
import ContactCard from './ContactCard'
import { Link } from 'react-router-dom'

const ContactList = (props) => {

    const inputE1 = useRef("");

    const deleteContactHandler = (id) => {
        props.removeContactHandler(id)
    }

    const renderContacList = props.contacts.map((contact, index) => {
        return (
            <ContactCard key={index} contacts={contact} clickHandler={deleteContactHandler} />
        )
    });

    const getSearch = () => {
        props.searchHandler(inputE1.current.value)
    }

    return (
        <div className="main" style={{ marginTop: "50px" }}>
            <h2>
                Contact List
                <Link to="/add">
                    <button className="ui button blue right" style={{ marginLeft: "10px" }}>Add Contact</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputE1} type="text" placeholder="Search Here" className="prompt" value={props.term} onChange={getSearch} />
                    <i className="search icon"></i>
                </div>
            </div>
            <div className="ui celled list">
                {renderContacList.length > 0 ? renderContacList : "No Contacts Available"}
            </div>
        </div>
    )
};

export default ContactList;