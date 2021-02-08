import React, { Component } from 'react';

class PlanerControl extends Component {

    state = {
        selectedFach: '',
        showButton: true
    }

    selectFach = (event) => {
        console.log(event.target.value)
        this.setState({ selectedFach: event.target.value })
    }

    submitClicked =() => {
        console.log(this.state.selectedFach)
    }

    

    render() {

        return (
            <div>
                {   this.state.showButton && <button className="btn btn-warning" data-toggle="modal" data-target="#exampleModal">action</button>}
                {this.state.selectedFach}

                <div class="modal" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered" role="document">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                                {this.props.teacherId} ,
          {this.props.classId} ,
          {this.props.date.dayName} ,
          {this.props.date.date} ,
          {this.props.slot}

                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        Fach
  </button>
                                    <div id="myselect" class="dropdown-menu" aria-labelledby="dropdownMenu1">
                                        <option class="dropdown-item" onClick={this.selectFach} value="MATHEMATIK">Mathematik</option>
                                        <option class="dropdown-item" onClick={this.selectFach} value="SPORT">Sport</option>
                                        <option class="dropdown-item" onClick={this.selectFach} value="SCIENCE">Naturwissenschaft</option>
                                    </div>
                                </div>



                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button onClick={this.submitClicked} data-dismiss="modal" type="button" class="btn btn-primary">Speichern</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlanerControl