import axios from 'axios'
import {URL_APP,} from './Constants'

class SickNoteDataService {

    //ADMINISTRATION FUNCTIONS 
    createSickNote(SickNote) {
        return axios.post(`${URL_APP}/sickNotes/create`,SickNote)
    }

    getUnapprovedNotesByRole(role) {
        return axios.get(`${URL_APP}/administration/sickNotes/unapproved/${role}`)
    }

    getApprovedNotesByRole(role) {
        return axios.get(`${URL_APP}/administration/sickNotes/approved/${role}`)
    }

    approveSickNoteById(noteId) {
        return axios.put(`${URL_APP}/sickNotes/approve/${noteId}`)
    }

    disapproveSickNoteById(noteId) {
        return axios.put(`${URL_APP}/sickNotes/disapprove/${noteId}`)
    }
    
    deleteSickNoteById(noteId) {
        return axios.delete(`${URL_APP}/administration/sickNotes/delete/${noteId}`)

    }

    //VIEW ONLY FUNCTIONS 

    getAllSickNotesByClassAndRole(classId, role) {
        return axios.get(`${URL_APP}/notifications/sickNotes/${classId}/${role}`)
    }



}

export default new SickNoteDataService()