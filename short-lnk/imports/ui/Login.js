import React from 'react';
import {Link} from 'react-router';
import {Meteor} from 'meteor/meteor'

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error : ''
        };
    }

    onSubmit(e) {
        e.preventDefault();

        let email = this.refs.email.value.trim();
        let password = this.refs.password.value;

        Meteor.loginWithPassword(email, password, (err) => {
            if (err) {
                this.setState({error : 'Unable to login. Check email and password.'});
            } else {
                this.setState({error : ""});
            }
        });
    }

    render() {
        return (
            <div>
                <h1>Short Lnk</h1>
                {this.state.error ? <p>{this.state.error}</p> : undefined}
                <form onSubmit={this.onSubmit.bind(this)} noValidate>
                    <input type="email" name="email" placeholder="Email" ref="email"/>
                    <input type="password" name="password" placeholder="Password" ref="password"/>
                    <button>Logint</button>
                </form>

                <Link to="/signup">Have an account?</Link>
            </div>

        )
    }
}