
import {URL_APP,} from './Constants'
import axios from 'axios'

class FamilyDataService { 

    createFamily(name){
        return axios.post(`${URL_APP}/family/create/${name}`)
    }

    getAllFamilies(){
        return axios.get(`${URL_APP}/families/all`)
    }

    deleteFamily(familyId){
        return axios.delete(`${URL_APP}/family/delete/${familyId}`)

    }

    getStudentsByFamily(familyId){
        return axios.get(`${URL_APP}/family/${familyId}/students`)

    }
    getParentsByFamily(familyId){
        return axios.get(`${URL_APP}/family/${familyId}/parents`)

    }

    populateAvailableStudents(){
        return axios.get(`${URL_APP}/available/children`)
    }

    populateAvailableParents(){
        return axios.get(`${URL_APP}/available/parents`)
    }

    addChildToFamily(familyId, studentId){
        return axios.post(`${URL_APP}/family/${familyId}/add/student/${studentId}`)
    }

    addParentToFamily(familyId, parentId){
        return axios.post(`${URL_APP}/family/${familyId}/add/parent/${parentId}`)
    }

    removeStudentFromFamily(familyId, studentId){
        return axios.delete(`${URL_APP}/family/${familyId}/remove/student/${studentId}`)
    }

    removeParentFromFamily(familyId, parentId){
        return axios.delete(`${URL_APP}/family/${familyId}/remove/parent/${parentId}`)
    }

    getMyFamily(userId){
        return axios.get(`${URL_APP}/MyFamily/${userId}`)
    }



    

}

export default new FamilyDataService()