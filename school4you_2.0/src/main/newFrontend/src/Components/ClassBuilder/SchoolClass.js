import React, { Component } from 'react';
import { Link, Route, withRouter } from 'react-router-dom';


import classes from './SchoolClass.module.css';
import Button from '../../Button/Button'
import UserDataService from '../../api/UserDataService';
import ClassesDataService from '../../api/ClassesDataService';

import AddToClass from './AddToClass'

class SchoolClass extends Component {

    state = {
        class : null,
        name : '',
        teachers : [],
        students : [],
        showAddTeacher : false,
        showAddStudent : false,
        usedTeacherEmails : ['a'],
        usedStudentEmails : ['b'],
        presentTeacherEmails : [],
        classTeacherEmails : [],
        globalTeacherEmails : [],
        classStudentEmails : [],
        globalStudentEmails : [],
        unavailableStudents : [],
        deleteClicked : false  
    }

    componentDidMount () {
        let name = this.props.match.params.name
        this.setState({name : name})
        ClassesDataService.getClass(name)
        .then(response =>{
            console.log(response.data)
            this.setState({class : response.data,
                teachers : response.data.teachers,
                students : response.data.students
            })
            console.log(response.data)
            this.populatePossibleValues(response.data);
        })
        .catch(error=> {
            console.log(error)
        })

        

    }

    populatePossibleValues =(loadedClass) =>{
        this.populatePossibleTeacherEmails(loadedClass.teachers)
        this.populatePossibleStudentEmails(loadedClass.students)

    }
    populatePossibleTeacherEmails=(teachers)=>{
        //ALL EMAILS of teachers that exist
        UserDataService.getAllEmailsByRole('teacher')
        .then(response => {
            this.setState({globalTeacherEmails : response.data})
        })
        .catch(error =>{
            console.log(error)
        })


        //EMails of teachers that are in this class already
        let classTeacherEmails = []
        if(teachers) {
            teachers.forEach(element => {
                classTeacherEmails.push(element.email)
                });
                this.setState({classTeacherEmails : classTeacherEmails})

        }
    
    }


    populatePossibleStudentEmails=(students)=>{
        //ALL STUDENT EMAILS
        UserDataService.getAllEmailsByRole('student')
        .then(response => {
            this.setState({globalStudentEmails : response.data})
        }).catch(error =>{
            console.log(error)
        })

        //Student emails that have already a class
        ClassesDataService.getUnavailableStudentEmails()
        .then(response => {
            this.setState({unavailableStudents : response.data})
        }).catch(error =>{
            console.log(error)
        })

        //Students mails that are is this class
        let classStudentEmails = []
        if(students) {
            students.forEach(element => {
                classStudentEmails.push(element.email)
                });
                this.setState({classStudentEmails : classStudentEmails})
        }
    


    }

    toggleAddTeacher=()=> {
        if (!this.state.showAddTeacher) {
            this.setState({ showAddTeacher: true })
        } else {
            this.setState({ showAddTeacher: false })
        }
    }

    toggleAddStudent=()=> {
        if (!this.state.showAddStudent) {
            this.setState({ showAddStudent: true })
        } else {
            this.setState({ showAddStudent: false })
        }
    }

    updateTeachers =(teacher)=> {
        let teachers = this.state.teachers;
        teachers.unshift(teacher)
        this.setState({teachers : teachers})
    }
    updateStudents =(student)=> {
        console.log('student')
        let students = this.state.students;
        students.unshift(student);
        this.setState({students : students})
        console.log(this.state.students)
    }

    notifyDeleteClicked =()=> {

    }


    deleteTeacherClicked=(id, index, email)=>{
        let teachers = this.state.teachers;
        teachers.splice(index,1);
        this.setState({teachers : teachers})

        let classTeacherEmails = this.state.classTeacherEmails;
        classTeacherEmails.splice(classTeacherEmails.indexOf(email),1)
        this.setState({classTeacherEmails : classTeacherEmails})

        this.resetDeleteClicked()


        

        ClassesDataService.removeElement(this.state.name,'teacher',id)
        .then(response => {
            console.log(response.data)

        })
        .catch(error =>{
            console.log(error);
        })

    }

    deleteStudentClicked =(id,index, email)=> {
        let students = this.state.students
        students.splice(index,1);
        this.setState({students : students})

        this.resetDeleteClicked()


        let classStudentEmails = this.state.classStudentEmails;
        classStudentEmails.splice(classStudentEmails.indexOf(email),1)
        this.setState({classStudentEmails : classStudentEmails})

        ClassesDataService.removeElement(this.state.name ,'student',id)
        .then(response => {
            console.log(response.data)

        })
        .catch(error =>{
            console.log(error);
        })
    }
    
    resetDeleteClicked =() => {
        let deleteClicked = this.state.deleteClicked
        this.setState({deleteClicked : !deleteClicked})
    }

    assignTeacherClicked =(teacherId, classId)=> {
        
        this.props.history.push(`/planen_Klasse_Lehrer/${classId}/${teacherId}`)

    }

    planClass=()=>{
        this.props.history.push(`/planen/${this.state.class.id}`)
    }

    timeTable=()=> {
        this.props.history.push(`/timetable/${this.state.class.id}`)
    }

    render() {

        let addTeacher = 
        <div >
            <AddToClass 
            deleteClicked={this.state.deleteClicked}
            resetDeleteClicked={this.resetDeleteClicked}
             updateParent={this.updateTeachers}  targetClass={this.state.name} 
             toAdd="teacher" globalPossibleValues={this.state.globalTeacherEmails} alreadyInClass={this.state.classTeacherEmails}
             >

             </AddToClass>
            

        </div>
        let addStudent = 
        <div >
            <AddToClass 
            deleteClicked={this.state.deleteClicked}
            resetDeleteClicked={this.resetDeleteClicked}
            updateParent={this.updateStudents}  targetClass={this.state.name} 
            toAdd="student" globalPossibleValues={this.state.globalStudentEmails} alreadyInClass={this.state.classStudentEmails}
            unavailable={this.state.unavailableStudents}

            >

            </AddToClass>

        </div>

        return (
            <div className="alert alert-info">

        <h2 class="m-3 font-weight-bolder text-monospace">Klasse . {this.state.name}</h2>

                {/* LEHRER */}

                
                <div>
                <button onClick={this.planClass} className="m-3 mt-5 btn btn-block btm-sm btn-warning">Veranstaltungen Planen</button>
                    <button onClick={this.timeTable} className="m-3 btn btn-block btm-sm btn-dark">Plan der Klasse anzeigen</button>

                </div>

                <div>



        {/* <Button btnType="Success" clicked={this.toggleAddTeacher}>Lehrer Hinzufügen </Button> */}
        <button onClick={this.toggleAddTeacher} className="m-3 mt-5 btn btn-block btm-sm btn-success">Lehrer hinzufügen</button>
        {this.state.showAddTeacher && addTeacher}

        <h3 class="font-weight-bold text-monospace">Lehrende</h3>

        

    <table class="table table-bordered table-striped">
    
                        <thead class="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Vorname</th>
                                <th>Nachname</th>
                                <th>email</th>
                            </tr>
                        </thead>
                        <tbody className="alert alert-dark">
                            {
                                this.state.teachers &&
                                this.state.teachers.map((teacher,index) => {
                                    return(
                                    <tr key={teacher.id}>
                                        <th scope="row">{teacher.id}</th>
                                <td>{teacher.firstName}</td>
                                        <td>{teacher.lastName}</td>
                                        <td>{teacher.email}</td>
                                        <td><button onClick={() => this.deleteTeacherClicked(teacher.id, index, teacher.email)} className="btn btn-sm btn-block btn-outline-danger">Löschen</button></td>
                                        {/* <td><button onClick={() => this.assignTeacherClicked(teacher.id, this.state.class.id)} className="btn btn-warning">Planen</button></td> */}


                                    </tr>)
                                    
                                })
                            }
                        </tbody>
                    </table>
                </div>





                {/* Schueler */}
                <div >
                
                {/* <Button btnType="Success" clicked={this.toggleAddStudent}>Hinzufügen</Button> */}
                <button onClick={this.toggleAddStudent} className="m-3 mt-5 btn btn-block btm-sm btn-success">Lernender hinzufügen</button>
                
                {this.state.showAddStudent && addStudent}
                <h3 class="font-weight-bold text-monospace">Lernende</h3>
                    <table class="table table-bordered table-striped">
                        <thead class="thead-dark">
                            <tr>
                                <th>ID</th>
                                <th>Vorname</th>
                                <th>Nachname</th>
                                <th>Email</th>
                            </tr>
                        </thead>
                        <tbody className="alert alert-dark">
                        {
                            this.state.students &&
                        this.state.students.map((student, index) => {
                                    return(
                                    <tr key={student.id}>
                                        <th scope="row">{student.id}</th>
                                <td>{student.firstName}</td>
                                        <td>{student.lastName}</td>
                                        <td>{student.email}</td>
                                        <td><button onClick={() => this.deleteStudentClicked(student.id, index, student.email)} className="btn btn-sm btn-block btn-outline-danger">Löschen</button></td>


                                    </tr>)
                                    
                                })
                            }
                        </tbody>
                    </table>

                    


                </div>

            </div>
        )
    }
}
export default SchoolClass