import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import classes from './Exam.module.css'

class Exam extends Component {

    render() {

        let examControls =
            <div>
                <button onClick={this.props.editClicked} type="button" class="btn btn-primary btn-sm" >Ändern</button>
                <Link 
                to={`/Anwesenheiten/Termin/${this.props.examId}`}
                ><button onClick={this.props.bewertenClicked} type="button" class="btn btn-success btn-sm" >Bewerten</button>
                </Link>
                
                <button onClick={this.props.deleteClicked} type="button" class="btn btn-danger btn-sm" >Löschen</button>
            </div>

        return (
            <div class=" alert alert-secondary card">
                <div class="card-body">
                    <h4 class="card-title">{this.props.subject}</h4>
                    <h6 class="card-subtitle mb-2 text-muted">{this.props.date} , {this.props.time}</h6>
                    <h6 class="card-subtitle mb-2 text-muted">Lehrer : {this.props.teacherName}</h6>
        <p class="card-text text-monospace font-weight-bold"> {this.props.description}</p>

{this.props.teacherId == sessionStorage.getItem('id') && examControls  }

                </div>
            </div>
        )
    }
}

export default Exam