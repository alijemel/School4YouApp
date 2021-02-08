import { validateYupSchema } from 'formik';
import React, { Component } from 'react';
import ClassesDataService from '../../api/ClassesDataService';
import Button from '../../Button/Button'


class AddToClass extends Component {

    state = {
        input : '',
        value : '',
        error : null,
        disabeled : true
    }

    componentDidUpdate () {
        if(this.props.deleteClicked && this.state.value !== '') {
            this.setState({value : ''})
        }
    }

    handleChange = (event) => {
        this.setState({ input: event.target.value,
        value : event.target.value})
        this.validate(event.target.value)

        if(this.props.deleteClicked) {
            this.props.resetDeleteClicked()
        }

    }

    validate =(input)=>{
        let globalPossibleValues = this.props.globalPossibleValues;
        let alreadyInClass = this.props.alreadyInClass;
        let unavailable = this.props.unavailable;
        if(! globalPossibleValues.includes(input)){
            this.setState({error : 'Bitte gültige und existierende Email eingeben! ',
        disabeled : true})
        } else if (alreadyInClass.includes(input)) {
            this.setState({error : this.props.toAdd + ' ist schon in dieser Klasse',
        disabeled : true})
        } else if ((this.props.toAdd === 'student') && (unavailable.includes(input))) {
            this.setState({error : 'Student ist schon in einer Klasse! ',
        disabeled : true})
        } else {
            this.setState({error : '',
        disabeled : false})
        }
    }

    addElement =()=>{
        if(this.state.input && !this.state.disabeled) {
            this.props.alreadyInClass.push(this.state.input);
            this.setState({disabeled : true})
            
            ClassesDataService.addElement(this.props.targetClass,this.props.toAdd, this.state.input )
            
            .then(response => {
                console.log(response.data)
                //ADD THE ELEMENT TO THE PARENT COMPONENT TABLE
                this.props.updateParent(response.data)
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    render() {
        
        return (
            
            <div>
                <div class="form-group">
                    <label for="formGroupExampleInput">Example label</label>
                    <input class="form-control form-control-lg" type="text" placeholder="example@example.com"
                     onChange={this.handleChange} value={this.state.value}  ></input>
        <small className="form-text text-danger">{this.state.error}</small>
                </div>

                <button disabled={this.state.disabeled}  type="button" class="btn btn-secondary" onClick={this.addElement}>OK</button>



            </div>
        )
    }
}
export default AddToClass
