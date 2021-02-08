import React, { Component } from 'react';
import UserDataService from '../../api/UserDataService';
import Button from '../../Button/Button'
import ProfileForm from './profileForm';
import axios from 'axios'


import classes from './User.module.css';
import { URL_APP } from '../../api/Constants';
import { replace } from 'formik';

class User extends Component {
    state = {
        user: null,
        approved : false,
        role: null,
        showForm: false,
        usedEmails : [],
        successMessage : null

    }

    componentDidMount() {
        const id = this.props.match.params.id
        console.log(id)
        UserDataService.getUserById(id)
            .then(response => {
                this.setState({
                    user: response.data,
                    role: response.data.role,
                    approved : response.data.approved

                })
                console.log(response.data)
            })
            let usedEmails = []
        axios.get(`${URL_APP}/users/existingEmails`)
        .then(response => {
            console.log(response.data)
            usedEmails = response.data
            this.setState({usedEmails : usedEmails})
        })
        .catch(err => {
            console.log(err)
        })
    }

    approve = () => {
        const id = this.props.match.params.id
        this.setState({approved : true})
        
        UserDataService.approve(id)
            .then(response => {
                console.log('user with id' + id + 'is approved')
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

    }

    disApprove = () => {
        const id = this.props.match.params.id
        this.setState({approved : false})
        UserDataService.disApprove(id)
            .then(response => {
                console.log('user with id' + id + 'is disapproved')
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

    }

    showForm = () => {
        if (!this.state.showForm) {
            this.setState({ showForm: true })
        } else {
            this.setState({ showForm: false })
        }

    }

    updateUser=(updatedUser)=> {
        this.setState({user : updatedUser,
            successMessage : <div class="alert alert-success" role="alert">
            <strong>Ihre Daten wurden erfolgreich </strong> 
        </div>
        
        })
        this.showForm();
        sessionStorage.setItem('firstName' , updatedUser.firstName)
        sessionStorage.setItem('lastName' , updatedUser.lastName)
        


    }
    render() {
        let userData = null;
        
            userData = (
                <div class="text-monospace">
                    <ul class="list-group">
                        <li class="list-group-item font-weight-bold">Vorname : {this.state.user != null && this.state.user.firstName}</li>
                        <li class="list-group-item font-weight-bold">Nachname : {this.state.user != null && this.state.user.lastName}</li>
                        <li class="list-group-item font-weight-bold">Email Adresse : {this.state.user != null && this.state.user.email}</li>
                        <li class="list-group-item font-weight-bold">Geburtsdatum {this.state.user != null && this.state.user.birthDate}</li>
                        <li class="list-group-item font-weight-bold">
                        {this.state.user != null && this.state.approved && <span class="badge badge-success">Zugelassen</span>
} 
{this.state.user != null && !this.state.approved && <span class="badge badge-warning">Nicht zugelassen</span>
}
                            </li>
                    </ul>

                </div>

            )

        

        let controls = null
        if (sessionStorage.getItem('role') === 'admin') {
            controls =
                <div>
                    <button onClick={this.delteonClick} type="button" class="btn btn-outline-danger btn-lg btn-block">Delete</button>
                    <button onClick={this.disApprove} type="button" class="btn btn-outline-danger btn-lg btn-block">Unapprove</button>

                    <button onClick={this.approve} type="button" class="btn btn-outline-success btn-lg btn-block">Approve</button>
                    <button  onClick={this.showForm} type="button" class="btn btn-outline-info btn-lg btn-block">Daten bearbeiten</button>



                    {/* <div class="btn-group" role="group" aria-label="Basic example">
                    
                        <Button onClick={this.delteonClick} btnType="Danger"> Delete</Button>
                        <Button onClick={this.disApprove} btnType="Danger"> Disapprove</Button>
                        
                    </div> */}
                    {/* <div class="btn-group" role="group" aria-label="Basic example">
                        <Button onClick={this.approve} btnType="Success"> approve </Button>
                        <Button onClick={this.showForm} btnType="Success"> Bearbeiten </Button>
                    </div> */}
                </div>

        } else {
            controls = this.state.user && 
            <button  onClick={this.showForm} type="button" class="btn btn-outline-info btn-lg btn-block">Daten bearbeiten</button>

        }

        let form = 
        <div >
            <ProfileForm updateUser={this.updateUser
            } usedEmails={this.state.usedEmails} user={this.state.user}></ProfileForm>
        </div>





        return (
            <>

                <div className="card">

                    <h2>{this.state.role}</h2>

                    {this.state.successMessage}

                    {userData}

                    {controls}

                    {this.state.showForm && form}









                </div>


            </>


        )

    }
}


export default User;