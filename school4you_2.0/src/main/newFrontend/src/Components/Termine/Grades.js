import { replace } from 'formik';
import React, { Component } from 'react';
import GradeDataService from '../../api/GradeDataService';

class Grades extends Component{

    state={
        grades : [],
        apiResponded : false
    }

    componentDidMount() {
        GradeDataService.getGradesByStudentId(this.props.match.params.studentId)
        .then(response => {
            console.log(response.data)
            let grades = response.data
            this.setState({grades : grades, apiResponded : true})
        }).catch(error => {
            console.log(error.response.message)
        })
    }
    render() {
        return (
            <div>

                Noten

                <table class="table table-bordered">
  <thead class="thead-dark">
    <tr>
      <th>Id</th>
      <th>Fach</th>
      <th>Beschreibung</th>
      <th>Datum</th>
      <th>Zeit</th>
      <th>Lehrer</th>
      <th>Note</th>
      <th>Kommentar</th>
    </tr>
  </thead>
  <tbody>
      {
          this.state.grades.length > 0 && this.state.apiResponded &&
          this.state.grades.map((grade, index) => {
              return (
                <tr key={index}>
      <th scope="row">{grade.exam.id}</th>
              <td>{grade.exam.subject}</td>
              <td>{grade.exam.description}</td>
      <td>{grade.exam.date}</td>
      <td>{grade.exam.slot}</td>
      <td>{grade.exam.teacherName}</td>
      <td>{grade.grade.grade}</td>
      <td>
          {grade.grade.passed && <span class="badge badge-success">Bestanden :D</span>}
          {!grade.grade.passed && <span class="badge badge-danger">Nicht bestanden :(</span>}

          </td>
    </tr>
              )
          })
      }
    
    
  </tbody>
</table>
                
            
            </div>
        )
    }
}

export default Grades


