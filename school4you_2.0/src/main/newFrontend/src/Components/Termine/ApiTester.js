
import React, { Component } from 'react';
import AppointmentDataService from '../../api/AppointmentDataService';
import moment from 'moment'

let today = moment(new Date()).format('YYYY-MM-DD')

class ApiTester extends Component {

    componentDidMount() {
        // AppointmentDataService.getAppointmentByiId(42)
        // .then(response => {
        //     console.log(response.data)
        // }).catch(error => {
        //     console.log(error)
        // })

       AppointmentDataService.getAvailableTeachersByClassIdDateSlot(21, '2021-01-11', '08:00 _ 10:00')
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error.response.data)
        })

    }
    createAppointment=()=>{
        let newAppointment = {
            classId : 21,
            teacherId : 7,
            date : today,
            slot : '10:00 _ 12:00',
            subject : 'MATHEMATIK'
        }
        AppointmentDataService.createAppointment(newAppointment)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    getAppointment =(id)=> {
        AppointmentDataService.getAppointmentByiId(id)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
    }

    editAppointment=(id, subject)=>{
        AppointmentDataService.editAppointment(id,subject)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })

    }

    deleteAppointment=(id)=>{
        AppointmentDataService.deleteAppointment(id)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error.response.data)
        })

    }


        

    render() {
        
        return (
            <div>

               
               <button onClick={()=>this.getAppointment(43)} >create appointment</button>
               <button onClick={this.createAppointment} type="button" class="btn btn-danger">create</button>
               <button onClick={()=>this.deleteAppointment(36)} type="button" class="btn btn-danger">delete</button>
               <button onClick={()=>this.editAppointment(43, 'CHEMIE')} type="button" class="btn btn-danger">edit</button>

                
            </div>
        )
    }
}

export default ApiTester