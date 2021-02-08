import React, { Component } from 'react'
import PasswordDataService from '../../api/PasswordDataService'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';

class SetNewCredentials extends Component {

    state = {
        serverResponded: false,
        validToken: '',
        initialServerResponse: '',
        showForm : true,
        successMessage : ''
        

    }

    componentDidMount() {
        PasswordDataService.verifyToken(this.props.match.params.token)
            .then(response => {
                console.log(response.data)
                this.setState({ serverResponded: true, validToken: response.data.object, initialServerResponse
        : response.data.message })
            }).catch(error => {
                console.log(error)
            })

    }

    onSubmit = (values) => {
        let password = values.password
        let passwordObject = {
            password : password
        }
        PasswordDataService.setNewPassword(passwordObject, this.props.match.params.token)
        .then(response => {
            console.log(response.data)
            if(response.data.object) {
                this.setState({successMessage : response.data.message, showForm : false})
            }
        }).catch(error => {console.log(error)})

    }



    validate = (values) => {
        let errors = {}

        if (values.password !== values.repeatPassword) {
            errors.repeatPassword = 'Passworte stimmen nicht überein'
        }
        return errors;
    }

    render() {
        return (
            <div class="jumbotron jumbotron-fluid">
                <h1 class="display-3">Passwort Zurücksetzen</h1>
                {
                    this.state.serverResponded && !this.state.validToken &&
                    <div class="alert alert-danger" role="alert">
                        <strong>{this.state.initialServerResponse
            }</strong>
                    </div>
                }
                { !this.state.showForm && this.state.validToken && 
                    <div class="alert alert-info" role="alert">
                    <strong>{this.state.successMessage}</strong>
                </div>

                }
                {
                    this.state.serverResponded && this.state.validToken && this.state.showForm &&
                    <div class="container">

                        <Formik
                            initialValues={{
                                password: '',
                                repeatPassword: ''
                            }}
                            initialTouched={{
                                field: true,
                            }}
                            validateOnMount
                            onSubmit={this.onSubmit}
                            validate={this.validate}
                            validateOnChange={true}
                            validateOnBlur={true}
                            enableReinitialize={true}

                            validationSchema={Yup.object().shape({

                                password: Yup.string()
                                    .required("Bitte Password eintragen")
                                    .min(8, "Password zu kurz, mindestens 8 Zeichen!")
                                    .matches(/(?=.*[0-9])/, "Passwort muss mindest eine Ziffer enthalten "),

                                repeatPassword: Yup.string().required("Bitte Passwort wiederholen")



                            })}

                        >
                            {
                                props => {
                                    const {
                                        values,
                                        touched,
                                        errors,
                                        isSubmitting,
                                        handleChange,
                                        handleBlur,
                                        handleSubmit
                                    } = props;

                                    return (
                                        <Form >
                                            <fieldset className="form-group">
                                                <label>Neues Passwort</label>
                                                <Field className="form-control" type="password" name="password" placeholder="*********" />
                                                <ErrorMessage name="password" component="small" className="form-text text-danger"></ErrorMessage>
                                            </fieldset>
                                            <fieldset className="form-group">
                                                <label>Passwort Wiederholen</label>
                                                <Field className="form-control" type="password" name="repeatPassword" placeholder="*********" />
                                                <ErrorMessage name="repeatPassword" component="small" className="form-text text-danger"></ErrorMessage>
                                            </fieldset>
                                            <button disabled={errors.password || errors.repeatPassword} type="submit" class="mt-3 btn btn-primary btn-sm btn-block">Bestätigen</button>


                                        </Form>)

                                }

                            }
                        </Formik>

















                    </div>}
            </div>

        )
    }
}

export default SetNewCredentials