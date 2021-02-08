import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from 'yup';
import React, { Component } from 'react'
import { min } from 'moment';
import ExamDataService from '../../api/ExamDataService';
import { date } from 'yup/lib/locale';

class ExamForm extends Component {

    state = {
        serverFeedback: '',
        submitted : false

    }

    componentDidUpdate() {
        if(this.state.submitted) {
            this.setState({submitted : false})
        }
    }



    onSubmit=(values)=> {
        let firstName = sessionStorage.getItem('firstName')
        let lasttName = sessionStorage.getItem('lastName')

        let exam = {
            date :values.date, slot : values.slot, subject : values.subject,description : values.description, coefficient : values.coefficient,
            classId : this.props.classId, teacherId : this.props.teacherId, teacherName : `${firstName} ${lasttName}`
        }
        console.log(exam)
        ExamDataService.createExam(exam)
        .then(response => {
            this.props.feedback(response.data.message)
            this.setState({serverFeedback : response.data.message, submitted : true})
            console.log(response.data)
            this.props.submitClicked()
            

        }).catch(error => {
            console.log(error.response.data)
        })

        
    }

    validate =(values)=> {
        let errors = {}
        
        let date = values.date
        let slot = values.slot
        let selectedDateObject = {
            date, slot
        }
        

        if(this.props.action === 'Erstellen') {
            if(this.props.existingExamDates.some( date => date.date === selectedDateObject.date && date.slot === selectedDateObject.slot) ){
                errors.date = 'Existing exam'
                errors.slot = 'existing exam'
            }
        }
        
        return errors
    }



    render() {

        let minDate = new Date()
        minDate.setDate(minDate.getDate() + 4)


        

        return (
            <div>

                <Formik

                

                    initialValues={{
                        
                        date : this.props.toEdit.date,
                        slot : this.props.toEdit.slot,
                        subject : this.props.toEdit.subject,
                        coefficient : this.props.toEdit.coefficient,
                        description : this.props.toEdit.description

                    }}

                    onSubmit={this.onSubmit}
                    validate={this.validate}
                    validateOnChange={true}
                    validateOnBlur={true}
                    enableReinitialize={true}

                    validationSchema={Yup.object().shape({

                        date: Yup.date().required("Bitte Datum eingeben.").min(minDate, "Mindestens 5 Tage im voraus Prüfung planen."),

                        slot : Yup.string().required("Bitte Zeitraum eingeben."),
                        subject : Yup.string().required("Bitte Fach eingeben."),
                        description : Yup.string().required("Bitte Kurze Beschreibung eingeben.").max(20, "Zu lang"),

                        coefficient : Yup.number()




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
                            <h6 style={{color : "red"}} class="card-subtitle mb-2 ">{this.state.serverFeedback}</h6>
                                    
                                    <div className="form-inline">


                                        <fieldset>

                                            <label class="sr-only" for="inlineFormInputGroupUsername2">Datum</label>
                                            <div class="input-group mb-2 mr-sm-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">Prüfungsdatum</div>
                                                </div>
                                                <Field disabled={this.props.action === 'Ändern'} className="form-control" id="inlineFormInputName2" type="date" name="date" />

                                            </div>
                                            <div>
                                            <ErrorMessage name="date" component="small" className="form-text text-danger"></ErrorMessage>
                                            </div>
                                            


                                        </fieldset>



                                        <fieldset>

                                            <label class="sr-only" for="inlineFormInputGroupUsername2"></label>
                                            <div class="input-group mb-2 mr-sm-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">Zeit</div>
                                                </div>
                                                <Field disabled={this.props.action === 'Ändern'} className="form-control" as="select" name="slot">
                                                    <option key="0" value={''}>Zeit Wahl</option>
                                                    <option key="1" value="08:00 _ 10:00">08:00 _ 10:00</option>
                                                    <option key="2" value="10:00 _ 12:00">10:00 _ 12:00</option>
                                                    <option key="3" value="12:00 _ 14:00">12:00 _ 14:00</option>
                                                    <option key="4" value="14:00 _ 16:00">14:00 _ 16:00</option>
                                                </Field>

                                            </div>
                                            <div>
                                            <ErrorMessage name="slot" component="small" className="form-text text-danger"></ErrorMessage>
                                            </div>

                                        </fieldset>

                                        <fieldset>

                                            <label class="sr-only" for="inlineFormInputGroupUsername2"></label>
                                            <div class="input-group mb-2 mr-sm-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">Fach</div>
                                                </div>
                                                <Field className="form-control" as="select" name="subject">
                                                    <option key="0" value=''>Fach Wahl</option>
                                                    <option key="1" value="MATHEMATIK">Mathematik</option>
                                                    <option key="2" value="PHYSIK">Physik</option>
                                                    <option key="3" value="CHEMIE">Chemie</option>
                                                </Field>
                                                

                                            </div>
                                            <ErrorMessage name="subject" component="small" className="form-text text-danger"></ErrorMessage>


                                        </fieldset>

                                        <fieldset>

                                            <label class="sr-only" for="inlineFormInputGroupUsername2">Username</label>
                                            <div class="input-group mb-2 mr-sm-2">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-text">Koeffizient</div>
                                                </div>
                                                <Field className="form-control" as="select" name="coefficient">
                                                    <option key="1" value={1}>1</option>
                                                    <option key="2" value={2}>2</option>
                                                    <option key="3" value={3}>3</option>
                                                    <option key="4" value={4}>4</option>
                                                </Field>
                                                <ErrorMessage name="coefficient" component="small" className="alert alert-warning"></ErrorMessage>

                                            </div>


                                        </fieldset>
                                    </div>

                                    <fieldset>

                                        <label class="sr-only" >Beschreibung</label>
                                        <div class="input-group mb-2 mr-sm-2">
                                            <div class="input-group-prepend">
                                                <div class="input-group-text">Beschreibung</div>
                                            </div>
                                            <Field className="form-control" id="inlineFormInputName2" type="text" name="description" />
                                            
                                        </div>
                                        <ErrorMessage name="description" component="small" className="form-text text-danger"></ErrorMessage>

                                    </fieldset>

                                    <button disabled={isSubmitting || this.props.action !== 'Erstellen' || errors.date || errors.slot || errors.subject }  
                                    type="submit" className="btn btn-success">{this.props.action}</button>
                                    {this.props.action !== 'Erstellen' && <small>feature edit exam is not ready, only create and delete for now. </small>}
                                    <button onClick={this.props.dismiss}  type="button" className="btn btn-dark">Zurück</button>

                                </Form>
                            )











                        }
                    }
























                </Formik>


            </div>
        )
    }
}

export default ExamForm