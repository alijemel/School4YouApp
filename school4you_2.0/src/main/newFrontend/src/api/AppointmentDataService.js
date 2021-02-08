import axios from 'axios'
import AuthenticationService from  '../Components/todo/AuthenticationService'
import {URL_APP,} from './Constants'

class AppointmentDataService {

    checkFieldStatus(appointment) {
        return axios.put(`${URL_APP}/appointment/fieldStatus`, appointment)
    }

    //for class perspective
    checkFieldStatusClassPerspective(classId, date, slot) {
        return axios.get(`${URL_APP}/appointment/${classId}/${date}/${slot}/fieldStatus`)
    }

    //For class perspective, gets the available teachers for the dropdown menu
    getAvailableTeachers(classId, date, slot) {
        return axios.get(`${URL_APP}/appointment/${classId}/${date}/${slot}/availableTeachers`)

    }
    //For class perspective 

    editRecurrentAppointment(appointmentId, newTeacherId, newTeacherName ,newSubject) {
        return axios.put(`${URL_APP}/appointment/${appointmentId}/edit/${newTeacherId}/${newTeacherName}/${newSubject}`)
    }

    getAppointmentByiId(appointmentId) {
        return axios.get(`${URL_APP}/appointment/${appointmentId}`)
    }

    getAppointmentByClassIdAndTeaxherIdAndDateAndSlot(appointment) {
        return axios.get(`${URL_APP}/appointment/${appointment.classId}/${appointment.teacherId}/${appointment.date}/${appointment.slot}`)

    }

    //FOR class perspective
    getAppointmentByClassIdANndDateAndSlot(classId, date, slot) {
        return axios.get(`${URL_APP}/appointment/${classId}/${date}/${slot}`)
    }

    getAppointmentByTeacherIdANndDateAndSlot(teacherId, date, slot) {
        return axios.get(`${URL_APP}/appointment/teacherTimetable/${teacherId}/${date}/${slot}`)

    }

    createAppointment(newAppointment, weeks) {
        console.log(weeks)
        if(weeks <= 1) {
            return this.createSingleAppointment(newAppointment)
        } else {
            return this.createRecurrentAppointment(newAppointment, weeks)
        }
    }
    createSingleAppointment(newAppointment) {
        return axios.post(`${URL_APP}/appointment/create`, newAppointment)
    }

    //RECURRENT APPOINTMENT
    createRecurrentAppointment(newAppointment, weeks) {
        return axios.post(`${URL_APP}/appointment/recurrent/create/${weeks}`, newAppointment)
    }

    editAppointment(appointmentId, newSubject) {
        return axios.put(`${URL_APP}/appointment/${appointmentId}/edit/${newSubject}`)
    }


    deleteAppointment =(appointmentid)=> {
        return axios.delete(`${URL_APP}/appointment/${appointmentid}/delete`)
    }

    //************************ Class perspective */

    getAvailableTeachersByAppointmentId(appointmentId) {
        return axios.get(`${URL_APP}/appointment/${appointmentId}/availableTeachers`)
    }
    getAvailableTeachersByClassIdDateSlot(classId, date, slot) {
        return axios.get(`${URL_APP}/appointment/${classId}/${date}/${slot}/availableTeachers`)
    }

}

export default new AppointmentDataService()