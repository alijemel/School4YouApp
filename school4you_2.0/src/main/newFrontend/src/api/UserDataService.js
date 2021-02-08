import axios from 'axios'
import AuthenticationService from  '../Components/todo/AuthenticationService'
import {URL_APP,} from './Constants'

class UserDataService {

    createUser(user, role){
        AuthenticationService.setupAxiosInterceptors()
        return axios.post(`${URL_APP}/${role}/neu`, user)
    }

    updateUser(id, updatedUser){
        AuthenticationService.setupAxiosInterceptors()
        return axios.put(`${URL_APP}/editUser/${id}`, updatedUser)
    }




    getAllUsers () {
        return axios.get(`${URL_APP}/users/all`)
    }

    getUserById (id) {
        return axios.get(`${URL_APP}/users/${id}`)
    }


    getUsersByRole(role) {
        AuthenticationService.setupAxiosInterceptors()
        return axios.get(`${URL_APP}/${role}/all`)
    }


    approve(id) {
        return axios.put(`${URL_APP}/admin/approve/${id}`)

    }
    disApprove(id) {
        return axios.put(`${URL_APP}/admin/disApprove/${id}`)

    }

    getAllEmailsByRole(role) {
       return axios.get(`${URL_APP}/${role}/existingEmails`)
    }

    
}
export default new UserDataService()