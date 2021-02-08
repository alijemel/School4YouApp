import React, { Component } from 'react';

class SickNote extends Component{

    render() {

        return (
            <div class=" row col-md-8 mx-auto toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <strong class="mr-auto">Krankmeldung von {this.props.firstName} {this.props.lastName} </strong>
  </div>

  <div class="toast-header">
  <small>{this.props.startDate} bis {this.props.endDate} </small>
  </div>
  <div class="toast-header">
        <p className="text-monospace"> Grund : {this.props.cause}</p>
  </div>

  <div class="toast-header">
  {this.props.approved && <span class="row col-md-8 mx-auto badge badge-success">Bestätigt</span>}
{ !this.props.approved &&  <span class="row col-md-8 mx-auto badge badge-warning">nicht Bestätigt</span>}  
</div>
  {/* <div class="toast-body">
    {this.props.comment}
    </div> */}

{
sessionStorage.getItem('role').toLocaleUpperCase() === 'SECRETARY' && 
<div>
{ !this.props.approved &&   <button onClick={()=> this.props.approveNote()} type="button" class="m-2 btn btn-outline-success btn-sm btn-block">Krankmeldung Bestätigen</button>
} 
{this.props.approved && <button onClick={()=> this.props.unapproveNote()} type="button" class="m-2 btn btn-outline-danger btn-sm btn-block">Krankmeldung ablehnen</button>
} 
{<button onClick={()=>this.props.deleteNote()} type="button" class="m-2 btn btn-danger btn-sm btn-block">Krankmeldung löschen</button>
}

</div>
}

{/* { !this.props.approved &&   <button onClick={()=> this.props.approveNote()} type="button" class="m-2 btn btn-outline-success btn-sm btn-block">Krankmeldung Bestätigen</button>
}    
{this.props.approved && <button onClick={()=> this.props.unapproveNote()} type="button" class="m-2 btn btn-outline-danger btn-sm btn-block">Krankmeldung ablehnen</button>
}  

{<button onClick={()=>this.props.deleteNote()} type="button" class="m-2 btn btn-danger btn-sm btn-block">Krankmeldung löschen</button>
} */}

</div>
        )
    }
}

export default SickNote