import axios from 'axios' 
export const HTTP = axios.create({
  // baseURL: 'http://localhost:3000',
  baseURL: import.meta.env.VITE_APP_CHATAPI,
  headers: {
    'Content-Type': 'application/json',
    "chat-kk-api": "chat-kk-api-tawin65"
  }
})
