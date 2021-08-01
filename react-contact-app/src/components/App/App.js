import React, { useEffect, useState } from 'react';
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import api from '../../api/contacts'

import Header from '../Header'
import AddContact from '../AddContact'
import ContactList from '../ContactList'
import ContactDetail from '../ContactDetail'
import EditContact from '../EditContact'

function App() {

  const LOCAL_STORAGE_KEY = 'contacts';

  const initialContact = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];

  const [myContact, setContacts] = useState(initialContact);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data
  }

  const addContactHandler = async (conatct) => {
    const request = {
      id: uuidv4(),
      ...conatct
    }
    const response = await api.post("/contacts", request)
    // setContacts([...myContact, { id: uuidv4(), ...conatct }])
    setContacts([...myContact, response.data])
  };

  const removeContactHandler = async (id) => {

    await api.delete(`/contacts/${id}`)
    const newContactList = myContact.filter((contact) => {
      return contact.id !== id
    });

    setContacts(newContactList)
  }

  const updateContactHandler = async (conatct) => {
    const response = await api.put(`/contacts/${conatct.id}`, conatct)
    const { id, name, email } = response.data;
    setContacts(myContact.map((contact) => {
      return contact.id === id ? { ...response.data } : contact
    }))
  };

  const searchHandler = (value) => {
    setSearch(value);
    if (value !== "") {
      const searchedList = myContact.filter((contact) => {
        return Object.values(contact).join(" ").toLowerCase().includes(value.toLowerCase())
      });
      setSearchResults(searchedList);
    }
    else {
      setSearchResults(myContact);
    }
  }

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(myContact))
  }, [myContact])

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) { setContacts(retriveContacts) }
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) { setContacts(allContacts) }
    };
    getAllContacts();
  }, [])

  return (
    <div className="ui container">
      <Router>
        <Header />
        <Switch>
          {/* <Route path="/add" component={() => (
            <AddContact addContactHandler={addContactHandler} />
          )} /> */}
          {/* <Route path="/" component={()=>(
            <ContactList removeContactHandler={removeContactHandler} contacts={myContact} />
          )} /> */}
          <Route
            path="/add" exact render={(props) => (
              <AddContact
                {...props}
                addContactHandler={addContactHandler}
              />
            )}
          />
          <Route
            path="/" exact render={(props) => (
              <ContactList
                {...props}
                contacts={search.length < 1 ? myContact : searchResults}
                removeContactHandler={removeContactHandler}
                term={search}
                searchHandler={searchHandler}
              />
            )}
          />
          <Route
            path="/contact/:id" exact render={(props) => (
              <ContactDetail
                {...props}
              />
            )}
          />
          <Route
            path="/edit" exact render={(props) => (
              <EditContact
                {...props}
                updateContactHandler={updateContactHandler}
              />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
