import React, { Component } from 'react';
import axios from 'axios'
import Button from '../../Button/Button'
import AuthenticationService from '../todo/AuthenticationService'
import * as Yup from 'yup';
import {Formik } from 'formik'
import { URL_APP } from '../../api/Constants';
import { Link } from 'react-router-dom';


class Form extends Component {

    state={
        email : '',
        password : '',
        error : '',
        usedEmails : []
    }

    componentDidMount( ) {
        let usedEmails = []
        axios.get(
            `${URL_APP}/users/existingEmails`
            //`http://132.231.36.104:8080/users/existingEmails`
            //`http://localhost:8080/users/existingEmails`
        )
        .then(response => {
            console.log(response.data)
            usedEmails = response.data
            this.setState({usedEmails : usedEmails})
        })
        .catch(err => {
            console.log(err)
        })

    }

    


    render() {

        console.log(process.env.NODE_ENV)

        let usedEmails = this.state.usedEmails

        

        return (
            <div>
                <Formik
                initialValues={{
                    email : '',
                    password : ''
                }}
                onSubmit={(values,{setsubmitting}) => {
                    setTimeout (()=> {
                        
                        let data = {
                            email: values.email,
                            password: values.password
                        }
                        console.log(data)
                        axios.post(`${URL_APP}/test`, data)
            .then(response => {
                console.log(response.data)
                AuthenticationService.registerSuccessfullLogin(response.data.id,
                    response.data.firstName,
                    response.data.lastName, response.data.role, response.data.approved);
                this.props.history.push(`/wellcome/${response.data.id}`)
            })
            .catch(error => {
                console.log(error.response.data.message)
                this.setState({ error: error.response.data.message })
            })

                    }, 500)
                }}
                
                // Define the validations 

                validationSchema ={Yup.object().shape({
                    email : Yup.string()
                        .email("Bitte gueltige Email Adresse eingeben")
                        .required("Bitte Email Adresse eingeben")
                        .oneOf(usedEmails, 'Kein Konto mit diser Email Adresse'),

                        password : Yup.string()
                        .required("Bitte Passwort eingeben")
                        .min(8, "password too short mindestens 8 chars")
                        .matches(/(?=.*[0-9])/,"password should contain a number")
                        




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
                                
                                   

<div className="container-fluid ">

<div className="container"><h1>Login</h1></div>
    <div className="row">
        <div className="col-md-4 col-sm-4 col-xs-12"></div>
        <div className="col-md-4 col-sm-4 col-xs-12">

            <form className="form-container" onSubmit={handleSubmit} >

            <small className="form-text text-danger">{this.state.error}</small>

                


                <div class="form-group">
                    <label for="exampleInputEmail1">Email Addresse</label>
                    
                    <input class="form-control " type="text" id="exampleInputEmail1" aria-describedby="emailHelp"
                     placeholder="Email" name="email" value={values.email}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     className={errors.email && touched.email && "form-control is-invalid" || "form-control"}
                       ></input>
                       {errors.email && touched.email && 
                       <small className="form-text text-danger">{errors.email}</small>}
                    <small id="emailHelp" class="form-text text-muted"></small>

                </div>

                <div class="form-group">
                    <label for="exampleInputPassword1">Passwort</label>
                    <input type="password"  id="exampleInputPassword1" placeholder="********" 
                    name="password" value={values.password} onChange={handleChange}
                    onBlur={handleBlur} 
                    className={errors.password && touched.password && "form-control is-invalid" || "form-control"} >

                    </input>
                    {errors.password && touched.password && 
                       <small className="form-text text-danger">{errors.password}</small>}
                       <Link
                       to='/reset-password'
                       >
                           <small id="emailHelp" class="form-text text-muted">Passwort Zurücksetzen</small>
                       </Link>
                    

                </div>


                <button type="submit" disabled={errors.email || errors.password} class="btn btn-success btn-block bouton" >Submit</button>
            </form>

        </div>
        <div className="col-md-4 col-sm-4 col-xs-12"></div>
    </div>
    
    
</div >
                                
                            )
                        }
                    }


                </Formik>

                

                </div>


            
        )
    }

}

export default Form