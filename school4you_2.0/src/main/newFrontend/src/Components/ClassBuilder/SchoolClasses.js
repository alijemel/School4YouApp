import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';


import classes from './SchoolClass.module.css';
import Button from '../../Button/Button'
import UserDataService from '../../api/UserDataService';
import ClassesDataService from '../../api/ClassesDataService';

class SchoolClasses extends Component {

    state = {
        showForm: false,
        neuName: '',
        existingClasses: []
    }

    componentDidMount() {
        ClassesDataService.getExistingClassnames()
            .then(response => {
                console.log(response.data)
                this.setState({ existingClasses: response.data })

            })
            .catch(error => {
                console.log(error)
            })



    }

    toggleForm = () => {
        if (!this.state.showForm) {
            this.setState({ showForm: true })
        } else {
            this.setState({ showForm: false })
        }
    }

    processInput = (e) => {
        this.setState({ input: e.target.value })
    }
    handleChange = (event) => {

        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    submit = (event) => {
        event.preventDefault()
        console.log(this.state.neuName)
        ClassesDataService.createClass(this.state.neuName)
            .then(response => {
                console.log(response.data)
                let existingClasses = this.state.existingClasses
                existingClasses.unshift(this.state.neuName)
                this.setState({existingClasses : existingClasses})
            })
            .catch(error => {
                console.log(error)
            })
    }







    render() {


        //CREATE COPMPONENT CLASSFORM

        let form = <form onSubmit={this.submit}>
            <div class="form-group">
                <label for="formGroupExampleInput">Bezeichnung</label>
                <input type="text" class="form-control" id="formGroupExampleInput" placeholder="Example input" name="neuName" value={this.state.neuName} onChange={this.handleChange}></input>
            </div>
            {/* <div class="form-group">
                <label for="formGroupExampleInput2">Another label</label>
                <input type="text" class="form-control" id="formGroupExampleInput2" placeholder="Another input"></input>
            </div> */}
            {/* <div class="input-group">

            </div> */}
            <button disabled={this.state.existingClasses.includes(this.state.neuName)}  class="btn btn-warning btn-primary btn-sm" type="submit" onSubmit={this.submit}>Weiter</button>

        </form>

        let schoolClasses = null
        if (Array.isArray(this.state.existingClasses) && this.state.existingClasses.length <= 0) {
            schoolClasses = <h3>
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </h3>
        } else {
            schoolClasses =
            this.state.existingClasses.map((className, index) => {
                return (
                    <li key={index} class="list-group-item">
                        <h3> {className}</h3> 
                        <Link to={{
                                                pathname: '/Klassen/anzeigen/' + className
                                            }
                                            }>
                        <button type="button" class="btn-dark btn-primary btn-sm"
                        //  onClick={()=>this.selectClass(myClass.id)}
                         >
                             Anzeigen

                         </button>
                                            </Link>

                            
                            
                        </li>
                )
            })
                              
                               

            
            
            // schoolClasses =
            //     <div>
            //         {
            //             this.state.existingClasses.map((className, index) => {
            //                 return (

            //                     <div className={classes.SchoolClass}>

            //                         <div class="jumbotron jumbotron-fluid">
            //                             <div class="container">
            //                                 <h1 class="display-3">{className}</h1>
            //                                 <p class="lead">Etwas schreiben</p>
            //                                 <Link to={{
            //                                     pathname: '/Klassen/anzeigen/' + className
            //                                 }
            //                                 }>
            //                                     <Button btnType="Success"> Anzeigen </Button>
            //                                 </Link>
            //                             </div>
            //                         </div>
            //                     </div>


            //                 )
            //             })
            //         }
            //     </div>


        }

        return (

            <div className="card">
                <div class="card-body">
  <h3 class="card-title">Klassen</h3>

                <button type="button" class="btn btn-warning btn-primary btn-sm" role="button" onClick={this.toggleForm}>Erstellen</button>
                {this.state.showForm && form}

                {schoolClasses}
                </div>



            </div>
        )
    }
}
export default SchoolClasses