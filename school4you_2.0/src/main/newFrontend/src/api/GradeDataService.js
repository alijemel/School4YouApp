import axios from 'axios'
import AuthenticationService from '../Components/todo/AuthenticationService'
import {URL_APP,} from './Constants'

class GradeDataService {

    getGradeByExamIdAndStudentId(examId, studentId) {
        return axios.get(`${URL_APP}/grades/${examId}/${studentId}`)
    }

    getGradesByStudentId(studentId) {
        return axios.get(`${URL_APP}/grades/${studentId}`)
    }

    setGrade(grade) {

        return axios.post(`${URL_APP}/grades/set`, grade)
    }

    deleteGrade(gradeId) {
        return axios.delete(`${URL_APP}/grades/delete/${gradeId}`)
    }




}

export default new GradeDataService()