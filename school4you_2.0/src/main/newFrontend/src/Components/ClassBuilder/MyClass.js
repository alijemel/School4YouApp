import React, { Component } from 'react'
import ClassesDataService from '../../api/ClassesDataService'
import ClassInbox from '../AnnouncementsBuilder/ClassInbox'
import Inbox from '../AnnouncementsBuilder/Inbox'
import Exams from '../Termine/Exams'
import SickNotesNotifications from '../UserBuilder/SickNotesNotifications'

class MyClass extends Component {

    state = {
        userId: sessionStorage.getItem('id'),
        myClass: {
            id: 0,
            className: '',
            teachers: [],
            students: [],
            inboxId: 0
        },
        showTeachers: false,
        showStudents: false,
        showNews: false,
        showExams: false,
        showSickNotes : true,

        serverResponded : false
    }

    componentDidMount() {
        ClassesDataService.getMyClass(this.props.match.params.classId)
            .then(response => {
                console.log(response.data)
                this.setState({ myClass: response.data, serverResponded :true })
            }).catch(error => {
                console.log(error)
            })
    }

    toggleTeachers = () => {
        this.setState({ showTeachers: !this.state.showTeachers })
    }
    toggleStudents = () => {
        this.setState({ showStudents: !this.state.showStudents })
    }
    toggleNews = () => {
        this.setState({ showNews: !this.state.showNews })
    }

    toggleExams = () => {
        this.setState({ showExams: !this.state.showExams })
    }


    timeTable = () => {
        this.props.history.push(`/timetable/${this.props.match.params.classId}`)
    }


    render() {

        //creting teacher table
        let teacherBody = null
        if (this.state.myClass) {
            teacherBody =
                <tbody className="alert alert-dark">
                    {
                        this.state.myClass.teachers.map((teacher, index) => {
                            return (
                                <tr key={teacher.id}>
                                    <th scope="row">{teacher.id}</th>
                                    <td>{teacher.firstName}</td>
                                    <td>{teacher.lastName}</td>
                                    <td>{teacher.email}</td>

                                </tr>
                            )
                        })
                    }

                </tbody>

        }
        let teacherTable =
            <div>
                <h3>Lehrende</h3>
                <table class="table table-bordered table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>:)</th>
                            <th>Vorname</th>
                            <th>Nachname</th>
                            <th>Email</th>
                        </tr>
                    </thead>

                    {teacherBody}

                </table>

            </div>



        //CREATING STUDENT TABLE

        let studentBody = null
        if (this.state.myClass) {
            studentBody =
                <tbody className="alert alert-dark">
                    {
                        this.state.myClass.students.map((student, index) => {
                            return (
                                <tr key={student.id}>
                                    <th scope="row">{student.id}</th>
                                    <td>{student.firstName}</td>
                                    <td>{student.lastName}</td>
                                    <td>{student.email}</td>

                                </tr>
                            )
                        })


                    }

                </tbody>
        }

        let studentTable =
            <div>
                <h3>Lernende</h3>

                <table class="table table-bordered table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>:)</th>
                            <th>Vorname</th>
                            <th>Nachname</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    {studentBody}
                </table>

            </div>

        //*********************** */

        return (
            <div className="alert alert-info card">
                <div className="alert alert-info card">
                    <div className="card-body">

                        <div class="alert alert-secondary" role="alert">
                            <h4 class="card-title">Klasse {this.state.myClass.className}</h4>
{                           
 this.state.showSickNotes && <button onClick={()=>this.setState({showSickNotes : false})} type="button" class="m-3 btn btn-outline-danger btn-sm btn-block">Krankmeldungen verstecken</button>
}                    
{                           
 !this.state.showSickNotes && <button onClick={()=>this.setState({showSickNotes : true})} type="button" class="m-3 btn btn-outline-warning btn-sm btn-block">Krankmeldungen Anzeigen</button>
}                    
        {this.state.serverResponded && this.state.showSickNotes &&
                                <SickNotesNotifications 
                            classId={this.state.myClass.id}
                            role={sessionStorage.getItem('role').toLocaleUpperCase()}
                            />}


                        </div>

                        <button type="button" class="btn m-3 btn-dark btn-sm" onClick={this.toggleTeachers}>Lehrer</button>
                        <button type="button" class="btn m-3 btn-warning btn-sm" onClick={this.toggleStudents}>Lernende</button>
                        <button type="button" class="btn m-3 btn-dark btn-sm" onClick={this.toggleNews}>News</button>
                        <button type="button" class="btn m-3 btn-warning btn-sm" onClick={this.toggleExams} >Tests</button>
                        <button type="button" class="btn m-3 btn-dark btn-sm" onClick={this.timeTable}>Plan</button>
                    </div>
                </div>
                {this.state.showTeachers && teacherTable}
                {this.state.showStudents && studentTable}
                {this.state.showNews && <ClassInbox classId={this.props.match.params.classId} />}
                {this.state.showExams && <Exams classId={this.props.match.params.classId} />}

            </div>
        )
    }
}
export default MyClass