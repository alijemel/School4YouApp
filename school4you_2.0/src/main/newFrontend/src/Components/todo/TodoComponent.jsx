import React, { Component } from 'react'
import moment from 'moment'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import TodoDataService from '../../api/TodoDataService.js'
import AuthenticationService from './AuthenticationService.js'

class TodoComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            id : this.props.match.params.id,
            description : '',
            targetDate : moment (new Date()).format('YYYY-MM-DD')
        }
    }

    componentDidMount() {
        let username = AuthenticationService.getLoggedInUserName()

        if (this.state.id === -1) {
            return
        }

        TodoDataService.retrieveTodo(username, this.state.id)
        .then(response => this.setState( {
            description : response.data.description,
            targetDate : moment(response.data.targetDate).format('YYYY-MM-DD')
        } 

        ))
            }

    onSubmit=(values)=> {
        let username = AuthenticationService.getLoggedInUserName()
        let todo = {
            id : this.state.id,
            description : values.description,
            targetDate : values.targetDate
        }
        if (this.state.id == -1) {
            TodoDataService.createTodo(username,
                todo).then(() => {this.props.history.push(`/termine`) })
                .catch(err => {
                    //Handle your error here
                    console.log(err.response);
                })
                {this.props.history.push(`/termine`)}
                


        } else {
            TodoDataService.updateTodo(username, this.state.id, 
                todo).then(() => { this.props.history.push(`/termine`) })
                .catch(err => {
                    //Handle your error here
                    console.log(err.response);
                })
                { this.props.history.push(`/termine`) }
        }
            
    }

    validate=(values) => {
        let errors = {}
        if(!values.description) {
            errors.description = 'Enter a description'
        } else if (values.description.length<5) {
            errors.description='at least 5 chars'
        }

        if(!moment(values.targetDate).isValid()) {
            errors.targetDate= 'Ungultiges Datum'
        }
        return errors
    }

    title=()=>{
        if (this.props.match.params.id === -1) {
            return <h1>Termin erstellen</h1>
        } else return <h1>Termin {this.props.match.params.id} bearbeiten</h1>

    }

    render() {
        let {description, targetDate}= this.state
        
        return(
        <div>
        <h1>Termin {this.props.match.params.id}</h1>

        <div className="container">
            <Formik

                initialValues={{
                    description : description,
                    targetDate :  targetDate
                }}
                onSubmit={this.onSubmit}
                validate={this.validate}

                validateOnChange={false}
                validateOnBlur={true}
                enableReinitialize={true}
                
            
            >
                {
                    (props) => (
                        <Form>
                            <ErrorMessage name="description" component="div" className="alert alert-warning"></ErrorMessage>
                            <fieldset className="form-group">
                                <label>Beschreibung</label>
                                <Field className="form-control" type="text" name="description" />
                            </fieldset>
                            <fieldset className="form-group">
                                <label>Datum</label>
                                <ErrorMessage name="targetDate" component="div" className="alert alert-warning"></ErrorMessage>
                                <Field className="form-control" type="date" name="targetDate"/>
                            </fieldset>
                            <button className="btn btn-success">Save</button>

                        </Form>
                        

                    )

                }



            </Formik>
        </div>
        </div>
        
        )
    }
}
export default TodoComponent