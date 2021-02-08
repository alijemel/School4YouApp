import { extend } from 'jquery'
import React, { Component } from 'react'
import ExamDataService from '../../api/ExamDataService'
import Exam from './Exam'
import ExamForm from './ExamForm'

class Exams extends Component {

    state = {
        currentTeacherId: 0,
        exams: [],
        classId: 0,
        showForm: false,
        existingExamDates: [],
        action: 'Erstellen',
        editing: false,
        editingId: 0,
        editingIndex: 0,
        updated: false,
        serverFeedback: '',
        toEdit: {
            date: '',
            slot: '',
            subject: '',
            coefficient: '',
            description: ''

        }

    }

    componentDidMount() {
        this.setState({ classId: this.props.classId, currentTeacherId: sessionStorage.getItem('id') })
        //**** fetch all existing exams of this class */
        ExamDataService.getClassExams(this.props.classId)
            .then(response => {
                console.log(response.data)
                this.setState({ exams: response.data })

            }).catch(error => {
                console.log(error.response.data)
            })

        //*** populate the existingExamDates array : contains (1) dates of exams of this class 
        //(2) dates of exams that the actual teacher has in other classes */
        ExamDataService.getUnavailableDatesByTeacherIdAndClassId(sessionStorage.getItem('id'), this.props.classId)
            .then(response => {
                this.setState({ existingExamDates: response.data })
                console.log(response.data)
            }).catch(error => {
                console.log(error.response.data)
            })

    }

    componentDidUpdate() {
        if (this.state.updated) {
            this.setState({ updated: false, toEdit: {
                date: '',
                slot: '',
                subject: '',
                coefficient: '',
                description: ''
    
            } })
            ExamDataService.getClassExams(this.props.classId)
                .then(response => {
                    console.log(response.data)
                    this.setState({ exams: response.data })

                }).catch(error => {
                    console.log(error.response.data)
                })

            //*** populate the existingExamDates array : contains (1) dates of exams of this class 
            //(2) dates of exams that the actual teacher has in other classes */
            ExamDataService.getUnavailableDatesByTeacherIdAndClassId(sessionStorage.getItem('id'), this.props.classId)
                .then(response => {
                    this.setState({ existingExamDates: response.data })
                    console.log(response.data)
                }).catch(error => {
                    console.log(error.response.data)
                })

        }

    }

    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm })
    }

    submitClicked = () => {
        this.setState({ updated: true })
        this.toggleForm()


    }

    feedback = (feedback) => {
        this.setState({ serverFeedback: feedback })

    }

    createClicked = () => {
        this.toggleForm()
        this.setState({ action: 'Erstellen' })
    }

    editClicked = (exam) => {
        this.setState({ showForm: true, action: 'Ändern', toEdit: exam })

        this.scrollToTop()
    }

    bewertenClicked = () => {
        // this.props.history.push(`/Anwesenheiten/Termin/${examId}`)
    }

    deleteClicked = (examId) => {
        ExamDataService.deleteExam(examId)
            .then(response => {
                this.feedback(response.data.message)
                this.setState({ updated: true })

            }).catch(error => { console.log(error.response.data) })

    }

    dismiss = () => {
        this.toggleForm()
        this.setState({ action: 'Erstellen', toEdit: {
            date: '',
            slot: '',
            subject: '',
            coefficient: '',
            description: ''

        } })
    }

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }





    render() {
        let exams =
            this.state.exams.map((exam, index) => {
                return (
                    <Exam key={index}
                        editClicked={() => this.editClicked(exam)}
                        bewertenClicked={this.bewertenClicked}
                        deleteClicked={() => this.deleteClicked(exam.id)}
                        examId={exam.id}
                        date={exam.date}
                        time={exam.slot}
                        subject={exam.subject}
                        coefficient={exam.coefficient}
                        description={exam.description}
                        day={exam.dayOfWeek}
                        teacherName={exam.teacherName}
                        teacherId={exam.teacherId}
                        classId={exam.classId}

                    />
                )
            })



        return (
            <div>
                <h3>Prüfungen</h3>
                <h6 style={{ color: "red" }} class="card-subtitle mb-2 ">{this.state.serverFeedback}</h6>
                {this.state.action !== 'Ändern' && sessionStorage.getItem('role').toLocaleUpperCase() === 'TEACHER'&& <div><button onClick={this.createClicked} type="button" class="btn btn-dark btn-sm btn-block">Erstellen +</button></div>}


                {

                    this.state.showForm &&
                    <ExamForm
                        existingExamDates={this.state.existingExamDates}
                        action={this.state.action}
                        toEdit={this.state.toEdit}
                        classId={this.props.classId}
                        teacherId={this.state.currentTeacherId}
                        submitClicked={this.submitClicked}
                        feedback={this.feedback}
                        dismiss={this.dismiss}
                    />

                }
                {exams}




            </div>
        )
    }
}

export default Exams