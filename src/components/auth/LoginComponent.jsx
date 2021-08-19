import React, { Component } from 'react'
import {login} from "../../services/AuthService";

export default class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    login = async (event) => {
        const loggedIn = await login(
            this.state.username,
            this.state.password
        )
       if(loggedIn) {
           //refresh page
           window.location.replace('');
       }

    }

    changeUsernameHandler= (event) => {
        this.setState({username: event.target.value});
    }

    changePasswordHandler= (event) => {
        this.setState({password: event.target.value});
    }

    render() {
        return (
            <div className = "container">
                    <div className = "card col-md-6 offset-md-3 offset-md-3">
                        <h3>Sign In</h3>

                        <div className="form-group">
                            <label>Email address</label>
                            <input type="email" className="form-control"
                                   onChange={this.changeUsernameHandler}/>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control"
                                   onChange={this.changePasswordHandler}/>
                        </div>
                        <button type="submit" className="btn btn-primary btn-block"
                                onClick={this.login}>
                            Submit
                        </button>
                        {/* <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>*/}
                    </div>
            </div>

        );
    }
}
