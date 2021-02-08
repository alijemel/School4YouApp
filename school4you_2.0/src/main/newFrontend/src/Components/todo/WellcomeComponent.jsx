import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import HelloWorldService from '../../api/HelloWorldService.js'
import UserDataService from '../../api/UserDataService.js'
import styles from '../../Styles.module.css'
import HeaderComponent from './HeaderComponent'
import Button from '../../Button/Button'
import SicknoteForm from '../UserBuilder/SicknoteForm.js'
import { ExitStatus } from 'typescript'
import SickNotesAdministration from '../UserBuilder/SickNotesAdministration.js'


class WellcomeComponent extends Component {


    state = {
        user: null,
        approved: null,
        role: null,
        showSickForm : false
    }


    componentDidMount() {
        UserDataService.getUserById(this.props.match.params.id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    user: response.data,
                    approved: response.data.approved,
                    role: response.data.role
                })
            })
            .catch(error => {
                console.log(error.response.data.message)
            })

    }

    toggleForm=()=>{
        this.setState({showSickForm : true})
    }




    render() {
        let errorMessage = null
        if (this.state.user) {
            if ((!this.state.approved) && (sessionStorage.getItem('role') !== 'admin'))
                errorMessage =
                    <div class="alert alert-secondary" role="alert">
                        <strong>Sie sind noch nicht von einem Administrator bestaetigt, haben Sie bitte etwas Geduld.</strong>
                    </div>
        }

        let wellcomeMessage =
            <h1 className={styles.Wellcome}>Wellcome Home {sessionStorage.getItem('firstName')} {sessionStorage.getItem('lastName')}.</h1>


        
        return (
            <>
                <div class="jumbotron">

                    {wellcomeMessage}
                    {errorMessage}



                    {/* <p class="font-weight-bolder">Verwalte dein Profil</p> */}
                    {<Link to={`/verwalten/anzeigen/${this.state.user && this.state.user.id}`}

                    // to={{pathname: '/verwalten/anzeigen/' + this.state.user && this.state.user.id
                    // }
                    // }
                    >
                        <button disabled={!this.state.user} type="button" class="btn m-3 btn-outline-info btn-lg btn-block">Verwalte dein Profil</button>

                        {/* <Button btnType="Success" >Hier</Button> */}
                    </Link>}

                    {sessionStorage.getItem('role').toUpperCase() === 'STUDENT'
                        &&
                        <Link
                            to={`/Noten/${this.state.user && this.state.user.id}`}
                        >
                            <button disabled={this.state.user === null || !this.state.user.approved} type="button" class="btn btn-outline-dark btn-lg btn-block">Meine Noten Ansehen</button>
                        </Link>

                    }

                    {/* {
                        sessionStorage.getItem('role').toUpperCase() === 'SECRETARY'
                        &&
                        <Link
                            to={`/verwalten/Lernende`}
                        >
                            <button disabled={this.state.user === null || !this.state.user.approved} type="button" class="btn btn-outline-danger m-3 btn-lg btn-block">Krankgemeldete Lehrende verwalten</button>
                        </Link>

                    } */}

                    {/* {
                        sessionStorage.getItem('role').toUpperCase() === 'SECRETARY'
                        &&
                        <Link
                            to={`/verwalten/Lernende`}
                        >
                            <button disabled={this.state.user === null || !this.state.user.approved} type="button" class="btn btn-outline-danger m-3 btn-lg btn-block">Krankgemeldete Lernende verwalten</button>
                        </Link>

                    } */}
                    {
                        sessionStorage.getItem('role').toUpperCase() === 'TEACHER'
                        &&
                        <div>
                            <button 
                        disabled={ this.state.user === null || !this.state.user.approved} 
                        onClick={this.toggleForm}
                        type="button" class="btn btn-outline-danger m-3 btn-lg btn-block">
                            Krank melden
                            </button>
                           {this.state.showSickForm && 
                           <SicknoteForm dismissForm={()=>this.setState({showSickForm : false})} />}
                            </div>
                    
                    }

                    {
                        sessionStorage.getItem('role').toUpperCase() === 'SECRETARY'
                        && 
                        <SickNotesAdministration/>

                    }

                    



                
                </div>

            </>

        )
    }

}

export default WellcomeComponent 