import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';


import classes from './User.module.css';
import css from './Courses.module.css'
import Button from '../../Button/Button'
import UserDataService from '../../api/UserDataService';

class UserBuilder extends Component {
    
    state = {
        users: [


        ],
        targetRole: null
    }

    componentDidMount() {
        let targetRole = this.props.match.params.role
        this.setState({ targetRole: targetRole })
        this.populateUsers(targetRole)

        console.log(targetRole)
        console.log(this.state.targetRole)

    }

    populateUsers(targetRole) {
        if (targetRole === 'alle') {
            UserDataService.getAllUsers()
                .then(response => {
                    this.setState({ users: response.data })
                    console.log(this.state.users)
                }).catch(err => {
                    console.log(err.response.data.message)
                })
        } else if (targetRole === 'Sekretariat') {
            UserDataService.getUsersByRole('secretary')
                .then(response => {
                    this.setState({ users: response.data })
                    console.log(this.state.users)
                }).catch(err => {
                    console.log(err.response.data.message)
                })

        } else if (targetRole === 'Lehrer') {
            UserDataService.getUsersByRole('teacher')
                .then(response => {
                    this.setState({ users: response.data })
                    console.log(this.state.users)
                }).catch(err => {
                    console.log(err.response.data.message)
                })

        } else if (targetRole === 'Lernende') {
            UserDataService.getUsersByRole('student')
                .then(response => {
                    this.setState({ users: response.data })
                    console.log(this.state.users)
                }).catch(err => {
                    console.log(err.response.data.message)
                })

        } else if (targetRole === 'Eltern') {
            UserDataService.getUsersByRole('parent')
                .then(response => {
                    this.setState({ users: response.data })
                    console.log(this.state.users)
                }).catch(err => {
                    console.log(err.response.data.message)
                })

        }
    }




    componentDidUpdate() {
        if (this.state.targetRole && (this.state.targetRole !== this.props.match.params.role)) {
            this.setState({ targetRole: this.props.match.params.role })
            this.populateUsers(this.props.match.params.role)
            console.log(this.props.match.params.role)
        }
    }

    delteclicked() {
        console.log('delete clicked')
    }

    showClicked () {
        console.log('show clocked')
    }

    render() {
        



        let users = null
        if(Array.isArray(this.state.users) && this.state.users.length <= 0) {
            users = <h3>loading...</h3>
        } else {
            users = (
            <div>
                {
                    this.state.users.map((user, index) => {
                        return (
                            
                            <div className="card">
                            
                            <div  key={index} className={classes.User}>
                               
                                
                                <p >{user.firstName} {user.lastName}</p>
                                <p >ID : {user.id}</p>
                                <p >Rolle : {user.role}</p>
                                    
                                {/* <Button clicked={this.delteclicked} btnType="Danger"> Delete</Button> 
                                <Button clicked={this.props.cancel} btnType="Success"> approve </Button> */}
                                <Link to={{
                                    pathname : '/verwalten/anzeigen/' + user.id
                                }
                                }>
                                    <button clicked={this.showClicked} type="button" class="btn btn-outline-info btn-lg btn-block">Anzeigen</button>

                                {/* <Button clicked={this.showClicked} btnType="Success"> Anzeigen </Button> */}
                                </Link>
                                
                                
                            </div>
                            
                            
                            </div>
                        
                        )
                    })
                }
            </div>
        )}

        



        return (
            
            <div>
                {users}
            </div>
        )
    }

}

export default withRouter( UserBuilder)