import React, { Component } from 'react';
import SickNoteDataService from '../../api/SickNoteDataService.js';
import SickNote from '../UserBuilder/SickNote.js'


class SickNotesAdministration extends Component{

    state={
        unapprovedTeacherNotes : [], unapprovedStudentNotes : [], approvedTeacherNotes : [] , approvedStudentNotes : []

    }

    componentDidMount(){
        this.populateTeacherNotes();
        this.populateStudentNotes();
    }

    populateTeacherNotes=()=>{

        //get unapproved teacher notes 
        SickNoteDataService.getUnapprovedNotesByRole('TEACHER')
        .then(response => {
            this.setState({unapprovedTeacherNotes : response.data})
        }).catch(error => { console.log(error)})

        //get unapproved teacher notes
        SickNoteDataService.getApprovedNotesByRole('TEACHER')
        .then(response => {
            this.setState({approvedTeacherNotes : response.data})
        }).catch(error => { console.log(error)})

    }

    populateStudentNotes=()=>{
        //get unapproved student notes 
        SickNoteDataService.getUnapprovedNotesByRole('STUDENT')
        .then(response => {
            this.setState({unapprovedStudentNotes : response.data})
        }).catch(error => { console.log(error)})

        //get unapproved student notes
        SickNoteDataService.getApprovedNotesByRole('STUDENT')
        .then(response => {
            this.setState({approvedStudentNotes : response.data})
        }).catch(error => { console.log(error)})
    }

    approveStudentNote=(index, noteId)=>{

        SickNoteDataService.approveSickNoteById(noteId)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })
        let targetNote = this.state.unapprovedStudentNotes[index]
        targetNote.approved=true
        let approvedStudentNotes = this.state.approvedStudentNotes
        let unapprovedStudentNotes = this.state.unapprovedStudentNotes
        approvedStudentNotes.unshift(targetNote)
        unapprovedStudentNotes.splice(index,1)
        this.setState({approvedStudentNotes : approvedStudentNotes, unapprovedStudentNotes : unapprovedStudentNotes})


    }

    approveTeacherNote=(index, noteId)=>{
        SickNoteDataService.approveSickNoteById(noteId)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })

        let targetNote = this.state.unapprovedTeacherNotes[index]
        targetNote.approved = true
        let approvedTeacherNotes = this.state.approvedTeacherNotes
        let unapprovedTeacherNotes = this.state.unapprovedTeacherNotes

        approvedTeacherNotes.unshift(targetNote)
        unapprovedTeacherNotes.splice(index,1)
        this.setState({approveTeacherNotes : approvedTeacherNotes, unapprovedTeacherNotes : unapprovedTeacherNotes})


    }

    unapproveStudentNote=(index, noteId)=>{

        SickNoteDataService.disapproveSickNoteById(noteId)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })

        let targetNote = this.state.approvedStudentNotes[index]
        targetNote.approved = false
        let unapprovedStudentNotes = this.state.unapprovedStudentNotes
        let approvedStudentNotes = this.state.approvedStudentNotes
        unapprovedStudentNotes.unshift(targetNote)
        approvedStudentNotes.splice(index,1)
        this.setState({approvedStudentNotes : approvedStudentNotes, unapprovedStudentNotes : unapprovedStudentNotes})
    }
    
    unapproveTeacherNote=(index, noteId)=>{
        SickNoteDataService.disapproveSickNoteById(noteId)
        .then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error)
        })

        let targetNote = this.state.approvedTeacherNotes[index]
        targetNote.approved = false
        let unapprovedTeacherNotes = this.state.unapprovedTeacherNotes
        let approvedTeacherNotes = this.state.approvedTeacherNotes
        unapprovedTeacherNotes.unshift(targetNote)
        approvedTeacherNotes.splice(index,1)
        this.setState({approveTeacherNotes : approvedTeacherNotes, unapprovedTeacherNotes : unapprovedTeacherNotes})
    }

    deleteNote=(index, noteId, approved, role)=>{
        SickNoteDataService.deleteSickNoteById(noteId)
        .then(response =>{console.log(response.data)}).catch(error => {console.log(error)})
        if(role === 'STUDENT') {
            if(approved) {
                let targetArray = this.state.approvedStudentNotes
                targetArray.splice(index,1)
                this.setState({approvedStudentNotes : targetArray})
            } else {
                let targetArray = this.state.unapprovedStudentNotes
                targetArray.splice(index,1)
                this.setState({unapprovedStudentNotes : targetArray})
            }
        } else if(role === 'TEACHER') {
            if(approved) {
                let targetArray = this.state.approvedTeacherNotes
                targetArray.splice(index,1)
                this.setState({approvedTeacherNotes : targetArray})
            } else {
                let targetArray = this.state.unapprovedTeacherNotes
                targetArray.splice(index,1)
                this.setState({unapprovedTeacherNotes : targetArray})
            }
        }
    }

    render() {

        let unapprovedStudentNotes = ''; let approvedStudentNotes = ''
        let unapprovedTeacherNotes = ''; let approvedTeacherNotes = ''

        //Render unapproved student notes
        if(this.state.unapprovedStudentNotes.length > 0) {
            unapprovedStudentNotes = this.state.unapprovedStudentNotes.map((note, index) => {
                return (
                    <SickNote
                    key={note.id}
                    noteId={note.id}
                    userId={note.userId}
                    firstName={note.firstName}
                    lastName={note.lastName}
                    role={note.role}
                    approved={note.approved}
                    cause={note.cause}
                    comment={note.comment}

                    creationDate={note.creationDate}
                    startDate={note.startDate}
                    endDate={note.endDate}
                    approveNote={()=>this.approveStudentNote(index,note.id)}

                    deleteNote={()=> this.deleteNote(index,note.id, note.approved, note.role)}


                    />
                )
            })
        }

        // render approved students notes 
        if(this.state.approvedStudentNotes.length > 0) {
            approvedStudentNotes = this.state.approvedStudentNotes.map((note, index) => {
                return (
                    <SickNote
                    key={note.id}
                    noteId={note.id}
                    userId={note.userId}
                    firstName={note.firstName}
                    lastName={note.lastName}
                    role={note.role}
                    cause={note.cause}
                    comment={note.comment}
                    approved={note.approved}
                    creationDate={note.creationDate}
                    startDate={note.startDate}
                    endDate={note.endDate}
                    unapproveNote={()=>this.unapproveStudentNote(index,note.id)}

                    deleteNote={()=> this.deleteNote(index,note.id, note.approved, note.role)}


                    />
                )
            })
        }

        // render unapproved Teachers notes 
        if(this.state.unapprovedTeacherNotes.length > 0) {
            unapprovedTeacherNotes = this.state.unapprovedTeacherNotes.map((note, index) => {
                return (
                    <SickNote
                    key={note.id}
                    noteId={note.id}
                    userId={note.userId}
                    firstName={note.firstName}
                    lastName={note.lastName}
                    role={note.role}
                    approved={note.approved}
                    cause={note.cause}
                    comment={note.comment}

                    creationDate={note.creationDate}
                    startDate={note.startDate}
                    endDate={note.endDate}
                    approveNote={()=>this.approveTeacherNote(index,note.id)}

                    deleteNote={()=> this.deleteNote(index,note.id, note.approved, note.role)}



                    />
                    

                )
            })
        }
        // render approved Teachers notes 
        if(this.state.approvedTeacherNotes.length > 0) {
            approvedTeacherNotes = this.state.approvedTeacherNotes.map((note, index) => {
                return (
                    <SickNote
                    key={note.id}
                    noteId={note.id}
                    userId={note.userId}
                    role={note.role}
                    firstName={note.firstName}
                    lastName={note.lastName}
                    approved={note.approved}
                    cause={note.cause}
                    comment={note.comment}

                    creationDate={note.creationDate}
                    startDate={note.startDate}
                    endDate={note.endDate}
                    unapproveNote={()=>this.unapproveTeacherNote(index,note.id)}

                    deleteNote={()=> this.deleteNote(index,note.id, note.approved, note.role)}


                    />
                )
            })
        }

        

        return (

            <div class="card-group">
  
  <div class=" alert-warning card ">
    <div class="card-body">
      <h4 class="card-title">Schüler</h4>
      <p class="card-text">Hier Können Sie Krankmeldungen von Schülern verwalten.</p>

      <div class="  card-body ">
          {unapprovedStudentNotes}

      </div>

      <div class="  card-body ">

     {approvedStudentNotes}

      </div>
      
    </div>
  </div>

  
  <div class=" alert-info card ">
    <div class="card-body">
      <h4 class="card-title">Lehrende</h4>
      <p class="card-text">Hier Können Sie Krankmeldungen von Lehrenden verwalten.</p>

      <div class="  card-body ">
     {unapprovedTeacherNotes}
      </div>

      <div class="  card-body ">

      {approvedTeacherNotes}

      </div>
      
    </div>
  </div>

</div>
        )
    }
}

export default SickNotesAdministration