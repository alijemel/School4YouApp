
import React, { Component } from 'react'
import axios from 'axios'

import AuthenticationService from './AuthenticationService'
import { URL_APP } from '../../api/Constants'


class LoginComponent extends Component {


    state = {
        firstName: '',
        lastName: '',
        role: '',
        response: '',
        error: null,
        input: '',
        email: '',
        password: ''

    }

    componentDidMount() {

    }

    processInput = (e) => {
        this.setState({ input: e.target.value })
    }


    handleSubmit = (event) => {
        event.preventDefault();
        let data = {
            email: this.state.email,
            password: this.state.password
        }


        axios.post(`${URL_APP}/test`, data)
            .then(response => {
                console.log(response.data)
                AuthenticationService.registerSuccessfullLogin(response.data.id,
                    response.data.firstName,
                    response.data.lastName, response.data.role, response.data.approved);
                this.props.history.push(`/wellcome/${response.data.id}`)
            })
            .catch(error => {
                console.log(error.response.data.message)
                this.setState({ error: error.response.data.message })
            })

    }

    handleChange = (event) => {

        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    render() {
        let displayError = null

        if (this.state.error) {
            displayError =
                <div class="alert alert-danger" role="alert">
                    {this.state.error}
                </div>
        }




        return (

            

            

                <div className="container-fluid bg">
                    
                    <div className="container"><h1></h1></div>
                    <div className="row">
                        <div className="col-md-4 col-sm-4 col-xs-12"></div>
                        <div className="col-md-4 col-sm-4 col-xs-12">

                            <form className="form-container" onSubmit={this.handleSubmit}>
                                {displayError}


                                <div class="form-group">
                                    <label for="exampleInputEmail1">Email Addresse</label>
                                    <input class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Email" name="email" value={this.state.email} onChange={this.handleChange}></input>
                                    <small id="emailHelp" class="form-text text-muted"></small>

                                </div>

                                <div class="form-group">
                                    <label for="exampleInputPassword1">Passwort</label>
                                    <input type="password" class="form-control" id="exampleInputPassword1" placeholder="********" name="password" value={this.state.password} onChange={this.handleChange}></input>
                                    <small id="emailHelp" class="form-text text-muted">Passwort vergessen?</small>

                                </div>

                                <button type="submit" class="btn btn-success btn-block bouton" onClick={this.loginClicked}>Submit</button>
                            </form>

                        </div>
                        <div className="col-md-4 col-sm-4 col-xs-12"></div>
                    </div>
                </div >
            

        )
    }

}

export default LoginComponent