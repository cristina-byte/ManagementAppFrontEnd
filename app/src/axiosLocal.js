import axios from "axios"

const BASE_URL="https://localhost:7257/api"

const axiosInstanceLocal=axios.create(
    {
    baseURL:BASE_URL,
    })

export default axiosInstanceLocal