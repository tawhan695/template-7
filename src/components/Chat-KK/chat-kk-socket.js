import { io } from "socket.io-client";

// const URL = "http://localhost:3000";
const URL = import.meta.env.VITE_APP_CHATAPI;
const socket = io(URL, { autoConnect: false });

export default socket;