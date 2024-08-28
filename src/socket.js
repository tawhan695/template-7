import Cookies from "js-cookie";
import { decode } from "jsonwebtoken-esm";
import { io } from "socket.io-client";
import { useUserStore } from "./stores/user"
import { Toast } from "./plugins/SweetAlert";
import { Howl } from 'howler';


export const useSocketIO = () => {

    const userStore = useUserStore();
    const socket = io(userStore.userProfile.socketUrl); //import.meta.env.VITE_SOCKET_URL
    const jwt_decode = decode(Cookies.get("accessToken"));
    const sound = new Howl({
        src: [new URL("./assets/sound/withdraw.mp3", import.meta.url).href]
    });

    socket.on('connect', () => {
        console.log('socket connect')
        socket.emit('authentication', { token: Cookies.get("accessToken"), role: 'user' })
    })

    socket.on(jwt_decode._id, (data) => {
        // console.log(data)
        if (data.topic == "credit" && data.data.isTsu) {
            userStore.userProfile.users[2].credit = data.data.total
            userStore.users.ufa.credit = data.data.total

            // Object.values(userStore.userProfile.users).find((e, k) => {
            //     if (e.username == data.username) {
            //         let keyUsers = ""
            //         if ((k+1) == 1) keyUsers = "amb";
            //         else if ((k+1) == 2) keyUsers = "ufa";

            //         userStore.userProfile.users[k + 1].credit = data.data.total
            //         userStore.users[keyUsers].credit = data.data.total
            //     }
            // })

        }

        if (data.topic == "deposit") {
            userStore.postChangeUserAgent()
            sound.play()
            Toast.fire({
                icon: 'success',
                title: 'มีการฝากเงิน ' + data.data.amount + " ฿"
            })
        }
    });

    socket.on('disconnect', () => { console.log('socket disconnect') })

    return {
        socket,
    }
}