import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FamilyDataService from '../../api/FamilyDataService';

class MyFamily extends Component {

    state={
        myFamily : '',
        message : 'Loading...',
        exists : ''
    }

    componentDidMount(){
        FamilyDataService.getMyFamily(this.props.match.params.userId)
        .then(response => {
            console.log(response.data)
            if(!response.data.object){
                this.setState({exists : false, message : response.data.message})
            } else {
                this.setState({exists : true, myFamily : response.data.object})
            }

            // this.setState({exists : (response.data.object !== null), message : response.data.message, myFamily : response.data.object})
        }).catch(error => {
            console.log(error.response.message)
        })



    }

    render() {
        return (
            <div class="jumbotron">
                    
  <h1 class="display-3">Meine Familie</h1>
  {this.state.exists && <h3 >{this.state.myFamily.name}</h3>}
  <p class="lead">Hier Können Sie Ihre angemeldeten Kinder ansehen, 
  deren Termine anzeigen und Anwesenheiten sowie Noten abrufen.</p>
 
  
  <p class="lead">
  {!this.state.exists && <div class="alert alert-danger" role="alert">
  <strong>Achtung : </strong> {this.state.message}
</div>}
<Link
to={`/Familien/${this.state.myFamily.id}`}
>
<button disabled={!this.state.exists} type="button" class="btn btn-primary btn-lg btn-block">Zur Familien Übersicht</button>

</Link>

  </p>
</div>
            

                  
                

                






            
        )
    }
}

export default MyFamily
