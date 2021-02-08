import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';


import classes from './SchoolClass.module.css';
import Button from '../../Button/Button'
import UserDataService from '../../api/UserDataService';
import ClassesDataService from '../../api/ClassesDataService';
import { date } from 'yup/lib/locale';

class MyClasses extends Component {

    state = {
        classes : [],
        id : ''
    }

    componentDidMount () {
        let id = this.props.match.params.id
        this.setState({id : id})
        ClassesDataService.getMyClasses(id)
        .then(response => {
            console.log(response.data)
            this.setState({classes : response.data})
            
        }).catch(error => {
            console.log(error)
        })
    }
     
    selectClass =(id)=> {
        this.props.history.push(`/Meine_Klasse/${id}`)

    }

    render() {
        let myClasses = null
        if (Array.isArray(this.state.classes) && this.state.classes.length <= 0) {
            myClasses = <h3>
                <div class="spinner-border spinner-border-sm" role="status">
                    <span class="sr-only">Loading Classes</span>
                </div>
            </h3>
        } else {
            if(this.state.classes) {
                myClasses = 
            this.state.classes.map((myClass, index) => {
                return ( 
                    <li key={myClass.id} class="list-group-item">
                        <h4> {myClass.className}</h4> 
                        <button type="button" class="btn btn-primary btn-sm" onClick={()=>this.selectClass(myClass.id)}>
                            
                            </button>
                        </li>
                )

            })

            }
            
            
        }


        return (
            
  <div class="card" >
  <div class="card-body">
  <h3 class="card-title">Meine Klassen</h3>
  {myClasses}
  </div>

</div>
  





    
  
        )
    }
}
export default MyClasses
    
