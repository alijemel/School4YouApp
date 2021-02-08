import { replace } from 'formik';
import React, { Component } from 'react';
import AppointmentDataService from '../../api/AppointmentDataService';

class PlanerControl2 extends Component {

    state = {
        appointmentQueryData : {

        },
        fieldStatus: 'FETCHING',
        createdSubject : 'Frei',
        toEdit : {
            id : 0,
            subject : ''
        },
        oldSubject : '',
        newSubject : '',
        edited : false, 
        apiResponse : '',
        disabeledCreate : false

    }

    componentDidMount() {
        let appointmentQueryData = {
            classId : this.props.classId,
            teacherId : this.props.teacherId,
            date : this.props.date,
            slot : this.props.slot
        }
        this.setState({appointmentQueryData : appointmentQueryData})
        this.checkFieldStatus(appointmentQueryData)
        
    }

    //CHECK IF FIELD status
    checkFieldStatus =(appointmentQueryData)=> {
        AppointmentDataService.checkFieldStatus(appointmentQueryData)
        .then(response => {
            console.log(response.data)
            this.setState({ fieldStatus : response.data })
                     //WHEN THE STATUS IS EDIT I INITIALISE THE TO EDIT OBJECT IN THE STATE
        if(response.data === 'EDIT') {
            AppointmentDataService.getAppointmentByClassIdAndTeaxherIdAndDateAndSlot(appointmentQueryData)
            .then(response => {
                let toEdit = {
                    id : response.data.id,
                    subject : response.data.subject
                }
                this.setState({toEdit : toEdit,
                    oldSubject : response.data.subject
                })
                console.log(toEdit)
            })
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
    //************* */

    //When we select subject to edit it ( when field status is EDIT) 
    selectSubjectEdit=(event)=> {
        this.setState({
            edited : true,
            newSubject : event.target.value
        })
    }
    //************************* */

    //Submitting the creation
    submitCreate = () => {
        this.setState({disabeledCreate : true})
        if(this.state.fieldStatus === 'CREATE' && (this.state.createdSubject !== '')) {
            let newAppointment = {
                classId : this.props.classId,
                teacherId : this.props.teacherId,
                date : this.props.date,
                slot : this.props.slot,
                subject : this.state.createdSubject.toLocaleUpperCase()
            }
            AppointmentDataService.createAppointment(newAppointment,1)
            .then(response => {
                this.setState({
                    fieldStatus : 'EDIT',
                    createdSubject : '',
                    toEdit : {
                        id : response.data.id,
                        subject : response.data.subject
                    },
                    edited : false,
                    oldSubject : response.data.subject,
                    newSubject : ''
                })
                
            }).catch(error => {
                console.log(error.response.data)
            })
        }
        
    } 
    //************************ */

    //Submit after changing subject 
    submitEdit=()=> {
        if(this.state.fieldStatus === 'EDIT' && this.state.edited && (this.state.newSubject !== this.state.oldSubject)) {
            
            AppointmentDataService.editAppointment(this.state.toEdit.id, this.state.newSubject)
            .then(response => {
                this.setState({
                    toEdit : {
                        id : response.data.id,
                        subject : response.data.subject
                    },
                    edited : false,
                    oldSubject : response.data.subject,
                    newSubject : ''
                })
            }).catch(error => {
                console.log(error.response.data)
            })
        }



    }

    //****************** */
    dismissCreate=()=> {
        this.setState({createdSubject : 'Frei', disabeledCreate: false})
    }

    //When on EDIT mode and we click on delete 
    deleteAppointment=()=> {
        AppointmentDataService.deleteAppointment(this.state.toEdit.id)
        .then(response => {
            this.setState({
                apiResponse : response.data, fieldStatus : 'CREATE', createdSubject :'Frei', toEdit : {id : '0', subject : ''}, oldSubject : '',
                newSubject : '',
                edited : false, disabeledCreate : false
            })
        }).catch(error => {
            console.log(error.response.data)
        })

    }



    render() {

        let frei = ''
        if(this.state.fieldStatus ==='CREATE' && this.state.createdSubject === 'Frei' ) {
            frei ="text-muted"
        }

        //Falls selected termin by id classid slot and date not exist and doesn t exist in an other class
        //CREATE 

        let create =
            <div>
                
                <div class="dropdown">
                    <button class="btn btn-secondary dropdown-toggle" fieldStatus="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Fach
</button>
                    <div id="myselect" class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <option class="dropdown-item" onClick={this.selectSubjectCreate} value="MATHEMATIK">Mathematik</option>
                        <option class="dropdown-item" onClick={this.selectSubjectCreate} value="CHEMIE">Chemie</option>
                        <option class="dropdown-item" onClick={this.selectSubjectCreate} value="PHYSIK">Physik</option>
                    </div>
                </div>
                {<p className={frei}>{this.state.createdSubject}</p>} {this.state.createdSubject !== 'Frei' && <span onClick={this.dismissCreate} class="badge badge-dark">x</span>}
                {this.state.fieldStatus === 'CREATE' && this.state.createdSubject !== 'Frei' && <button disabled={this.state.disabeledCreate} onClick={this.submitCreate} className="btn btn-sm btn-primary">speichern</button>}

            </div>
        // ******************************

        //Edit of i find a course with user id class id slot date and not in another class

        let edit =
            <div>
                <div class="dropdown">
                    <button class="btn btn-info dropdown-toggle" fieldStatus="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Ändern
</button>
                    <div id="myselect" class="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <option class="dropdown-item" onClick={this.selectSubjectEdit} value="MATHEMATIK">Mathematik</option>
                        <option class="dropdown-item" onClick={this.selectSubjectEdit} value="CHEMIE">Chemie</option>
                        <option class="dropdown-item" onClick={this.selectSubjectEdit} value="PHYSIK">Physik</option>
                    </div>
                </div>
                <p>{this.state.edited && this.state.newSubject}</p>
                <p>{! this.state.edited && this.state.oldSubject}</p>

                <span onClick={this.deleteAppointment} class="badge badge-danger">x</span>
                {this.state.fieldStatus === 'EDIT' && this.state.edited && (this.state.newSubject !== this.state.oldSubject) && <span onClick={this.submitEdit} class="badge badge-success">speichern</span>}


            </div>
        //****************************** */

        //Disabeled falls slot and date unavailable (Used in another class for this teacherId)

        let disabeled =
            <div>
                <span class="badge badge-danger">Nicht verfügbar</span>
            </div>

            /************************************* */

        return (

            <th scope="row">
                {this.state.fieldStatus === 'CREATE' && create}
                {this.state.fieldStatus === 'EDIT' && edit}
                {this.state.fieldStatus === 'UNAVAILABLE' && disabeled}
            </th>
        )
    }
}

export default PlanerControl2