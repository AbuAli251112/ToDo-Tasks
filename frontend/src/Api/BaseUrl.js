import axios from 'axios'

// URL for Development Environment 
const baseUrl = axios.create({ baseURL: "http://127.0.0.1:8001" })

export default baseUrl