import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import React, { Component } from 'react'
import { min } from 'moment';
import ExamDataService from '../../api/ExamDataService';
import { date } from 'yup/lib/locale';
import SickNoteDataService from '../../api/SickNoteDataService';
import { FaErlang } from 'react-icons/fa';

class SicknoteForm extends Component {

    state = {
        serverFeedback: 'Krankmeldung erstellen',
        submitted: false,
        initialCause: '',
        refreshed: false

    }

    componentDidUpdate() {
        if (this.state.submitted) {
            this.setState({ submitted: false })
        }
    }



    onSubmit = (values) => {
        let role = 'STUDENT'
        let userId=''
        let firstName =''; let lastName = ''
        if (sessionStorage.getItem('role').toLocaleUpperCase() === 'TEACHER') {
            role = 'TEACHER'
            userId = sessionStorage.getItem('id')
            firstName = sessionStorage.getItem('firstName')
            lastName = sessionStorage.getItem('lastName')

        } else {
            userId = this.props.selectedStudent.id
            firstName = this.props.selectedStudent.firstName
            lastName = this.props.selectedStudent.lastName

        }

        

        let data = {
            userId : userId, firstName : firstName, lastName : lastName,
            startDate: values.startDate, endDate: values.endDate, cause: values.cause,
            //  comment: values.comment,
            role: role
        }

        SickNoteDataService.createSickNote(data)
            .then(response => {
                console.log(response.data)
                this.setState({ serverFeedback: response.data.message })
            }).catch(error => {
                console.log(error.reponse.message)
            })

        this.setState({ submitted: true })

    }

    validate = (values) => {
        let errors = {}

        let startDate = values.startDate
        let endDate = values.endDate

        let limitEndDate = new Date(startDate);
         limitEndDate.setDate(limitEndDate.getDate() + 7)


        if (startDate > endDate) {
            errors.endDate = 'Ungültiges Enddatum.'
        } if (new Date(endDate)  > limitEndDate) {
            errors.endDate = 'eine Krankmeldung gilt jeweils maximal eine Woche.'
        }

        return errors
    }

    render() {

        let minDate = new Date()

        if (this.state.submitted) {
            return (
                <p>{this.state.serverFeedback} lol</p>
            )
        } else {

            return (
                <div>
                    <Formik



                        initialValues={{
                            startDate: '',
                            endDate: '',
                            cause: '',
                            // comment: ''



                        }}

                        onSubmit={this.onSubmit}
                        validate={this.validate}
                        validateOnChange={true}
                        validateOnBlur={true}
                        enableReinitialize={true}

                        validationSchema={Yup.object().shape({

                            startDate: Yup.date().required("Bitte startDatedatum eingeben.").min(minDate, "Krankmeldungen gelten midesten ein Tag im Voraus ."),
                            endDate: Yup.date().required("Bitte Enddatum eingeben.").min(minDate, "Krankmeldungen gelten midesten ein Tag im Voraus."),

                            cause: Yup.string().required("Bitte Grund eingeben.").max(20, "Zu lang"),

                            // comment: Yup.string().max(20, "Zu lang")

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
                                        <h4 class="card-title"></h4>
                                        <div class="alert alert-warning" role="alert">
                                            <strong>{this.state.serverFeedback} </strong> 
                                            {sessionStorage.getItem('role').toLocaleUpperCase() === 'PARENT' && this.props.selectedStudent.firstName}
                                             {sessionStorage.getItem('role').toLocaleUpperCase() === 'PARENT' && this.props.selectedStudent.lastName}
                                             <button onClick={()=> this.props.dismissForm()} type="button" class="btn btn-warning btn-sm btn-block">Formular verstecken</button>

                                        </div>

                                        <div className="form-inline">


                                            <fieldset>

                                                <label class="sr-only" for="inlineFormInputGroupUsername2">ab</label>
                                                <div class="input-group mb-2 mr-sm-2">
                                                    <div class="input-group-prepend">
                                                        <div class="input-group-text">ab</div>
                                                    </div>
                                                    <Field className="form-control" id="inlineFormInputName2" type="date" name="startDate" />

                                                </div>
                                                <div>
                                                    <ErrorMessage name="startDate" component="small" className="form-text text-danger"></ErrorMessage>
                                                </div>

                                            </fieldset>

                                            <fieldset>

                                                <label class="sr-only" for="inlineFormInputGroupUsername2">bis</label>
                                                <div class="input-group mb-2 mr-sm-2">
                                                    <div class="input-group-prepend">
                                                        <div class="input-group-text">bis</div>
                                                    </div>
                                                    <Field className="form-control" id="inlineFormInputName2" type="date" name="endDate" />

                                                </div>
                                                <div>
                                                    <ErrorMessage name="endDate" component="small" className="form-text text-danger"></ErrorMessage>
                                                </div>

                                            </fieldset>


                                        </div>

                                        <fieldset>

                                            <label class="sr-only" >Grund</label>
                                            <div class="input-group mb-2 mr-sm-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">Grund</div>
                                                </div>
                                                <Field className="form-control" id="inlineFormInputName2" type="text" name="cause" />

                                            </div>
                                            <ErrorMessage name="cause" component="small" className="form-text text-danger"></ErrorMessage>

                                        </fieldset>

                                        {/* <fieldset>

                                            <label class="sr-only" >Kommentar</label>
                                            <div class="input-group mb-2 mr-sm-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">Kommentar</div>
                                                </div>
                                                <Field className="form-control" id="inlineFormInputName2" type="text" name="comment" />

                                            </div>
                                            <ErrorMessage name="comment" component="small" className="form-text text-danger"></ErrorMessage>

                                        </fieldset> */}

                                        <button disabled={isSubmitting || errors.startDate || errors.endDate || errors.cause}
                                            type="submit" className="btn btn-sm btn-block btn-success">senden</button>


                                    </Form>
                                )
                            }
                        }


                    </Formik>

                </div>
            )

        }


    }
}

export default SicknoteForm