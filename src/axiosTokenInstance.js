import axios from 'axios'

let gBaseUrl = 'https://kundeportal-test.azurewebsites.net'
if (process.env.NODE_ENV == 'development') {
    gBaseUrl = 'http://localhost:5000/'
}

usersInstance.interceptors.request.use(
    config => {
        const token = localStorage.getItem('kf.token')
        
        if (token) {
            //config.headers.authorization = token,
            config.headers = {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }
        }
        return config
    },
    error => {
        Promise.reject(error)
    }
)


export default usersInstance