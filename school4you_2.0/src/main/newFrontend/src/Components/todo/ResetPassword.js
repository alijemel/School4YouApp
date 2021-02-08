import React, { Component } from 'react'
import PasswordDataService from '../../api/PasswordDataService'

class ResetPassword extends Component {

    state={
        input : '',
        success : '',
        serverResponse : ''
    }

    handleInput =(event)=> {
        this.setState({input : event.target.value})
    }

    handleSubmit=()=> {
        PasswordDataService.verifyEmail(this.state.input, process.env.NODE_ENV)
        .then(response => {
            console.log(response.data)
            this.setState({serverResponse : response.data.message, success : response.data.object })
        }).catch(error => {
            console.log(error)
        })

    }

    render() {
        return (
            <div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h1 class="display-3">Passwort Zurücksetzen</h1>
                    <form>
  <div class="form-group">
    <label for="formGroupExampleInput">Email Adresse</label>
    <input onChange={ this.handleInput} value={this.state.input} type="email" class="form-control" id="formGroupExampleInput" placeholder="Example@gmail.com"></input>
    <button disabled={this.state.success} onClick={this.handleSubmit}  type="button" class="mt-3 btn btn-primary btn-sm btn-block">Bestätigen</button>
  </div>

  {this.state.success && 
  <div class="alert alert-success" role="alert">
    <strong>{this.state.serverResponse}</strong> 
</div>}
  {!this.state.success && this.state.serverResponse !== '' &&
  <div class="alert alert-danger" role="alert">
    <strong>{this.state.serverResponse}</strong> 
</div>}




  
</form>
                </div>
            </div>
        )
    }
}

export default ResetPassword