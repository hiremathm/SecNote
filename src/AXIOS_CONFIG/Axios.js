import axios from 'axios'

const instance = axios.create({
	baseURL: 'http://34.204.190.112:6060/'
})

export default instance;