import { extend } from 'jquery';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FamilyDataService from '../../api/FamilyDataService';

class Families extends Component {

    state = {
        showForm: false,
        input: '',
        inputMessage: 'Bitte Familienname eingeben.',
        correctInput: false,
        apiResponse: 'Hier Können Sie Familien erstellen und verwalten, Eltern und Kinder gruppieren.',
        families: [],
        selectedFamily: {
            id: '', index: ''
        }
    }

    componentDidMount() {
        FamilyDataService.getAllFamilies()
            .then(response => {
                this.setState({ families: response.data })
            }).catch(error => {
                console.log(error.response.data)
            })
    }


    toggleForm = () => {
        this.setState({ showForm: !this.state.showForm })
    }

    inputChanged = (event) => {
        this.setState({ input: event.target.value })
        this.validate(event.target.value)
    }

    validate = (input) => {

        if (input.match(/^$|\s+/)) {
            this.setState({ inputMessage: 'geben Sie bitte einen Gültigen Namen ohne Leerzeichen an, Sie können - als Leerzeichen benutzen.  ', correctInput: false })
        } else if (!input.match(/^[a-z ,.'-]+$/i)) {
            this.setState({ inputMessage: 'Bitte nur Charakter [a-z , . -] benutzen ', correctInput: false })
        } else {
            this.setState({ inputMessage: '', correctInput: true })
        }
    }

    submitInput = () => {
        this.toggleForm()
        FamilyDataService.createFamily(this.state.input)
            .then(response => {
                this.state.families.unshift(response.data.object)
                this.setState({
                    input: '',
                    inputMessage: 'Bitte Familienname eingeben.',
                    correctInput: false, apiResponse: response.data.message
                })
            }).catch(error => {
                console.log(error.response.data)
            })
    }

    selectToDelete = (familyId, index) => {
        this.setState({
            selectedFamily: {
                id: familyId, index: index
            }
        })

    }

    deleteFamily = () => {
        let families = this.state.families
        let selectedFamilyId = this.state.selectedFamily.id
        families.splice(this.state.selectedFamily.index, 1)
        this.setState({
            families: families, selectedFamily: {
                id: '', index: ''
            }
        })
        FamilyDataService.deleteFamily(selectedFamilyId)
            .then(response => {
                this.setState({ apiResponse: response.data.message })
            }).catch(error => { console.log(error.reponse.message) })

    }


    render() {

        let modal =
            <div class="modal" id="exampleModalCentered" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenteredLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalCenteredLabel">Sind Sie sicher</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-footer">
                            <button onClick={this.deleteFamily} data-dismiss="modal" type="button" class="btn btn-outline-danger btn-sm btn-block"> Entfernen</button>
                            <button data-dismiss="modal" type="button" class="btn btn-outline-info btn-sm btn-block"> Nein</button>
                        </div>
                    </div>
                </div>
            </div>


        let families =
            <div class="spinner-border text-secondary" role="status">
                <span class="sr-only">Loading...</span>
            </div>

        if (this.state.families && this.state.families.length > 0) {
            families =
                <div className="card">
                    <ul class="list-group">
                        {
                            this.state.families.map((family, index) => {
                                return (
                                    <li class="list-group-item">
                                        <p className="text-monospace">Familie {family.pseudo}</p>
                                        <Link
                                        to={`/Familien/${family.id}`}
                                        >
                                            <button type="button" class="btn btn-outline-info btn-sm btn-block">Familie {family.pseudo} Verwalten</button>

                                        </Link>
                                        <button onClick={() => this.selectToDelete(family.id, index)} data-toggle="modal" data-target="#exampleModalCentered" type="button" class="btn btn-outline-danger btn-sm btn-block">Familie {family.pseudo} Entfernen</button>
                                        {modal}
                                    </li>

                                )
                            })
                        }

                    </ul>

                </div>

        }

        let form =
            <div>
                <div class="input-group">
                    <input onChange={this.inputChanged} type="text" class="form-control" placeholder="Familien Name" aria-label="" aria-describedby="basic-addon1"></input>
                    <div class="input-group-prepend">
                        <button onClick={this.submitInput} disabled={!this.state.correctInput} class="btn btn-dark" type="button">Erstellen</button>
                    </div>
                </div>
                <small>{this.state.inputMessage}</small>

            </div>


        return (

            <div>
                <div class="alert alert-info" role="alert">
                    <strong>Familien Seite</strong> {this.state.apiResponse}
                </div>
                <button onClick={this.toggleForm} type="button" class="btn btn-outline-warning btn-sm btn-block">Neue Familie +</button>
                {this.state.showForm && form}

                {families}





            </div>
        )
    }
}

export default Families