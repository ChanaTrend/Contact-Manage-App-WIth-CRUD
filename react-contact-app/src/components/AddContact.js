import React from 'react';

class AddContact extends React.Component {

    state = {
        name: "",
        email: ""
    }

    addContact = (e) => {
        e.preventDefault();
        if (this.state.name === '' || this.state.email === '') {
            alert("Please fill all the details !");
            return
        } else {
            this.props.addContactHandler(this.state);
            this.setState({
                name: "",
                email: ""
            })
            this.props.history.push("/")
        }
    }

    render() {
        return (
            <div className="ui main">
                <form className="ui form center" onSubmit={this.addContact}>
                    <h2>Add Contact</h2>
                    <div className="field">
                        <label>Name</label>
                        <input value={this.state.name} type="text" name="name" placeholder="Name" onChange={(e) => this.setState({ name: e.target.value })} />
                    </div>
                    <div className="field">
                        <label>Email</label>
                        <input value={this.state.email} type="text" name="email" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })} />
                    </div>
                    <button className="ui button blue">Add</button>
                </form>
            </div>
        )
    }
};

export default AddContact;