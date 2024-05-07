import axios from 'axios'
import router from '../router'

const request = axios.create({
    baseURL: '/api/',
    // baseURL: 'http://localhost:8686/ql/chat/',
    timeout: 10000
})
request.defaults.withCredentials = true
request.defaults.headers.post['Content-Type'] = 'application/json'

request.interceptors.response.use(
    response => {
        if (response.status === 200 && response.data.code === 401) {
            router.push('/');
        }
        return response;
    }, error => {
        return Promise.reject(error);
    }
)

export default request
