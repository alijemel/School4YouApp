import axios from 'axios'
import {URL_APP,} from './Constants'

class ExamDataService {

    getClassExams(classId){
        return axios.get(`${URL_APP}/exams/class/${classId}`)
    }

    getUnavailableDatesByTeacherIdAndClassId(teacherId, classId) {
        return axios.get(`${URL_APP}/exams/constraints/${teacherId}/${classId}/unavailable`)
    }

    createExam(exam) {
        return axios.post(`${URL_APP}/exams/create`, exam)

    }

    deleteExam(examId) {
        return axios.delete(`${URL_APP}/exams/delete/${examId}`)
    }




}

export default new ExamDataService()