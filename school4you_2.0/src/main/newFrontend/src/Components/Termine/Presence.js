import { extend } from 'jquery';
import React, { Component } from 'react';
import AppointmentDataService from '../../api/AppointmentDataService';
import ExamDataService from '../../api/ExamDataService';
import GradeDataService from '../../api/GradeDataService';
import PresenceDataService from '../../api/PresenceDataService';

class Presence extends Component {

    state = {
        appointmentType: 'COURSE',
        fieldStatus: 'CREATE',
        present: '',
        grade: '',
        changed: false,
        oldPresence: '',

        newPresence: '',

        existsGrade: false,
        existingGrade: '',
        apiMessage: ''



    }

    componentDidMount() {
        this.setState({ appointmentType: this.props.appointmentType })

        PresenceDataService.getPresenceByAppointmentIdAndStudentId(this.props.appointmentId, this.props.studentId)
            .then(response => {
                console.log(response.data)
                //If null => no presence has been entered yet => create
                if (!response.data) {
                    this.setState({ fieldStatus: 'CREATE' })
                } else {
                    this.setState({ fieldStatus: 'EDIT', toEdit: response.data, oldPresence: response.data.present, present: response.data.present })

                    GradeDataService.getGradeByExamIdAndStudentId(this.props.appointmentId, this.props.studentId)
                        .then(response => {
                            if (!response.data) {
                                this.setState({ existsGrade: false })
                            } else {
                                this.setState({ existsGrade: true, existingGrade: response.data, grade: response.data.grade })
                            }
                        }).catch(error => {
                            console.log(error.response.data)
                        })





                }
            }).catch(error => {
                console.log(error.response.data)
            })
    }

    present = () => {
        this.setState({
            present: true,
            changed: true
        })
    }

    notPresent = () => {
        this.setState({
            present: false,
            changed: true
        })
    }

    submitCreatePresence = () => {
        console.log(this.state.present)
        this.setState({ fieldStatus: 'EDIT', changed: false, oldPresence: this.state.present })
        let newPresence = {
            appointmentId: this.props.appointmentId, studentId: this.props.studentId, present: this.state.present
        }
        console.log(newPresence)
        PresenceDataService.createPresence(newPresence)
            .then(response => {
                this.setState({ toEdit: response.data })
                console.log(response.data)
            }).catch(error => {
                console.log(error.response.data)
            })
    }

    submitEditPresence = () => {
        PresenceDataService.editPresence(this.state.toEdit.id, this.state.present)
            .then(response => {
                console.log(response.data)
                this.setState({ toEdit: response.data, changed: false, oldPresence: this.state.present })
            }).catch(error => {
                console.log(error.response.data)
            })


    }

    dismissEdit = () => {
        this.setState({ present: this.state.oldPresence, changed: false })
    }

    selectGrade = (event) => {
        this.setState({ grade: event.target.value })
    }

    submitGrade = () => {
        let grade = {
            examId: this.props.appointmentId,
            studentId: this.props.studentId,
            grade: this.state.grade
        }
        this.setState({ existsGrade: true })
        GradeDataService.setGrade(grade)
            .then(response => {
                console.log(response.data)
                this.setState({ existingGrade: response.data.object, apiMessage: response.data.message })
            }).catch(error => {
                console.log(error.response.data)
            })
    }

    deleteGrade = () => {
        this.setState({ existsGrade: false, grade: '' })
        GradeDataService.deleteGrade(this.state.existingGrade.id)
            .then(response => {
                this.setState({ apiMessage: response.data.message })
            }).catch(error => {
                console.log(error.response.data)
            })
    }





    render() {


        let grade =
            <div class="dropdown">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Note
</button>
                <div id="myselect" class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    <option style={{ color: "green" }} class="dropdown-item" onClick={this.selectGrade} value={1.0}>1.0</option>
                    <option style={{ color: "green" }} class="dropdown-item" onClick={this.selectGrade} value={1.3}>1.3</option>
                    <option style={{ color: "green" }} class="dropdown-item" onClick={this.selectGrade} value={1.7}>1.7</option>
                    <option style={{ color: "blue" }} class="dropdown-item" onClick={this.selectGrade} value={2.0}>2.0</option>
                    <option style={{ color: "blue" }} class="dropdown-item" onClick={this.selectGrade} value={2.3}>2.3</option>
                    <option style={{ color: "blue" }} class="dropdown-item" onClick={this.selectGrade} value={2.7}>2.7</option>
                    <option style={{ color: "orange" }} class="dropdown-item " onClick={this.selectGrade} value={3.0}>3.0</option>
                    <option style={{ color: "orange" }} class="dropdown-item" onClick={this.selectGrade} value={3.3}>3.3</option>
                    <option style={{ color: "orange" }} class="dropdown-item" onClick={this.selectGrade} value={3.7}>3.7</option>
                    <option style={{ color: "orange" }} class="dropdown-item" onClick={this.selectGrade} value={4.0}>4.0</option>
                    <option style={{ color: "red" }} class="dropdown-item" onClick={this.selectGrade} value={4.3}>4.3</option>
                    <option style={{ color: "red" }} class="dropdown-item" onClick={this.selectGrade} value={4.7}>4.7</option>
                    <option style={{ color: "red" }} class="dropdown-item" onClick={this.selectGrade} value={5.0}>5.0</option>

                </div>
            </div>




        let dropdown =
            <div class="dropdown">
                <button class="btn btn-secondary btn-sm dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Präsenz
</button>
                <div id="myselect" class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    {(!(this.state.fieldStatus === 'EDIT' && this.state.oldPresence)) && <option class="dropdown-item" onClick={this.present} value={true}>Anwesend</option>}
                    {(!(this.state.fieldStatus === 'EDIT' && !this.state.oldPresence)) && <option class="dropdown-item" onClick={this.notPresent} value={false}>nicht Anwesend</option>}

                </div>
            </div>

        let label = null
        if (this.state.present) {
            label = <p style={{ color: 'green' }} className="text-monospace" >Anwesend</p>
        } else {
            label = <p style={{ color: 'red' }} className="text-monospace">nicht anwesend</p>
        }

        // initially just display that no presence is set
        let initialCreateLabel = <p className="text-monospace" >Bitte eintragen</p>



        return (
            <th>
                {/* {this.props.studentId}
                {this.props.appointmentId} */}
                {this.state.apiMessage !== '' && <div class="alert alert-info" role="alert">
                    <strong>{this.state.apiMessage}</strong>
                </div>}
                {!this.state.existsGrade && dropdown}
                {this.state.fieldStatus === 'CREATE' && (!this.state.changed) && initialCreateLabel}
                {(!(this.state.fieldStatus === 'CREATE' && (!this.state.changed))) && label}

                { this.state.fieldStatus === 'CREATE' && <button disabled={!this.state.changed} onClick={this.submitCreatePresence} type="button" class="btn btn-primary btn-sm">Speichern</button>}
                { this.state.fieldStatus === 'EDIT' && <button disabled={!this.state.changed} onClick={this.submitEditPresence} type="button" class="btn btn-primary btn-sm">Speichern</button>}

                { this.state.fieldStatus === 'EDIT' && <button onClick={this.dismissEdit} disabled={!this.state.changed} type="button" class="btn btn-danger btn-sm">x</button>}
                <p></p>
                {this.state.present && this.state.fieldStatus === 'EDIT' && this.state.appointmentType === 'EXAM' && !this.state.existsGrade && grade}

                { this.state.present && this.state.fieldStatus === 'EDIT' && this.state.appointmentType === 'EXAM' && <p>Ergebnis : {this.state.grade}</p>}
                {this.state.present && this.state.fieldStatus === 'EDIT' && this.state.appointmentType === 'EXAM' && this.state.oldPresence && <button disabled={this.state.existsGrade || this.state.grade === ''} onClick={this.submitGrade} type="button" class="btn btn-primary btn-sm btn-block">Note speichern</button>}
                { this.state.present && this.state.fieldStatus === 'EDIT' && this.state.appointmentType === 'EXAM' && <button disabled={!this.state.existsGrade} onClick={this.deleteGrade} type="button" class="btn btn-danger btn-sm btn-block">Note löschen</button>}




            </th>
        )
    }
}

export default Presence