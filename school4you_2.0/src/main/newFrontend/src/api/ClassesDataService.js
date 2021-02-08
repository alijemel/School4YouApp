import axios from 'axios'
import AuthenticationService from  '../Components/todo/AuthenticationService'
import {URL_APP,} from './Constants'

class ClassesDataService {

    createClass(name){
        //AuthenticationService.setupAxiosInterceptors()
        return axios.post(`${URL_APP}/schoolClass/new/${name}`)
    }

    getExistingClassnames() {
        return axios.get(`${URL_APP}/schoolClass/all`)
    }

    getUnavailableStudentEmails(){
        return axios.get(`${URL_APP}/students/unavailable`)

    }

    addElement (targetClass,role , value) {
        return axios.put(`${URL_APP}/schoolClass/${targetClass}/add/${role}/${value}`)
    }

    getClass (targerClass) {
        return axios.get(`${URL_APP}/schoolClass/${targerClass}`)
    }

    removeElement(targetClass,role,id) {
        return axios.put(`${URL_APP}/schoolClass/${targetClass}/remove/${role}/${id}`)
    }

    getMyClasses(id) {
        return axios.get(`${URL_APP}/${id}/myClasses`)
    }

    getMyClass(classId) {
        return axios.get(`${URL_APP}/myClass/${classId}`)

    }

    getClassStudents(classId) {
        return axios.get(`${URL_APP}/class/${classId}/students/all`)
    }


}

export default new ClassesDataService()