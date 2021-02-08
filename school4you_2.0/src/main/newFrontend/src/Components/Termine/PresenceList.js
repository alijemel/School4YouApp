import React, { Component } from 'react';
import AppointmentDataService from '../../api/AppointmentDataService';
import ClassesDataService from '../../api/ClassesDataService';
import Presence from './Presence';

class Presencelist extends Component {

    state = {
        appointment: {

        },
        classId : 0,
        students: []

    }

    componentDidMount() {
        AppointmentDataService.getAppointmentByiId(this.props.match.params.appointmentId)
            .then(response => {
                console.log(response.data)
                this.setState({ appointment: response.data , classId : response.data.classId})
                //*********Populatins students */
                ClassesDataService.getClassStudents(response.data.classId)
                .then(response => {
                    console.log(response.data)
                    this.setState({students : response.data})
                }).catch(error => {
                    console.log(error.response.data)
                })
                //**************** */

            }).catch(error => {
                console.log(error.response.data)
            })

    }

    render() {
        return (
            <div>
                <h3>AnwesenheitsListe</h3>

                <ul class="list-group">
                    <li class="list-group-item text-monospace" >{this.state.appointment.date}</li>
                    <li class="list-group-item text-monospace">{this.state.appointment.slot}</li>
                    <li class="list-group-item text-monospace">{this.state.appointment.subject}</li>
                    <li class="list-group-item text-monospace">{this.state.appointment.type}</li>
                </ul>

                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Student</th>
                        
                            <th>Anwesenheit</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.students.map((student, index) => {
                                return (
                                    <tr key={index}>
                            <th>{student.firstName} {student.lastName}</th>

                            <Presence
                            studentId={student.id}
                            appointmentId={this.state.appointment.id}
                            appointmentType={this.state.appointment.type}
                             />
                        </tr>
                        

                                    
                                )
                            })
                        }
                        




                    </tbody>





                </table>









            </div>
        )
    }
}

export default Presencelist
