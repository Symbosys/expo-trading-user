import axios from "axios"

export const api = axios.create({
    baseURL: "http://localhost:4000/api",
    timeout: 5000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`
    }
})