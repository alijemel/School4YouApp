import axios from 'axios'
import AuthenticationService from  '../Components/todo/AuthenticationService'
import {URL_APP,} from './Constants'

class CommunicationDataService {

    createAnnouncement(announcement, visibility) {
        return axios.post(`${URL_APP}/announcements/new`,announcement)

    }
    createClassAnnouncement(announcement) {
        return axios.post(`${URL_APP}/classAnnouncements/create`,announcement)

    }
    getClassAnnouncements(classId) {
        return axios.get(`${URL_APP}/classAnnouncements/${classId}`)
        
    }



    getInbox(role) {
        return axios.get(`${URL_APP}/inbox/${role}`)
    }

    editAnnouncement(id, editedAnnouncement) {
        return axios.put(`${URL_APP}/announcements/edit/${id}`, editedAnnouncement)

    }
    editClassAnnouncement(announcementId, editedAnnouncement) {
        return axios.put(`${URL_APP}/classAnnouncements/edit/${announcementId}`, editedAnnouncement)

    }


    deleteAnnouncement(id) {
        return axios.delete(`${URL_APP}/announcements/delete/${id}`)

    }
    deleteClassAnnouncement(announcementId) {
        return axios.delete(`${URL_APP}/classAnnouncements/delete/${announcementId}`)

    }

}

export default new CommunicationDataService()