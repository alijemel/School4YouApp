import React, { Component } from 'react';
import logo from './logo.svg';
import FirstComponent from './Components/Learning-examples/FirstComponent' 
import SecondComponent from './Components/Learning-examples/SecondComponent'
import ThirdComponent from './Components/Learning-examples/ThirdComponent' 
import Counter from './Components/Counter/Counter'
import TodoApp from './Components/todo/TodoApp'
import './App.css'


import './App.css'
import './bootstrap.css'

 
class App extends Component {
  render() {
    return (
      <div className="App">
        
       <TodoApp/>
      
      </div>
    );
  }
}

export default App;
