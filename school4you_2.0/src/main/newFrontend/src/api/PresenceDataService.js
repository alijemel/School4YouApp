import axios from 'axios'
import AuthenticationService from  '../Components/todo/AuthenticationService'
import {URL_APP,} from './Constants'

class PresenceDataService {

    getPresenceByAppointmentIdAndStudentId(appointmentId, studentId) {
        return axios.get(`${URL_APP}/presence/${appointmentId}/${studentId}`)
    }

    createPresence(presence) {
        return axios.post(`${URL_APP}/presence/create`, presence)

    }

    editPresence(presenceId, isPresent) {
        return axios.put(`${URL_APP}/presence/${presenceId}/edit/${isPresent}`)
    }

}

export default new PresenceDataService()