import React, { Component } from 'react';
import AppointmentDataService from '../../api/AppointmentDataService';

class PlanerControl3 extends Component {

    state = {
        sunday : false,
        type : '' ,
        appointmentQueryData: {

        },
        fieldStatus: 'FETCHING',
        createdSubject: 'Frei',
        createdTeacher : {id : '', name : ''},

        toEdit: {
            id: 0,
            subject: '',
            teacherId: 0
        },
        oldSubject: '',
        newSubject: '',
        oldTeacherId: '',
        newTeacherId: '',
        oldTeacherName : '',
        newTeacherName : '',
        subjectEdited: false,
        teacherEdited : false,
        apiResponse: '',
        weeks : 1,

        availableTeachers: [],

        disabeledCreate : false


    }

    componentDidMount() {
        if(!this.props.dayName) {
            this.setState({sunday : true})
        } else {
            let appointmentQueryData = {
                classId: this.props.classId,
                date: this.props.date,
                slot: this.props.slot
            }
            this.setState({ appointmentQueryData: appointmentQueryData })
            this.checkFieldStatus(this.props.classId, this.props.date, this.props.slot)

        }
        

    }

    //CHECK IF FIELD status
    checkFieldStatus = (classId, date, slot) => {
        AppointmentDataService.checkFieldStatusClassPerspective(classId, date, slot)
            .then(response => {
                this.setState({ fieldStatus: response.data })
                if (response.data !== 'UNAVAILABLE') {
                    AppointmentDataService.getAvailableTeachers(classId, date, slot)
                        .then(response => {
                            
                            this.setState({ availableTeachers: response.data })
                        }).catch(error => {
                            console.log(error.response.data)
                        })
                }
                //WHEN THE STATUS IS EDIT I INITIALISE THE TO EDIT OBJECT IN THE STATE
                if (response.data === 'EDIT') {
                    AppointmentDataService.getAppointmentByClassIdANndDateAndSlot(classId, date, slot)
                        .then(response => {
                            if(response.data.type === 'EXAM') {
                                this.setState({fieldStatus : 'EXAM'})
                            } else {
                                let toEdit = {
                                    id: response.data.id,
                                    subject: response.data.subject,
                                    teacherId: response.data.teacherId
                                }
                                this.setState({
                                    toEdit: toEdit,
                                    oldSubject: response.data.subject,
                                    oldTeacherId: response.data.teacherId,
                                    oldTeacherName : response.data.teacherName
                                })
                            }

                            }
                            )
                        .catch(error => {
                            console.log(error.response.data)
                        })
                }
                //*************** */
            }).catch(error => {
                console.log(error.response.data)
            })
    }
    //********************** */

    //When subject selected in case fiels is CREATE state
    selectSubjectCreate = (event) => {

        this.setState({ createdSubject: event.target.value })

    }
    selectTeacherCreate =(event,teacherId)=> {
        this.setState({createdTeacher : {
            id : teacherId, name : event.target.value
        }})

    }
    //************* */

    //When we select subject to edit it ( when field status is EDIT) 
    selectSubjectEdit = (event) => {
        if(event.target.value !== this.state.oldSubject ) {
            this.setState({
                subjectEdited: true,
                newSubject: event.target.value
            })
        } else {
            this.setState({
                subjectEdited: false,
                newSubject: this.state.oldSubject
            })

        }
        
        console.log(event.target.value)
    }

    selectTeacherEdit =(event, teacherId)=> {
        console.log(teacherId)
        console.log(this.state.oldTeacherId)
        if(teacherId !== this.state.oldTeacherId) {
            this.setState({
                teacherEdited : true,
                newTeacherId : teacherId,
                newTeacherName : event.target.value
            })
        } else {
            this.setState({
                teacherEdited : false,
                newTeacherId : this.state.oldTeacherId,
                newTeacherName : this.state.oldTeacherName
            })

        }
        
        

    }
    //************************* */

    //Submitting the creation
    submitCreate = () => {
        this.setState({disabeledCreate : true})
        if (this.state.fieldStatus === 'CREATE' && (this.state.createdSubject !== '')) {
            let newAppointment = {
                classId: this.props.classId,
                teacherId: this.state.createdTeacher.id,
                date: this.props.date,
                slot: this.props.slot,
                subject: this.state.createdSubject.toLocaleUpperCase()
            }

            console.log(this.state.weeks)
           
            AppointmentDataService.createAppointment(newAppointment, this.state.weeks)
            .then(response => {
                this.setState({
                    fieldStatus: 'EDIT',
                    createdSubject: '',
                    createdTeacher : {
                        id : '', name : ''
                    },
                    toEdit: {
                        id: response.data.id,
                        subject: response.data.subject,
                        teacherId : response.data.teacherId
                    },
                    edited: false,
                    oldSubject: response.data.subject,
                    newSubject: '',
                    oldTeacherId : response.data.teacherId,
                    newTeacherId : '',
                    oldTeacherName : response.data.teacherName

                })

            }).catch(error => {
                console.log(error.response.data)
            })
               
        }

    }
    //************************ */

    //Submit after changing subject 
    submitEdit = () => {
        if (this.state.fieldStatus === 'EDIT' && (this.state.subjectEdited || this.state.teacherEdited) && ((this.state.newSubject !== this.state.oldSubject) || this.state.newTeacherId !== this.state.oldTeacherId)) {
            
            if(this.state.subjectEdited && this.state.teacherEdited) {
                AppointmentDataService.editRecurrentAppointment(this.state.toEdit.id, this.state.newTeacherId,this.state.newTeacherName, this.state.newSubject)
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        toEdit: {
                            id: response.data.id,
                            subject: response.data.subject
                        },
                        subjectEdited: false,
                        teacherEdited : false,
                        oldSubject: response.data.subject,
                        newSubject: '',
                        oldTeacherId : response.data.teacherId,
                        newTeacherId : '',
                        oldTeacherName : response.data.teacherName,
                        newTeacherName : ''

                    })
                }).catch(error => {
                    console.log(error.response.data)
                })
            } else if(this.state.subjectEdited && !this.state.teacherEdited) {
                AppointmentDataService.editRecurrentAppointment(this.state.toEdit.id, this.state.oldTeacherId,this.state.oldTeacherName, this.state.newSubject)
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        toEdit: {
                            id: response.data.id,
                            subject: response.data.subject
                        },
                        subjectEdited: false,
                        teacherEdited : false,
                        oldSubject: response.data.subject,
                        newSubject: '',
                        oldTeacherId : response.data.teacherId,
                        newTeacherId : '',
                        oldTeacherName : response.data.teacherName,
                        newTeacherName : ''

                    })
                }).catch(error => {
                    console.log(error.response.data)
                })
            } else if(this.state.teacherEdited && !this.state.subjectEdited) {
                AppointmentDataService.editRecurrentAppointment(this.state.toEdit.id, this.state.newTeacherId,this.state.newTeacherName, this.state.oldSubject)
                .then(response => {
                    console.log(response.data)
                    this.setState({
                        toEdit: {
                            id: response.data.id,
                            subject: response.data.subject
                        },
                        subjectEdited: false,
                        teacherEdited : false,
                        oldSubject: response.data.subject,
                        newSubject: '',
                        oldTeacherId : response.data.teacherId,
                        newTeacherId : '',
                        oldTeacherName : response.data.teacherName,
                        newTeacherName : ''

                    })
                }).catch(error => {
                    console.log(error.response.data)
                })
            }
            
        }



    }

    //****************** */
    dismissCreate = () => {
        this.setState({ createdSubject: 'Frei', disabeledCreate : false,
        createdTeacher : {
            id : '',
            name : ''
        }

     })
    }

    //When on EDIT mode and we click on delete 
    deleteAppointment = () => {
        AppointmentDataService.deleteAppointment(this.state.toEdit.id)
            .then(response => {
                console.log(response.data)
                this.setState({
                    disabeledCreate : false,
                    apiResponse: response.data, fieldStatus: 'CREATE', createdSubject: 'Frei', toEdit: { id: '0', subject: '', teacherId :0 }, oldSubject: '',
                    newSubject: '', oldTeacherId : '', newTeacherId : '', oldTeacherName : '', newTeacherName : '',
                    subjectEdited: false, teacherEdited : false
                })
            }).catch(error => {
                console.log(error.response.data)
            })

    }

    selectRecurrence =(event)=> {
        this.setState({ weeks : event.target.value})
        console.log(event.target.value)
    }

         

    

    render() {


       let showSaveOnEdit = ((this.state.subjectEdited && this.state.teacherEdited) || (this.state.subjectEdited && !this.state.teacherEdited) || (this.state.teacherEdited && !this.state.subjectEdited))

    
        let frei = ''
        if (this.state.fieldStatus === 'CREATE' && this.state.createdSubject === 'Frei') {
            frei = "text-muted"
        }

        //Falls selected termin by id classid slot and date not exist and doesn t exist in an other class
        //CREATE 

        let create =
            <div className="alert alert-success">
                 <div className="dropdown">
                <button class="m-2 btn btn-sm btn-block btn-dark dropdown-toggle " fieldStatus="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    verfügbare Lehrende
                    </button>
                    <div id="myselect" class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    {
                        this.state.availableTeachers.map((teacher, index) => {
                            return (
                            <option key={teacher.id}
                            onClick={(event) => this.selectTeacherCreate(event, teacher.id)}
                             className="dropdown-item" value={`${teacher.firstName} ${teacher.lastName}`}>{teacher.firstName} {teacher.lastName}</option>
                            )
                        })
                    }

                    </div>
            </div>

            <div class="dropdown">
                    <button class="m-2 btn btn-sm btn-block btn-warning dropdown-toggle" fieldStatus="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Wochen
</button>
                    <div id="myselect" class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <option class="dropdown-item" onClick={this.selectRecurrence} value="1">1.Termin</option>
                        <option class="dropdown-item" onClick={this.selectRecurrence} value="4">4 Wochen</option>
                        <option class="dropdown-item" onClick={this.selectRecurrence} value="8">8 Wochen</option>
                        <option class="dropdown-item" onClick={this.selectRecurrence} value="12">12 Wochen</option>
                        <option class="dropdown-item" onClick={this.selectRecurrence} value="24">Halbes Jahr</option>
                    </div>
                </div>
                

                <div class="dropdown">
                    <button class="m-2 btn btn-sm btn-block btn-info dropdown-toggle" fieldStatus="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Fach Auswahl
</button>
                    <div id="myselect" class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <option class="dropdown-item" onClick={this.selectSubjectCreate} value="MATHEMATIK">Mathematik</option>
                        <option class="dropdown-item" onClick={this.selectSubjectCreate} value="CHEMIE">Chemie</option>
                        <option class="dropdown-item" onClick={this.selectSubjectCreate} value="PHYSIK">Physik</option>
                    </div>
                </div>
                {<p className={frei}>{this.state.createdSubject}</p>} 
                <p>{this.state.createdTeacher.name}</p>
                {this.state.weeks > 1 && <p>{this.state.weeks} Wochen</p>}
                {this.state.weeks <=1 && <p>{this.state.weeks} Woche</p>}

                {(this.state.createdSubject !== 'Frei' || this.state.createdTeacher.name !=='') && <span onClick={this.dismissCreate} class="badge badge-dark">x</span>}
                {this.state.fieldStatus === 'CREATE' && this.state.createdSubject !== 'Frei' && this.state.createdTeacher.id !=='' && this.state.createdTeacher.name !=='' && <button disabled={this.state.disabeledCreate} onClick={this.submitCreate} className="m-2 btn btn-sm btn-block btn-success">speichern</button>}

            </div>
        // ******************************

        //Edit of i find a course with user id class id slot date and not in another class

        let edit =
            <div className="alert alert-info">
                <div className="dropdown">
                <button 
                class="btn btn-sm btn-block btn-dark dropdown-toggle" fieldStatus="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    verfügbare Lehrende
        </button>
                    <div id="myselect" class="dropdown-menu" aria-labelledby="dropdownMenu1">
                    {
                        this.state.availableTeachers.map((teacher, index) => {
                            return (
                            <option key={teacher.id}
                            onClick={(event) => this.selectTeacherEdit(event, teacher.id)}
                             className="dropdown-item" value={`${teacher.firstName} ${teacher.lastName}`}>{teacher.firstName} {teacher.lastName}</option>
                            )
                        })
                    }

                    </div>
            </div>
            <p>{this.state.teacherEdited && this.state.newTeacherName}</p>
            <p>{!this.state.teacherEdited && this.state.oldTeacherName}</p>

                <div class="dropdown">
                    <button class="m-2 btn btn-sm btn-block btn-info dropdown-toggle" fieldStatus="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Fach Ändern
</button>
                    <div id="myselect" class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <option class="dropdown-item" onClick={this.selectSubjectEdit} value="MATHEMATIK">Mathematik</option>
                        <option class="dropdown-item" onClick={this.selectSubjectEdit} value="CHEMIE">Chemie</option>
                        <option class="dropdown-item" onClick={this.selectSubjectEdit} value="PHYSIK">Physik</option>
                    </div>
                </div>
                <p>{this.state.subjectEdited && this.state.newSubject}</p>
                <p>{!this.state.subjectEdited && this.state.oldSubject}</p>

                <span onClick={this.deleteAppointment} class="badge badge-danger">x</span>
                {showSaveOnEdit && this.state.fieldStatus === 'EDIT' && <button onClick={this.submitEdit} class="m-2 btn btn-sm btn-block btn-success">Änderungen speichern</button>}


            </div>
        //****************************** */

        //Disabeled falls slot and date unavailable (Used in another class for this teacherId)

        let disabeled =
            <div className="alert alert-danger">
                <span class="badge badge-danger">Keine verfügbare Lehrer</span>
            </div>

        /************************************* */

        let exam = 
        <div className="alert alert-danger">
                <span class="badge badge-danger">prüfung geplant</span>
            </div>

        return (

            <th scope="row">
                
                {this.state.fieldStatus === 'CREATE' && create}
                {this.state.fieldStatus === 'EDIT' && edit}
                {this.state.fieldStatus === 'UNAVAILABLE' && disabeled}
                {this.state.fieldStatus === 'EXAM' && exam}
                {this.state.sunday && <span class="badge badge-secondary">Schule geschlossen</span>
}
            </th>
        )
    }
}

export default PlanerControl3