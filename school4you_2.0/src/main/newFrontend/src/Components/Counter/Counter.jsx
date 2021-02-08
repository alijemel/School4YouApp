import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './Counter.css'


class Counter extends Component {

constructor() {
    super()
    this.state = {
        counter : 0
    }
}


    render() {
        return (
          <div className="counter">
            <CounterButton incrementMethod={this.increment}/>
            <CounterButton by={5} incrementMethod={this.increment} />
            <CounterButton by={10} incrementMethod={this.increment}/>
          </div>
        );
      }

      increment = (x) => {
          this.setState({
              counter : this.state.counter + x
          });
        }
      
}

class CounterButton extends Component {


    //FOR STATE  define initial state in a constructor
// state => counter is 0

constructor() {
    super()// AUFPASSEN SUPER MUSS
    this.state = {
        counter : 0
    }
    //BIND THE JS METHOD TO THE CONSTRUCTOR
    //this.increment = this.increment.bind(this)
}
    render () {

    //const style = {fontSize : "50px", padding : "15px 30px"};

    return (
<div className="counterButton">
    <button onClick={this.increment}>+{this.props.by}</button>
    <span className="count" >{this.state.counter}</span>
</div>
    )
    }

    // WHEN USE ARROW FUNCTION NO NEED FOR BINDING
    increment = () => { //updates the counter
        //console.log('increment')
        //this.state.counter++; BAAAAD
        this.setState({
            counter : this.state.counter + this.props.by
        });
        this.props.incrementMethod(this.props.by);
    }   
}

//DEFINE THE PROPS IN A JS OBJECT
CounterButton.defaultProps = {
    by : 1
}


export default Counter
