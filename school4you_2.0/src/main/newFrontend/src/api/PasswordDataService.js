import axios from 'axios'
import {URL_APP,} from './Constants'

class PasswordDataService {

    verifyEmail(email, env) {
        return axios.get(`${URL_APP}/rest-password/verify-email/${email}/${env}`)
    }
    
    verifyToken(token) {
        return axios.get(`${URL_APP}/reset-password/validate-token/${token}`)
    }

    setNewPassword(newPassword, token) {
        return axios.put(`${URL_APP}/reset-password/set-new-password/${token}`, newPassword)
    }

}

export default new PasswordDataService()