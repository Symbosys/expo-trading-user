import axios from "axios"

export const api = axios.create({
    baseURL: "https://trading-omega-sepia.vercel.app",
    timeout: 5000,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
        "Authorization":`Bearer ${localStorage.getItem("token")}`
    }
})