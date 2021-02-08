import axios from 'axios'
class AuthenticationService {

    authenticate(email, password) {
        //return axios.post(`http://localhost:8080/${role}/neu`, user)
    }

    registerSuccessfullLogin(id, firstName, lastName, role, approved) {
        sessionStorage.setItem('authenticated', true)
        sessionStorage.setItem('id', id)
        sessionStorage.setItem('firstName', firstName)

        sessionStorage.setItem('lastName', lastName)
        sessionStorage.setItem('role', role)
        sessionStorage.setItem('approved', approved)


        this.setupAxiosInterceptors();

    }



    logout() {
        sessionStorage.clear()
    }

    isUserLoggedIn() {
        
       if(sessionStorage.getItem('authenticated'))  {
           return sessionStorage.getItem('authenticated')
       }
        
    }

    isUserApproved() {
        if (this.isUserLoggedIn) {
            //this will have to be rendrered from backend
            return sessionStorage.getItem('approved')
        }
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user === null) return ''
        else return user

    }


    setupAxiosInterceptors() {
        let user = 'user'
        let password = 'password'

        //encoding auth header USINT BTOA JS

        let basicAuthHeader = 'Basic ' + window.btoa(user + ":" + password)

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {

                    config.headers.authorization = basicAuthHeader
                }
                return config

            }
        )
    }
}



export default new AuthenticationService()