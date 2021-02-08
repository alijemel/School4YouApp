import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import HeaderComponent from './HeaderComponent'
import DynamicHeaderComponent from './DynamicHeaderComponent'
import LoginComponent from './LoginComponent'
import ListTodosComponent from './ListTodoComponent'
import FooterComponent from './FooterComponent'
import LogoutComponent from './LogoutComponent.jsx'
import WellcomeComponent from './WellcomeComponent.jsx'
import ErrorComponent from './ErrorComponent'
import TodoComponent from './TodoComponent'
import SignInComponent from './SignInComponent'
import UserBuilder from '../UserBuilder/UserBuilder'
import User from '../UserBuilder/User'
import Beispiel from '../UserBuilder/Beispiel'
import Form from '../UserBuilder/Form'
import SignInFormValidations from './SignInFormVlidations'
import UserDataService from '../../api/UserDataService.js'
import SchoolClass from '../ClassBuilder/SchoolClass'
import SchoolClasses from '../ClassBuilder/SchoolClasses'
import Planer from '../Planer/Planer'
import classes from '../../Styles.module.css'
import AnnouncementForm from '../AnnouncementsBuilder/AnnouncementForm'
import Inbox from '../AnnouncementsBuilder/Inbox'
import MyClasses from '../ClassBuilder/MyClasses'
import MyClass from '../ClassBuilder/MyClass'
import CoursePlaner from '../Termine/CoursePlaner'
import ApiTester from '../Termine/ApiTester'
import CourseTeacherPlaner from '../Termine/CourseTeacherPlaner'
import TimeTableClass from '../Termine/TimeTableClass'
import Presencelist from '../Termine/PresenceList'
import Families from '../UserBuilder/Families'
import Family from '../UserBuilder/Family'
import MyFamily from '../UserBuilder/MyFamily'
import Grades from '../Termine/Grades'
import ResetPassword from './ResetPassword'
import SetNewCredentials from './SetNewCredentials'




class TodoApp extends Component {
    state={
        authenticated : false, 
        approved : true, 
        id : null,
        role :null
    }

    componentDidMount() {
        console.log('MAIN PAGE MOUNTED')
        if(sessionStorage.getItem('authenticated') ){
            UserDataService.getUserById(sessionStorage.getItem('id'))
        .then(response => {
            this.setState({
                approved : response.data.approved
            })
            sessionStorage.setItem('approved', response.data.approved)
        })
        .catch(error => {
            console.log(error.response.data.message)
        })


        }


    }

    // componentDidUpdate() {
    //     console.log('MAIN PAGE UPDATED')



    // }
    render() {


        //replace wellcomecomponent by SESSION session stores all data of the current user
        return (
            <div >

                <Router>
                    <DynamicHeaderComponent auth={this.state.authenticated} approved={this.state.approved} 
                                    id={this.state.id} role={this.state.role} />

                    <Switch >

                        <Route path="/" exact component={Form} />
                        <Route path="/login" component={Form} />
                        <Route path="/reset-password" exact component={ResetPassword} />
                        <Route path="/reset-password/enter-password/:token" exact component={SetNewCredentials} />

                        <Route path="/registrieren" component={SignInFormValidations} />
                        <Route path="/beispiel" component={Beispiel} />
                        <Route path="/form" component={Form} />
                        <Route path="/signInValidation" component={SignInFormValidations} />
                        <Route path="/planer" component={Planer} />
                        <AuthenticatedRoute path="/planen_Klasse_Lehrer/:classId/:teacherId" component={CourseTeacherPlaner}/>
                        <AuthenticatedRoute path="/planen/:classId/" component={CoursePlaner} />
                        <AuthenticatedRoute 
                        path="/timetable/lehrer/:teacherId"
                        render={(props) => (
                            <TimeTableClass {...props} isTeacher={true} />
                          )} 
                          />
                          <AuthenticatedRoute path="/timetable/Klasse/:classId/Lernender/:studentId" 
                        render={(props) => (
                            <TimeTableClass {...props} isTeacher={false}  />
                          )} />
                        <AuthenticatedRoute path="/timetable/:classId/" 
                        render={(props) => (
                            <TimeTableClass {...props} isTeacher={false}  />
                          )} />
                        
                          <AuthenticatedRoute path="/Anwesenheiten/Termin/:appointmentId" component={Presencelist}/>
                          <AuthenticatedRoute path="/Familien" exact component={Families}/>
                          <AuthenticatedRoute path="/Familien/:familyId" component={Family}/>
                          <AuthenticatedRoute path="/Meine_Familie/:userId" component={MyFamily}/>
                          <AuthenticatedRoute path="/Noten/:studentId" component={Grades}/>
                        
                        
                        

                        <Route path="/ApiTester" component={ApiTester} />


                        

                        <AuthenticatedRoute path="/wellcome/:id" component={WellcomeComponent} />
                        <AuthenticatedRoute path="/termine/:id" component={TodoComponent} />

                        <AuthenticatedRoute path="/termine" component={ListTodosComponent} />
                        <AuthenticatedRoute path="/verwalten/anzeigen/:id" component={User} />
                        <AuthenticatedRoute path="/verwalten/:role" component={UserBuilder} />
                        <AuthenticatedRoute path="/termine" component={ListTodosComponent} />

                        <AuthenticatedRoute path="/Klassen/anzeigen/:name" component={SchoolClass} />

                        <AuthenticatedRoute path="/Klassen" component={SchoolClasses} />
                        <AuthenticatedRoute path="/Meine_Klassen/:id" component={MyClasses} />
                        <AuthenticatedRoute path="/Meine_Klasse/:classId" component={MyClass} />

                        <AuthenticatedRoute path="/Klasse" component={SchoolClass} />
                        <AuthenticatedRoute path="/Ankundigungen/erstellen" component={AnnouncementForm} />
                        <AuthenticatedRoute path="/inbox/:role" component={Inbox} />

                        <AuthenticatedRoute path="/logout" component={LogoutComponent} />
                        <Route component={ErrorComponent} />

                    </Switch>

                    {/* <FooterComponent/> */}

                    



                </Router>

                {/*<LoginComponent />
               <WellcomeComponent />*/}

            </div>
        )
    }
}








// class LoginComponent extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             username: 'username',
//             password: '',
//             failed: false,
//             success: false
//         }
//     }

//     handleChange = (event) => {
//         console.log(event.target.name);
//         this.setState(
//             {
//                 [event.target.name]: event.target.value
//             }
//         )
//     }

//     loginClicked = () => {
//         if (this.state.username === 'ali' && this.state.password === 'jemel') {

//             AuthenticationService.registerSuccessfullLogin(this.state.username, this.state.password);
//             this.props.history.push(`/wellcome/${this.state.username}`)
//             //this.setState({success : true})
//             //this.setState({failed : false})
//         } else {
//             this.setState({ failed: true })
//             this.setState({ success: false })
//         }

//     }
//     render() {
//         return (
//             //TRUE && True returns the second term !!!!!!!!!!!!!!!!!!!!!!!!!!!!
//             <div>

//                 <h1>Login</h1>
//                 <div className="container">




//                     {this.state.failed && <div className="alert alert-warning">Invalid Creds</div>}
//                     {this.state.success && <div>Success Login</div>}

//                     {/*<ShowLoginSuccessMessage ShowSuccessMessage={this.state.success}/>*/}

//                     <form className="main-form">

//                         <div class="form-group">

//                             <label for="username">Name </label>
//                             <input class="form-control" type="text" name="username" value={this.state.username} onChange={this.handleChange}></input>

//                         </div>

//                         <div className="form-group">

//                             <label for="password">Password</label>
//                             <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleChange}></input>

//                         </div>

//                         <button className="btn btn-primary " onClick={this.loginClicked}>Login</button>
//                     </form>


//                 </div>



//             </div>

//         )
//     }
// }



// function ShowLoginFailMessage(props) {
//     if(props.ShowFailMessage) {
//        return  <div>EPIC FAIL</div>
//     }
//     else return null
// }


// function ShowLoginSuccessMessage(props) {
//     if(props.ShowSuccessMessage) {
//        return  <div>Login Success</div>
//     } 
//     else return null
// }


export default TodoApp