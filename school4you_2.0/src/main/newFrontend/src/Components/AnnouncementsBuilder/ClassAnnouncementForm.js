import React, { Component } from 'react'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';

import UserDataService from '../../api/UserDataService.js'
import axios from 'axios';
import Button from '../../Button/Button'
import classes from '../UserBuilder/User.module.css'
import CommunicationDataService from '../../api/CommunicationDataService.js'

class ClassAnnouncementForm extends Component {

    onSubmit=(values)=> {
        let announcement = {
            classId : this.props.classId,
            creatorFirstName : sessionStorage.getItem('firstName'),
            creatorLastName : sessionStorage.getItem('lastName'),
            subject : values.subject,
            content : values.content
        }
        console.log(announcement)
        if(this.props.action === 'Erstellen') {
            
            CommunicationDataService.createClassAnnouncement(announcement)
        .then(response => {
            console.log(response.data)
            this.props.submitCreate(values.subject, values.content, response.data.id)
        })
        .catch(error => {
            console.log(error)
        })
        } else if(this.props.action === 'Ändern') {
            this.props.submitEdit(this.props.editingId,values.subject, values.content)
            console.log(this.props.editingId)
            CommunicationDataService.editClassAnnouncement(this.props.editingId, announcement)
            .then(response => {
                console.log(response.data)
            }).catch(error => {
                console.log(error)
            })



        }
        
        this.props.reeinitializeParent()
    }

    hasNotChanged =(values) => {
        if(this.props.action === 'Ändern') {
            return ((values.subject === this.props.initialSubject) 
        && (values.content === this.props.initialContent))
        } else {
            return false
        }
    }

    render() {
        return (
            <div className={classes.User} >

                <Formik

                    initialValues={{
                        subject: this.props.initialSubject,
                        content: this.props.initialContent,
                        visibility: this.props.initialVisibility
                    }}

                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={true}
                    validateOnBlur={true}
                    enableReinitialize={true}

                    validationSchema={Yup.object().shape({
                        subject: Yup.string()
                            .required("Bitte Betreff eingeben!")
                            .max(20, "Zu lang"),

                            content : Yup.string().required("Bitte Inhalt der Ankundigung eingeben!")
                            .max(1000, "Zu lang max 1000 Chars"),
                            visibility : Yup.array().min(1,"Bitte sichbarkeit auswahlen!")
                            
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
                                <Form>
                                    <h4 class="card-title">{this.props.action}</h4>
                                    <fieldset className="form-group">
                                        <label>Betreff</label>
                                        <Field className="form-control" type="text" name="subject" value={values.subject} placeholder="Betreff" />
                                        <ErrorMessage name="subject" component="small" className="form-text text-danger"></ErrorMessage>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Inhalt</label>
                                        <Field as="textarea" rows="4" className="form-control" type="text" name="content" value={values.content} placeholder="Inhalt" />
                                        <ErrorMessage name="content" component="small" className="form-text text-danger"></ErrorMessage>
                                    </fieldset>
                                   
                                    <button disabled={this.hasNotChanged(values)} type="submit" className="btn btn-success">{this.props.action}</button>
                                    <button type="button" onClick={this.props.reeinitializeParent} className="btn btn-danger">Cancel</button>
                                </Form>
                            )
                        }
                    }

                </Formik>



            </div>
        )
    }
}

export default ClassAnnouncementForm