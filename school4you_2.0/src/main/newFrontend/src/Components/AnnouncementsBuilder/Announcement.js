import { Component } from "react"
import { Link } from "react-router-dom"
import CommunicationDataService from "../../api/CommunicationDataService"
import Button from '../../Button/Button'

class Announcement extends Component {
    state={
        showContent : false
    }

     


    toggleContent =()=> {
        this.setState({showContent : !this.state.showContent})
    }

render() {

    let content = '...' 
    if(this.state.showContent) {
        content = this.props.content
    }
    let currentRole = sessionStorage.getItem('role').toLocaleUpperCase()
    let secretaryControls = 
    <div>
        <Link class="card-link" ><Button clicked={this.props.edit} btnType="Success">Ändern</Button></Link>
    <Link class="card-link" ><Button btnType="Danger" clicked={this.props.delete}>Löschen</Button></Link>
    </div>

    return (
        <div>
            <div class="alert alert-secondary card">
  <div class="card-body">
    <h4 class="card-title">{this.props.subject}</h4>
    <h6 class="card-subtitle mb-2 text-muted">{this.props.date}</h6>
    <button type="button" class="btn btn-primary btn-sm" onClick={this.toggleContent}>Lesen</button>  
    <p class="card-text">
      {content}
    </p>
    {
    currentRole === 'SECRETARY' && 
    secretaryControls
    }
    {
        this.props.teacherControl && secretaryControls
    }
    
  </div>
</div>
        </div>
    )
}
}
    

export default Announcement