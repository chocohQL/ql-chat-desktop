import axios from 'axios'
import router from '../router'
import config from '../config'

const request = axios.create({
    baseURL: config.requestConfig.baseURL,
    timeout: config.requestConfig.timeout
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
