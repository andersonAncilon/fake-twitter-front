import axios from 'axios';


const api = axios.create({
    baseUrl: 'http://localhost:3001/'
})

export default api;