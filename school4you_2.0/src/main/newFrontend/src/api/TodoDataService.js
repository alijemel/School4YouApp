import axios from 'axios'
import AuthenticationService from  '../Components/todo/AuthenticationService'
import {API_URL, URL_APP} from './Constants'


class TodoDataService {

    retrieveAllTodos(username) {
        let user = 'user'
        let password = 'password'
        //encoding auth header USINT BTOA JS
        let basicAuthHeader = 'Basic ' + window.btoa(user + ":" + password)

        return axios.get(`${URL_APP}/users/${username}/todos`,
        {
            headers : {
                authorization : basicAuthHeader
            }
        }
        
        )

    }

    retrieveTodo(username,id){
        AuthenticationService.setupAxiosInterceptors()
        return axios.get(`${URL_APP}/users/${username}/todos/${id}`)
    }

    deleteTodo(username, id){
        AuthenticationService.setupAxiosInterceptors()
        
        return axios.delete(`${URL_APP}/users/${username}/todos/${id}`)
    }

    

    updateTodo(username,id, todo){
        AuthenticationService.setupAxiosInterceptors()
        return axios.put(`${URL_APP}/${username}/todos/${id}`, todo)
    }
    
    createTodo(username, todo){
        AuthenticationService.setupAxiosInterceptors()
        return axios.post(`${URL_APP}/users/${username}/todos/`, todo)
    }





}

export default new TodoDataService()