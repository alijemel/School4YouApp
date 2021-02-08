import React, {Component} from 'react'
import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import { withRouter } from 'react-router';
import AuthenticationService from './AuthenticationService'
import { FaHome } from "react-icons/fa";
import {FaUniversity } from "react-icons/fa";
import { FaCalendarAlt} from "react-icons/fa";



class HeaderComponent extends Component {
    render() {

        const isUserLoggedIn = AuthenticationService.isUserLoggedIn()
        const isUserApproved = AuthenticationService.isUserApproved()
        console.log(isUserApproved)

        
        
        


        return (
            

            <header>
                
                <nav className="navbar navbar-expand-md navbar-light bg-light navbg">
                    <div><a className="navbar-brand">School4You</a></div>

                    <ul className="navbar-nav">
                        {isUserLoggedIn && isUserApproved &&<li><Link className="nav-link" to="/Wellcome/ali"><FaHome/> Start</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/termine"><FaUniversity/> Veranstaltungen</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/termine"><FaCalendarAlt/> Planer</Link></li>}
                    </ul>

                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/registrieren">Registrieren</Link></li>}

                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Logout</Link></li>}

                    </ul>
                </nav>


            </header>

            
        )
    }
}

export default withRouter(HeaderComponent) ;