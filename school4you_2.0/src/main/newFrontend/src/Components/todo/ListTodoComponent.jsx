
import React, { Component } from 'react'
import moment from 'moment'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom'
import AuthenticationService from './AuthenticationService'
import AuthenticatedRoute from './AuthenticatedRoute.jsx'
import HeaderComponent from './HeaderComponent'
import TodoDataService from '../../api/TodoDataService.js'



class ListTodosComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            todos: [],
            message : ''
        }
    }



    componentDidMount() {
        this.refreshTermine()
        }

        refreshTermine = () => {
            let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                this.setState({todos : response.data})
            }
        ).catch(err => {
            //Handle your error here
            console.log(err.response);
        })
        


        }

        deleteTodoClicked = (id) => {
            let username = AuthenticationService.getLoggedInUserName()
            TodoDataService.deleteTodo(username, id)
            .then (
                response => {
                    this.refreshTermine();
                }
            )
            

        }
        updateTodoClicked = (id) => {
            this.props.history.push(`/termine/${id}`)
        }
        addTodoClicked = () =>{
            //we define -1 as sort of id to define that it is neu (in the backend an id of -1 recongnized as new)
            this.props.history.push(`/termine/-1`)
        }

    render() {
        return (
            <div>
                <h1>Kommende Termine</h1>
        <div className="alert alert-success container">{this.state.message}</div>

                <div className="container">

                <table className="table">
                    <thead>
                        <tr>
                            <th>Beschreibung</th>
                            <th>Done</th>
                            <th>Datum</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.todos.map(
                                todo =>
                                    <tr key={todo.id}>
                                        <td>{todo.description}</td>
                                        <td>{todo.done.toString()}</td>
                                        <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                        <td><button onClick={() => this.updateTodoClicked(todo.id)} className="btn btn-success">Ändern</button></td>
                                        <td><button onClick={() => this.deleteTodoClicked(todo.id)} className="btn btn-warning">Löschen</button></td>
                                    </tr>
                            )

                        }
                    </tbody>
                </table>

                <div className="row">
                    <button className="btn btn-success" onClick={this.addTodoClicked}>Neu</button>
                </div>

                </div>
                

            </div>
        )
    }
}
export default ListTodosComponent
