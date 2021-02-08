import React, { Component } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';

import UserDataService from '../../api/UserDataService.js'
import Button from '../../Button/Button'


class ProfileForm extends Component { 

   onSubmit =(values) => {

    console.log('speichern')
        
        let targetId = this.props.user.id
        let updatedUser = {
            id: this.props.user.id,
            firstName : values.firstName,
            lastName : values.lastName,
            email : values.email,
            role : this.props.user.role,
            birthDate: values.birthDate
        }
        UserDataService.updateUser(targetId, updatedUser)
        .then(() => { 
            this.props.updateUser(updatedUser)
            console.log(updatedUser)
            //this.props.history.push(`/login`)
        })
        .catch(err => {
            //Handle your error here
            console.log(err.response);
        })

    }

    


    render () {
        
        let firstName = this.props.user.firstName; let lastName = this.props.user.lastName; let email = this.props.user.email; let birthDate = this.props.user.birthDate;
        let oldData = {
            firstName : firstName,
            lastName : lastName, email : email, birthDate : birthDate
        }
        console.log(oldData)
        let usedEmails = this.props.usedEmails;
        usedEmails.splice(usedEmails.indexOf(this.props.user.email),1)
        let minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 10);






    

    

        return ( 
            <div>
                
               
                <Formik
                    initialValues={{ 
                        firstName : firstName,
                        lastName : lastName,
                    
                        email : email,
                        // password : '',
                        // repeatPassword : '',
                        
                        birthDate : birthDate
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

                    validationSchema ={Yup.object().shape({
                        firstName: Yup.string()
                        .required("Bitte Vorname eintragen")
                        .max(20,"Zu lang")
                            .matches(/^[a-zA-Z]*$/,"Ziffer und leerzeichen nicht zulässig "),

                            
                            

                            lastName: Yup.string().required("Bitte Nachname eintragen")
                            ,

                            email : Yup.string().required("Bitte Email Adresse eintragen")
                            .lowercase()
                            .email("Bitte gultige Email Adresse Eintragen ***@***.***")
                            .notOneOf(usedEmails, 'Email Adresse schon vergeben')
                            ,
    
                            // password : Yup.string("bitte gultiges password eingeben")
                            
                            // .min(8, "Password zu kurz, mindestens 8 Zeichen!")
                            // .matches(/(?=.*[0-9])/,"Passwort muss mindest eine Ziffer enthalten ")
                            // ,

                            // repeatPassword : Yup.string()
                            // .oneOf([Yup.ref('password')],'Passwort stimmt nicht'),
                            // // .test('repeatedPasswordTest', 'Password nicht korrekt wiederholt',
                            // // value => {
                                
                            // //     return false
                            // // })

                            // //OR TO TEST REPEAT PASSWORD :   .oneOf([Yup.ref('password')])
                            // ,
                            birthDate : Yup.date().required("Bitte Geburtsdatum eingeben")
                            .max(minDate, 'Benuter muss mindestens 10 Jahre Alt sein')
                            


    
    
    
    
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
                                    <label>Vorname</label>
                                    <Field  className="form-control" type="text" name="firstName" value ={values.firstName} placeholder="Vorname" />
                                    <ErrorMessage name="firstName" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Name</label>
                                    <Field className="form-control" type="text" name="lastName" placeholder="Nachname" />
                                    <ErrorMessage name="lastName" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Email Adresse</label>
                                    <Field 
                                    className="form-control" type="text" name="email" placeholder="example@example.com" />
                                    <ErrorMessage name="email" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Geburtsdatum</label>
                                    <Field className="form-control" type="date" name="birthDate" />
                                    <ErrorMessage name="birthDate" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset>
                                {/* <fieldset className="form-group">
                                    <label>Neues Passwort</label>
                                    <Field className="form-control" type="password" name="password" placeholder="*********" />
                                    <ErrorMessage name="password" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset>
                                <fieldset className="form-group">
                                    <label>Neues Passwort Wiederholen</label>
                                    <Field className="form-control" type="password" name="repeatPassword" />
                                    <ErrorMessage name="repeatPassword" component="small" className="form-text text-danger"></ErrorMessage>
                                </fieldset> */}

                            
                                <button action="submit" type="submit" class="btn btn-outline-success btn-lg btn-block">Speichern</button>


                                </Form>)

                            }
                            
                        }
                    </Formik>
                
                
  



            </div>
        )
    }

}

export default ProfileForm