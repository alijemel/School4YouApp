import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import AuthenticationService from './AuthenticationService'
import { FaHome } from "react-icons/fa";
import { FaUniversity } from "react-icons/fa";
import { FaCalendarAlt } from "react-icons/fa";
import UserDataService from '../../api/UserDataService';



class DynamicHeaderComponent extends Component {
    state = {
        isUserLoggedIn: false,
        approved: true,
        apiResponded : false

    }

    componentDidMount() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        this.setState({ isUserLoggedIn: isUserLoggedIn })
        if (isUserLoggedIn) {
            let id = sessionStorage.getItem('id')
            UserDataService.getUserById(id)
                .then(response => {
                    this.setState({ approved: response.data.approved, apiResponded : true })

                })
                .catch(error => {
                    console.log(error)
                })


        }

    }

    componentDidUpdate() {

    }

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        //let disabledItem = !this.state.apiResponded
        let navClass ="nav-link"
        if(!this.state.apiResponded) {
            navClass ="nav-link disabled"
        }
        











        let navItems = null

        if (isUserLoggedIn) {
            // eslint-disable-next-line default-case
            switch (sessionStorage.getItem('role')) {
                case 'admin': navItems =
                    <ul className="navbar-nav nav-tabs">
                        {isUserLoggedIn && <li><Link className="nav-link" to={"/Wellcome/" + sessionStorage.getItem('id')}><FaHome /> Start</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/verwalten/Lehrer"><FaUniversity /> Lehrer</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/verwalten/Sekretariat"><FaUniversity /> Sekretariat</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/verwalten/alle"><FaUniversity /> Nutzer Verwalten</Link></li>}
                        <li className="nav-link" > <span class="badge badge-pill badge-warning">Administrator</span></li>

                    </ul>
                    break;

                case 'secretary':
                    navItems =
                        <ul className="navbar-nav nav-tabs">
                            {this.state.approved && <li><Link className="nav-link" to={"/Wellcome/" + sessionStorage.getItem('id')}><FaHome /> Start</Link></li>}
                            {this.state.approved && <li><Link className="nav-link" to="/verwalten/Lernende"><FaUniversity /> Lernende</Link></li>}
                            {this.state.approved && <li><Link className="nav-link" to="/verwalten/Eltern"><FaCalendarAlt /> Eltern</Link></li>}
                            {this.state.approved && <li><Link className="nav-link" to="/Familien"><FaCalendarAlt /> Familien</Link></li>}
                            {this.state.approved && <li><Link className="nav-link" to="/Klassen"><FaCalendarAlt /> Klassen</Link></li>}
                            {
                            this.state.approved && <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" data-toggle="dropdown"
                                href="#" role="button" aria-haspopup="true" aria-expanded="false">
                                Inboxes</a>
                            <div class="dropdown-menu">
                            <Link className="dropdown-item" to="/inbox/SECRETARY"><FaUniversity /> Secretariat</Link>
                            <Link 
                            to={{ pathname: '/inbox/TEACHER',
                             state : {
                                imposeRefresh : true
                              }}}
                            className="dropdown-item" 
                            // to="/inbox/TEACHER"
                            ><FaUniversity /> Lehrende</Link>
                            <Link className="dropdown-item" to="/inbox/STUDENT"><FaUniversity /> Lernende</Link>
                            <Link className="dropdown-item" to="/inbox/PARENT"><FaUniversity /> Eltern</Link>
                            </div>
                        </li>
                        }
                                                    <li className="nav-link" > <span class="badge badge-pill badge-info">Sekretariat</span></li>


                        </ul>
                    break;
                case 'parent':
                    navItems =
                        <ul className="navbar-nav nav-tabs">
                            {this.state.approved && <li><Link className="nav-link" to={"/Wellcome/" + sessionStorage.getItem('id')}><FaHome /> Start</Link></li>}
                            {this.state.approved && <li><Link className="nav-link" to={"/Meine_Familie/"+sessionStorage.getItem('id')}><FaUniversity /> Meine Familie</Link></li>}
                            
                        {this.state.approved && <li><Link className="nav-link" to={"/inbox/" + sessionStorage.getItem('role').toUpperCase()}><FaUniversity /> Inbox</Link></li>}
                        <li className="nav-link" > <span class="badge badge-pill badge-info">Eltern</span></li>

                        
                    
                        </ul>
                    break;
                case 'teacher':
                    navItems =
                        <ul  className="navbar-nav nav-tabs ">
                            {this.state.approved && <li><Link className="nav-link" to={"/Wellcome/" + sessionStorage.getItem('id')}><FaHome /> Start</Link></li>}
                            {this.state.approved && <li><Link className="nav-link" to={"/Meine_Klassen/" + sessionStorage.getItem('id')}><FaUniversity /> Meine Klassen</Link></li>}
                            {this.state.approved && <li><Link className="nav-link" to={"/inbox/" + sessionStorage.getItem('role').toUpperCase()}><FaUniversity /> Inbox</Link></li>}
                            {this.state.approved && <li><Link className="nav-link" to={"/timetable/lehrer/" + sessionStorage.getItem('id')}><FaUniversity /> Mein Plan</Link></li>}
                            <li className="nav-link" > <span class="badge badge-pill badge-info">Lehrer</span></li>


                        </ul>
                    break;
                case 'student':
                    navItems =
                        <ul className="navbar-nav nav-tabs">
                            {this.state.approved && <li><Link className="nav-link" to={"/Wellcome/" + sessionStorage.getItem('id')}><FaHome /> Start</Link></li>}
                            {this.state.approved && <li><Link className="nav-link" to={"/Meine_Klassen/" + sessionStorage.getItem('id')}><FaUniversity /> Meine Klasse</Link></li>}
                            {this.state.approved && <li><Link className="nav-link" to={"/inbox/" + sessionStorage.getItem('role').toUpperCase()}><FaUniversity /> Inbox</Link></li>}
                            <li className="nav-link" > <span class="badge badge-pill badge-info ">Schüler</span></li>


                            

                        </ul>
                    break;
            }

        }


        return (


            <header>

                <nav  className="navbar navbar-expand-md navbar-light bg-light navbg ">
                    <div><a className="navbar-brand">School4You</a></div>
                    {navItems}

                    <ul className="navbar-nav navbar-collapse justify-content-end nav-tabs">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/registrieren">Registrieren</Link></li>}

                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}

                    </ul>
                </nav>


            </header>


        )
    }
}

export default withRouter(DynamicHeaderComponent);