import React, { Component } from 'react'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import UserDataService from '../../api/UserDataService.js'



class SignInComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            role : 'admin',
            bithDate: moment(new Date()).format('YYYY-MM-DD')
        }
    }

    componentDidMount() {

    }

    onSubmit=(values)=> {
         
        let role = values.role
        let user = {
            firstName : values.firstName,
            lastName : values.lastName,
            email : values.email,
            password : values.password,
            role : values.role,
            birthDate: values.birthDate
        }
        console.log(user);

        UserDataService.createUser(user, role)
        .then(() => { 
            //this.props.history.push(`/login`)
        })
        .catch(err => {
            //Handle your error here
            console.log(err.response);
        })
        
    }

    validate= (values) => {
        let errors = {}
        if(!values.firstName) {
            errors.firstName = 'Bitte Vorname eingeben'
        }
        if(!values.lastName) {
            errors.lastName = 'Bitte Nachname eingeben'
        }
        if(!values.email) {
            errors.email = 'Bitte Email Adresse eingeben'
        }
        if(!values.password) {
            errors.password = 'Bitte Passwort eingeben'
        }
        if(!values.repeatPassword) {
            errors.repeatPassword = 'Bitte Passwort wiederholen'
        }
        if(!moment(values.birthDate).isValid()) {
            errors.birthDate= 'Ungultiges Datum'
        }

        
        return errors

    }
    

    render() {

        let { firstName, lastName, email, password,role, bithDate } = this.state


        return (
            <div >
                <h1>Registrieren</h1>

                <div className="container">
                    <Formik
                    initialValues={{ 
                        firstName : firstName,
                        lastName : lastName,
                    
                        email : email,
                        password : password,
                        role : role,
                        bithDate : bithDate
                    }}
                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={true}
                    validateOnBlur={true}
                    enableReinitialize={true}

                    >
                        {
                            (props) =>  (

                               <Form>

                                <fieldset className="form-group">
                                    <label>Vorname</label>
                                    <Field className="form-control" type="text" name="firstName" placeholder="Vorname" />
                                    <ErrorMessage name="firstName" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field className="form-control" type="text" name="lastName" placeholder="Nachname" />
                                    <ErrorMessage name="lastName" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Email Adresse</label>
                                    <Field className="form-control" type="text" name="email" placeholder="example@example.com" />
                                    <ErrorMessage name="email" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Passwort</label>
                                    <Field className="form-control" type="password" name="password" placeholder="*********" />
                                    <ErrorMessage name="password" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Passwort Wiederholen</label>
                                    <Field className="form-control" type="password" name="repeatPassword" />
                                    <ErrorMessage name="repeatPassword" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Geburtsdatum</label>
                                    <Field className="form-control" type="date" name="birthDate" />
                                    <ErrorMessage name="birthDate" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Rolle</label>
                                    <Field className="form-control" as="select" name="role">
                                    <option key="admin" value="admin">admin</option>
                                    <option key ="secretary" value="secretary">sekretariat</option>
                                    <option key="teacher" value="teacher">lehrer</option>
                                    <option key = "student" value="student">Lernender</option>
                                    </Field>
                                    <ErrorMessage name="role" component="div" className="alert alert-warning"></ErrorMessage>
                                </fieldset>
                                <button type="submit" className="btn btn-success">save</button>
                            </Form>)
                            
                        }
                    </Formik>

                </div>
            </div>
        )


    }
}

export default SignInComponent