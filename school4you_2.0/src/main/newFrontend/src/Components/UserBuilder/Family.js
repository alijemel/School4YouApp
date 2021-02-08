import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FamilyDataService from '../../api/FamilyDataService';
import SicknoteForm from './SicknoteForm';

class Family extends Component {

    state = {
        students: [],
        parents: [],
        showParentsForm: false,
        showStudentsForm: false,
        availableStudents: [],
        availableParents: [],
        selectedParent: '',
        selectedParentIndex: '',
        selectedStudentIndex: '',
        selectedStudent: '',
        message: '',

        showSickForm: false,
        selectedStudent: ''

    }

    componentDidMount() {
        if (sessionStorage.getItem('role').toLocaleUpperCase() === 'SECRETARY') {
            this.populateAvailableParents();
            this.populateAvailableStudents();
        }
        this.populateParents(); this.populateStudents()
    }

    toggleForm = (student) => {
        this.setState({ showSickForm: true, selectedStudent: student })


    }

    //Parents existing in this family
    populateParents = () => {
        FamilyDataService.getParentsByFamily(this.props.match.params.familyId)
            .then(response => {
                console.log(response.data)
                let parents = response.data
                this.setState({ parents: parents })
            }).catch(error => { console.log(error.response.data) })
    }

    //Students existing in this family
    populateStudents = () => {
        FamilyDataService.getStudentsByFamily(this.props.match.params.familyId)
            .then(response => {
                console.log(response.data)
                let students = response.data
                this.setState({ students: students })
            }).catch(error => { console.log(error.response.data) })
    }


    populateAvailableStudents = () => {
        FamilyDataService.populateAvailableStudents()
            .then(response => {
                let availableStudents = response.data
                this.setState({ availableStudents: availableStudents })
            }).catch(error => { console.log(error.response.message) })

    }

    populateAvailableParents = () => {
        FamilyDataService.populateAvailableParents()
            .then(response => {
                let availableParents = response.data
                this.setState({ availableParents: availableParents })
            }).catch(error => { console.log(error.response.message) })
    }

    selectParent = (event, parent) => {
        let selectedParent = parent
        this.setState({ selectedParent: selectedParent, selectedParentIndex: event.target.value })
    }

    selectStudent = (event, student) => {
        let selectedStudent = student
        this.setState({ selectedStudent: selectedStudent, selectedStudentIndex: event.target.value })
    }

    submitParent = () => {
        let parentId = this.state.selectedParent.id
        let parents = this.state.parents
        parents.push(this.state.selectedParent)
        this.setState({ parents: parents, selectedParent: '' })

        //Clean up dropdown
        let availableParents = this.state.availableParents
        availableParents.splice(this.state.selectedParentIndex, 1)
        this.setState({ availableParents: availableParents, selectedParentIndex: '' })
        //API CALL
        FamilyDataService.addParentToFamily(this.props.match.params.familyId, parentId)
            .then(response => {
                this.setState({ message: response.data.message })
            }).catch(error => { console.log(error.response.message) })
    }

    submitStudent = () => {
        let studentId = this.state.selectedStudent.id
        let students = this.state.students
        students.push(this.state.selectedStudent)
        this.setState({ students: students, selectedStudent: '' })
        //Clean up dropdown
        let availableStudents = this.state.availableStudents
        availableStudents.splice(this.state.selectedStudentIndex, 1)
        this.setState({ availableStudents: availableStudents, selectedStudentIndex: '' })
        //API CALL
        FamilyDataService.addChildToFamily(this.props.match.params.familyId, studentId)
            .then(response => {
                this.setState({ message: response.data.message })
            }).catch(error => { console.log(error.response.message) })

    }

    //Removing Parent 
    removeParent = (parentId, index) => {
        let parents = this.state.parents
        let availableParents = this.state.availableParents
        availableParents.push(parents[index])
        parents.splice(index, 1)
        this.setState({ parents: parents, availableParents: availableParents })
        FamilyDataService.removeParentFromFamily(this.props.match.params.familyId, parentId)
            .then(response => {
                this.setState({ message: response.data.message })
            }).catch(error => { console.log(error.response.message) })

    }

    //Removing student
    removeStudent = (studentId, index) => {
        let students = this.state.students
        let availableStudents = this.state.availableStudents
        availableStudents.push(students[index])
        students.splice(index, 1)
        this.setState({ students: students, availableStudents: availableStudents })
        FamilyDataService.removeStudentFromFamily(this.props.match.params.familyId, studentId)
            .then(response => {
                this.setState({ message: response.data.message })
            }).catch(error => { console.log(error.response.message) })
    }

    render() {
        let secretaryControl = sessionStorage.getItem('role').toLocaleUpperCase() === 'SECRETARY'
        let parentControl = sessionStorage.getItem('role').toLocaleUpperCase() === 'PARENT'


        //Parents dropdown 
        let parentsDropDown =
            <div class="btn-group">
                <button disabled={this.state.parents.length >= 2} class="btn btn-outline-dark btn-sm btn-block  dropdown-toggle"
                    type="button" id="dropdownMenu1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    Eltern+
  </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                    {
                        this.state.availableParents.length > 0 && this.state.availableParents.map((parent, index) => {
                            return (
                                <option
                                    onClick={(event) => { this.selectParent(event, parent) }}
                                    value={index}

                                    className="dropdown-item text-monospace ">
                                    {parent.firstName}, {parent.lastName}, {parent.email}
                                </option>
                            )
                        })
                    }

                </div>
                <button disabled={this.state.selectedParent === ''} onClick={this.submitParent} type="button" class=" btn btn-outline-success btn-sm">Speichern</button>
                <button disabled type="button" class=" btn btn-outline-success btn-block">{this.state.selectedParent.firstName}_{this.state.selectedParent.lastName}</button>


            </div>

        //ParentsTable 

        let parentsTable =
            <div>
                <h3 className="text-monospace">Eltern</h3>
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Vorname</th>

                            <th>Nachname</th>

                            <th>Email Adresse</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.parents.length >= 0 && this.state.parents.map((parent, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{parent.firstName}</th>
                                        <th>{parent.lastName}</th>
                                        <th>{parent.email}</th>
                                        {secretaryControl && <th><button onClick={() => this.removeParent(parent.id, index)} type="button" class="btn btn-outline-danger btn-sm btn-block">Entfernen</button></th>}

                                    </tr>
                                )

                            })
                        }

                    </tbody>
                </table>
                {secretaryControl && parentsDropDown}
            </div>

        //Children Dropdown

        let studentsDropDown =
            <div class="btn-group">
                <button disabled={this.state.students.length >= 5} class="btn btn-outline-dark btn-sm btn-block  dropdown-toggle"
                    type="button" id="dropdownMenu1" data-toggle="dropdown"
                    aria-haspopup="true" aria-expanded="false">
                    Kinder+
  </button>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu1">
                    {
                        this.state.availableStudents.length > 0 && this.state.availableStudents.map((student, index) => {
                            return (
                                <option
                                    onClick={(event) => { this.selectStudent(event, student) }}
                                    value={index}
                                    className="dropdown-item text-monospace "

                                >
                                    {student.firstName} {student.lastName} {student.email}
                                </option>
                            )
                        })
                    }

                </div>
                <button disabled={this.state.selectedStudent === ''} onClick={this.submitStudent} type="button" class=" btn btn-outline-success btn-sm">Speichern</button>
                <button disabled type="button" class=" btn btn-outline-success btn-block">{this.state.selectedStudent.firstName}_{this.state.selectedStudent.lastName}</button>


            </div>

        // let modal =
        //     <div class="modal" id="exampleModalCentered" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
        //         <div class="modal-dialog modal-dialog-centered" role="document">
        //             <div class="modal-content">
        //                 <div class="modal-header">
        //                     <h5 class="modal-title" id="exampleModalCenteredLabel">Krank melden</h5>
        //                     <button type="button" class="close" data-dismiss="modal" aria-label="Close">
        //                         <span aria-hidden="true">&times;</span>
        //                     </button>
        //                 </div>
        //                 <div class="modal-footer">
        //                     <button data-dismiss="modal" type="button" class="btn btn-outline-danger btn-sm btn-block"> Entfernen</button>
        //                     <button data-dismiss="modal" type="button" class="btn btn-outline-info btn-sm btn-block"> Exit</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>



        //Children Table
        let studentsTable =
            <div>
                <h3 className="text-monospace">Kinder</h3>
                <table className="table table-bordered table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>Vorname</th>

                            <th>Nachname</th>

                            <th>Email Adresse</th>

                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.state.students.length >= 0 && this.state.students.map((student, index) => {
                                return (
                                    <tr key={index}>
                                        <th>{student.firstName}</th>
                                        <th>{student.lastName}</th>
                                        <th>{student.email}</th>

                                        {parentControl &&
                                            <th>
                                                <Link
                                                    to={`/timetable/Klasse/${student.classId}/Lernender/${student.id}`}
                                                >
                                                    <button disabled={!student.classId} type="button" class="btn btn-outline-info btn-sm btn-block">Termine</button>
                                                </Link>
                                            </th>}

                                        {parentControl && <th>
                                            <Link
                                                to={`/Noten/${student.id}`}
                                            >
                                                <button disabled={!student.classId} type="button" class="btn btn-outline-dark btn-sm btn-block">Noten</button>

                                            </Link>
                                        </th>}

                                        {
                                            parentControl && <th>

                                                <button onClick={() => this.toggleForm(student)} disabled={!student.classId} type="button" class="btn btn-outline-danger btn-sm btn-block">Krank melden</button>

                                            </th>
                                        }


                                        {secretaryControl && <th><button onClick={() => this.removeStudent(student.id, index)} type="button" class="btn btn-outline-danger btn-sm btn-block">Entfernen</button></th>}

                                    </tr>
                                )

                            })
                        }

                    </tbody>
                </table>

                {secretaryControl && studentsDropDown}

            </div>

        let message =
            <div class="alert alert-info" role="alert">
                {sessionStorage.getItem('role').toLocaleUpperCase() === 'SECRETARY' && <strong>Familien Verwalten</strong>}
                {sessionStorage.getItem('role').toLocaleUpperCase() === 'PARENT' && <strong>Meine Familie</strong>}

                {this.state.message}
            </div>




        return (
            <div>
                {message}

                {parentsTable}
                {parentControl 
                &&
                 <div class="alert alert-secondary" role="alert">
                    <strong>Wichtig! Anwesenheiten und Krankmeldungen</strong> die einen Schüler betreffen,
                     (Krankmeldungen der Lehrenden die diesen Schüler unterrichten) werden bei der TERMINE Übersicht des jeweiligen Kindes angezeigt!
</div>}
                {studentsTable}

                {this.state.showSickForm &&
                    <SicknoteForm
                        selectedStudent={this.state.selectedStudent}
                        dismissForm={() => this.setState({ showSickForm: false })}
                    />}


            </div>
        )
    }
}

export default Family