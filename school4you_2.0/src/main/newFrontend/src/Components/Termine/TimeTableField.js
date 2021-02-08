import { replace } from 'formik';
import { extend } from 'jquery';
import React, { Component } from 'react';
import AppointmentDataService from '../../api/AppointmentDataService';
import PresenceDataService from '../../api/PresenceDataService';

class TimeTableField extends Component {

    state={
        exists :false,
        appointment : {
            
        },
        week : 0,
        type : '',
        presence : ''
    }

    componentDidMount () {
        this.setState({week : this.props.week})

        AppointmentDataService.getAppointmentByClassIdANndDateAndSlot(this.props.classId, this.props.date, this.props.slot)
        .then(response => {
            console.log(response.data)
            if(response.data) {
                this.setState({exists : true, appointment : response.data, type : response.data.type})
                if(this.props.studentId) {
                    PresenceDataService.getPresenceByAppointmentIdAndStudentId(response.data.id, this.props.studentId)
                    .then(response => {
                        console.log(response.data)
                        if(!response.data) {
                            if(this.props.date <= new Date().toISOString().slice(0, 10)) {
                                this.setState({presence : <span class="badge badge-warning">Nicht eingegeben</span>})
                            }
                            
                        } else if (response.data.present) {
                            this.setState({presence : <span class="badge badge-success">Anwesend</span> })
                        } else if (!response.data.present) {
                            this.setState({presence : <span class="badge badge-danger">Nicht anwesend</span> })                        }
                    }).catch(error => {
                        console.log(error.response.data)
                    })
                }
            } else {
                this.setState({exists : false})
            }
        }).catch(error => {
            console.log(error.response.data)
        })
    }

    componentDidUpdate() {
        if(this.props.week !== this.state.week) {
            this.setState({week : this.props.week, presence : ''})
            AppointmentDataService.getAppointmentByClassIdANndDateAndSlot(this.props.classId, this.props.date, this.props.slot)
        .then(response => {
            console.log(response.data)
            if(response.data) {
                this.setState({exists : true, appointment : response.data, type : response.data.type})
                if(this.props.studentId) {
                    PresenceDataService.getPresenceByAppointmentIdAndStudentId(response.data.id, this.props.studentId)
                    .then(response => {
                        console.log(response.data)
                        if(!response.data) {
                            if(this.props.date <= new Date().toISOString().slice(0, 10)) {
                                this.setState({presence : <span class="badge badge-warning">Nicht eingegeben</span>})
                            }
                        } else if (response.data.present) {
                            this.setState({presence : <span class="badge badge-success">Anwesend</span> })
                        } else if (!response.data.present) {
                            this.setState({presence : <span class="badge badge-danger">Nicht anwesend</span> })                        }
                    }).catch(error => {
                        console.log(error.response.data)
                    })
                }
            
                
            } else {
                this.setState({exists : false, type : ''})
            }
        }).catch(error => {
            console.log(error.response.data)
        })

        }
        
    }
    
    render() { 

        console.log(this.props.date)
        let classId = this.props.classId
        let date = this.props.date
        let slot= this.props.slot

        let examStyle =null
        if(this.state.type === 'EXAM') {
            examStyle = "#ff9d57"
        }


        let appointment = 
        <div>
            <p><span class="text-monospace" >{this.state.appointment.subject}</span>, <span class="font-weight-lighter">{this.state.appointment.teacherName}</span> </p>
            {this.state.type ==='EXAM' && <p><span class="text-monospace" >Prüfung</span></p>}
            

        </div>
            
        
        

        
        return (
            <th style={{backgroundColor : examStyle}} scope="row">
                {! this.state.exists && <span class="badge badge-info">----</span>}
                {this.state.exists && appointment}
                {this.props.studentId && this.state.presence}
                
            </th>
        )
    }
}

export default TimeTableField