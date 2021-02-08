import React, { Component } from 'react';
import SickNote from '../UserBuilder/SickNote.js'
import SickNoteDataService from '../../api/SickNoteDataService.js';


class SickNotesNotifications extends Component{

    state={
        sickNotes : [],
        serverResponded : false
    }

    componentDidMount() {
        console.log(this.props.classId, this.props.role)
        SickNoteDataService.getAllSickNotesByClassAndRole(this.props.classId, this.props.role)
        .then(response => {
            console.log(response.data)
            this.setState({sickNotes : response.data, serverResponded :true})
        }).catch(error => {
            console.log(error)
        })
    }

    
    render() {
        let sickNotes = 
        <div className="row col-md-3 mx-auto spinner-grow" role="status">
        <span className="sr-only">Wir geladen...</span>
      </div>
      if (this.state.serverResponded) {
        if(this.state.sickNotes.length > 0) {
            sickNotes = this.state.sickNotes.map((note, index) => {
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
                    />
                )
            })
        } else {
            sickNotes = <p className="row col-md-3 mx-auto text-monospace">Keine aktuelle Krankmeldungen </p>
        }
          
      }
        
        

        return (
            <div  class="d-flex align-content-end flex-wrap">
                {sickNotes}
            </div>
        )
    }
} 

export default SickNotesNotifications