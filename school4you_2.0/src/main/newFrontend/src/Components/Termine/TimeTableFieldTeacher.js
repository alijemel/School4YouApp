import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AppointmentDataService from '../../api/AppointmentDataService';

class TimeTableFieldTeacher extends Component {

    state={
        exists :false,
        appointment : {
            
        },
        type :'' ,
        week : 0
    }


    componentDidMount() {

        this.setState({week : this.props.week})
        AppointmentDataService.getAppointmentByTeacherIdANndDateAndSlot(this.props.teacherId, this.props.date, this.props.slot)
        .then(response => {
            if(response.data) {
                this.setState({exists : true, appointment : response.data , type : response.data.type})
            } else {
                this.setState({exists : false})
            }
        }).catch(error => {
            console.log(error.response.data)
        })

    }

    componentDidUpdate() {
        if(this.props.week !== this.state.week) {
            this.setState({week : this.props.week})
            AppointmentDataService.getAppointmentByTeacherIdANndDateAndSlot(this.props.teacherId, this.props.date, this.props.slot)
        .then(response => {
            console.log(response.data)
            if(response.data) {
                this.setState({exists : true, appointment : response.data, type : response.data.type})
            } else {
                this.setState({exists : false, type : ''})
            }
        }).catch(error => {
            console.log(error.response.data)
        })

        }

    }

    // //called when clicked on presence for appointments that are in the past
    // managePresence=()=> {
    //     //this.props.history.push(`/Anwesenheiten/Termin/${this.state.appointment.id}`)
    //     this.props.history.push(`/`)

    // }




    render() {

        let examStyle =null
        if(this.state.type === 'EXAM') {
            examStyle = "#ff9d57"
        }
        

        let appointment = 
        <div>
            <p><span class="text-monospace" >{this.state.appointment.subject}</span>, <span class="font-weight-lighter">Klasse id.{this.state.appointment.classId}</span>
             </p>
            {this.state.type ==='EXAM' && <p><span class="text-monospace" >Prüfung</span></p>}
            

        </div>
            

        return (
            <th style={{backgroundColor : examStyle}}  scope="row">
                {! this.state.exists && <span class="badge badge-info">----</span>}
                {this.state.exists && appointment}
                {this.state.exists && (this.props.today >= this.state.appointment.date) &&
                 <Link
                 to={{pathname : `/Anwesenheiten/Termin/${this.state.appointment.id}`
                 }}
                 ><button onClick={this.managePresence} type="button" class="btn btn-primary btn-sm">Präsenz</button></Link>
                 
                 }



            </th>
        )
    }

}
export default TimeTableFieldTeacher