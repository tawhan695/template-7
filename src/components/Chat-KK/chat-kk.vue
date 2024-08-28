<template>
	<div>
		<vue-advanced-chat v-show="isConnect && currentUserId" height="calc(95vh - 30px)" :current-user-id="currentUserId"
			:rooms="JSON.stringify(rooms)" :messages="JSON.stringify(messages)" :messages-loaded="messagesLoaded"
			:open-chat="openChat" @open-chat="fetchOpenChat($event.detail[0])" @send-message="sendMessage($event.detail[0])"
			:auto-scroll="JSON.stringify(autoScroll)" :message-actions="JSON.stringify(messageActions)"
			@send-message-reaction="sendMessageReaction($event.detail[0])" :text-messages="JSON.stringify(textMessages)"
			@fetch-messages="fetchMessages($event.detail[0])" />
	</div>
</template>

<script>
import socket from "./chat-kk-socket"
import { HTTP } from "./chat-kk-api"
// import { register } from './../../../../vue-advanced-chat-member/dist/vue-advanced-chat.es' // test
import { register } from './vue-advanced-chat.es'
import Cookies from "js-cookie";
// import Swal from 'sweetalert2'
import moment from 'moment'
import { Howl } from 'howler'
register()
import { parseTimestamp } from './utils/dates'

// const Toast = Swal.mixin({
// 	toast: true,
// 	position: 'top',
// 	showConfirmButton: false,
// 	timer: 1500,
// 	timerProgressBar: true,
// })
const sound_alert = new Howl({
	src: [new URL('./simple-notification.mp3', import.meta.url).href],
	html5: true,
	autoplay: false,
	loop: false,
	volume: 0.9,
	preload: false
})
export default {
	setup() {

		return {

		}
	},
	data() {
		return {
			isConnect: false,
			currentUserId: null,
			selectedRoom: null,
			rooms_: [],
			messages_: [],
			messagesLoaded: false,
			username: 'guest',
			openChat: false,
			chatPage: 0,
			autoScroll: {
				send: {
					new: true, // จะเลื่อนลงหลังจากส่งข้อความ
					newAfterScrollUp: true // จะไม่เลื่อนลงหลังจากส่งข้อความเมื่อเลื่อน
				},
				receive: {
					new: true, // จะไม่เลื่อนลงเมื่อได้รับข้อความ
					newAfterScrollUp: true // จะเลื่อนลงเมื่อได้รับข้อความเมื่อเลื่อนขึ้น
				}
			},
			messageActions: [
				{
					name: 'replyMessage',
					title: 'ตอบกลับ'
				}
			],
			textMessages: {
				ROOMS_EMPTY: 'ไม่มีการสนทนา',
				ROOM_EMPTY: 'ไม่ได้เลือกการสนทนา',
				NEW_MESSAGES: 'ข้อความใหม่',
				MESSAGE_DELETED: 'ข้อความนี้ถูกยกเลิก',
				MESSAGES_EMPTY: 'ไม่มีข้อความ',
				CONVERSATION_STARTED: 'การสนทนาเริ่มต้นเมื่อ:',
				TYPE_MESSAGE: 'พิมพ์ข้อความของคุณ',
				SEARCH: 'ค้นหา',
				IS_ONLINE: 'กำลังออนไลน์',
				LAST_SEEN: 'เห็นครั้งสุดท้าย',
				IS_TYPING: 'กำลังพิมพ์...',
				CANCEL_SELECT_MESSAGE: 'ยกเลิกการเลือก',
			},
		}
	},
	computed: {
		rooms: {
			set(val) {
				this.rooms_ = val
			},
			get() {
				return this.rooms_
			}
		},
		messages: {
			set(val) {
				this.messages_ = val.map((message) => {
					message.timestamp = parseTimestamp(message.created_at, 'HH:mm');
					message.date = parseTimestamp(message.created_at, 'DD MMMM YYYY');
					return message
				})
			},
			get() {
				return this.messages_
			}
		},
	},
	created() {
		// console.log('this.currentUserId', this.currentUserId);


		this.currentUserId = this.getUsername();
		if (this.currentUserId) {
			socket.auth = { sessionID: this.currentUserId };
			socket.auth.username = this.currentUserId;
			const ROLE = localStorage.role || Cookies.get("role");
			socket.auth.role = this.currentUserId === 'guest' ? 'guest' : ROLE;
			socket.auth.guestID = this.currentUserId !== 'guest' ? localStorage.getItem("username_guest") : '';
			socket.connect();
		} else {
			socket.auth.username = 'guest';
			socket.auth.role = 'guest';
			socket.connect();
			// this.getRoom()
		}
	},
	mounted() {
		try {
			this.notifyMe()
		} catch (error) {
			console.log(error);
		}
		socket.on("connect_error", (err) => {
			if (err.message === "invalid username") {
				this.currentUserId = this.getUsername();
				if (this.currentUserId) {
					socket.auth = { sessionID: this.currentUserId };
					socket.auth.username = this.currentUserId;
					const ROLE = localStorage.role || Cookies.get("role");
					socket.auth.role = this.currentUserId === 'guest' ? 'guest' : ROLE;
					socket.auth.guestID = this.currentUserId !== 'guest' ? localStorage.getItem("username_guest") : '';
					socket.connect();
				} else {
					socket.auth.username = 'guest';
					socket.auth.role = 'guest';
					socket.connect();
					// this.getRoom()
				}
			};
		});
		socket.on("connect", () => {
			let This = this;
			// console.log('chat kk connect');
			This.getRoom()
			this.isConnect = true
			socket.on('room', (req) => {
				this.rooms[0] = req;
			});
			socket.on('member message', ({ chat_new }) => {

				//** */
				// update messages
				const idx_messages = this.messages.findIndex(message => {
					return message._id === chat_new._id;
				});
				// console.log('indidx_messagesex', idx_messages);
				if (idx_messages === -1) {
					this.messages = [
						...this.messages,
						chat_new
					]
				} else {
					this.messages[idx_messages] = chat_new;
				}
				this.openChat = true;
				sound_alert.play()
				//** */
			});
			socket.on("disconnect", () => {
				console.log('disconnect server');
				this.isConnect = false
				setTimeout(() => {
					socket.connect();
				}, 4000);
			});
			socket.on("session", function ({ sessionID, userID, role }) {
				// console.log('{ sessionID, userID ,role}', { sessionID, userID, role });
				// attach the session ID to the next reconnection attempts
				socket.auth = { sessionID };
				This.currentUserId = sessionID;

				localStorage.setItem("sessionID", sessionID)
				localStorage.setItem("username", userID);
				localStorage.setItem("role", role);
				Cookies.set("role", role)
				Cookies.set("sessionID", sessionID)
				socket.userID = userID;

			});
		});
	},
	methods: {
		async getRoom() {
			const { data } = await HTTP.post('member/room', { roomId: this.currentUserId })
			if (data) {
				this.rooms[0] = data.data
				this.rooms[0].users = data.data.users.reverse()
			}
		},
		notifyMe(message) {
			if (!("Notification" in window)) {

				// Check if the browser supports notifications
				console.log("This browser does not support desktop notification");
				return false;
			} else if (Notification.permission === "granted") {
				// Check whether notification permissions have already been granted;
				// if so, create a notification
				// new Notification("On Notification!");
				const notification = new Notification(message);
				notification.onclick = (event) => {
					event.preventDefault(); // prevent the browser from focusing the Notification's tab
					this.openChat = true
				};
				return true;
				// …
			} else if (Notification.permission !== "denied") {
				// We need to ask the user for permission
				Notification.requestPermission().then((permission) => {
					// If the user accepts, let's create a notification
					if (permission === "granted") {
						// new Notification("On Notification!");
						const notification = new Notification(message);
						notification.onclick = (event) => {
							event.preventDefault(); // prevent the browser from focusing the Notification's tab
							this.openChat = true
						}
						return true;
						// …
					}
				});
			}
			return false;

			// At last, if the user has denied notifications, and you
			// want to be respectful there is no need to bother them anymore.
		},

		fetchOpenChat(e) {
			this.openChat = e;
		},
		getUsername() {
			return Cookies.get("sessionID") || 'guest'
		},
		fetchMessages({ room, options = {} }) {
			setTimeout(async () => {
				this.selectedRoom = room.roomId
				if (options.reset) {
					this.resetMessages()
					this.messages = await this.getMessages(this.selectedRoom)
				} else {
					this.messages = [
						... await this.getMessages(this.selectedRoom),
						...this.messages_
					]
				}
			}, 3000);
		},
		addMessage(roomId, message) {
			return new Promise((resolve) => {
				socket.emit('member message', { roomId, message }, ({ chat_new }) => {

					this.messages = [
						...this.messages,
						chat_new
					]

					resolve(chat_new);
				});
			});

			// return messages_
		},
		async sendMessage(messages) {
			if (this.isConnect) {
				const message = {
					roomId: messages.roomId,
					content: messages.content,
					senderId: this.currentUserId,
					username: this.currentUserId,
					saved: false, // ส่งสำเร็จ
					distributed: false, // ส่งสำเร็จม
					seen: false,
					deleted: false,
					failure: false, // ส่ไม่สำเร็จ
					timestamp: new Date().toString().substring(16, 21),
					date: moment().format('ll')
				}
				if (messages.files) {
					message.files = this.formattedFiles(messages.files)
				}
				if (messages.replyMessage) {
					message.replyMessage = {
						_id: messages.replyMessage._id,
						content: messages.replyMessage.content,
						sender_id: messages.replyMessage.senderId
					}
					if (messages.replyMessage.files) {
						message.replyMessage.files = messages.replyMessage.files
					}
				}
				const getmessages = await this.addMessage(messages.roomId, message);
				if (messages.files) {
					await this.uploadFile({ file: messages.files, messageId: getmessages._id, roomId: messages.roomId })
				}
			} else {  // ตัดการเชื่อมต่อ
				this.messages = [
					...this.messages,
					{
						_id: this.messages.length,
						content: messages.content,
						senderId: this.currentUserId,
						username: this.currentUserId,
						saved: false, // ส่งสำเร็จ
						distributed: false, // ส่งสำเร็จม
						seen: false,
						deleted: false,
						failure: false, // ส่ไม่สำเร็จ
						timestamp: new Date().toString().substring(16, 21),
						date: new Date().toDateString()
					}
				]
			}
		},
		async getMessages(roomId) {
			const { data } = await HTTP.post('member/getmessage', { page: this.chatPage, roomId: roomId })
			if (data.chat) {
				if (data.chat.docs.length === 0) {
					this.messagesLoaded = true
				}
				this.chatPage = data.page
				// console.log('getMessages', data.chat.docs);
				return data.chat.docs
			} else {
				return []
			}
		},
		resetMessages() {
			this.messagesLoaded = false,
				this.chatPage = 0;
		},
		async sendMessageReaction({ reaction, remove, messageId, roomId }) {
			// const reaction_
			const data = {
				_id: messageId,
				roomId,
				reaction: reaction.unicode,
				username: this.currentUserId,
				remove: remove ? 'remove' : 'add'
			}
			const index = this.messages.findIndex(message => {
				return message._id === messageId;
			});
			const get_message = this.messages[index]
			// console.log(get_message);
			switch (data.remove) {
				case "add":
					if (!get_message.reactions) {
						// get_message['reactions']
						const reaction__map = new Map();
						// console.log('not this.messages[index]');
						reaction__map.set(reaction.unicode, [this.currentUserId])
						// console.log('map ', reaction__map);
						// ✅ Convert Map to Object
						const reaction__obj = Object.fromEntries(reaction__map);
						// console.log('obj', reaction__obj);
						get_message.reactions = reaction__obj
					} else {
						// console.log('else', get_message.reactions);
						// console.log('else', get_message.reactions[reaction.unicode]);
						if (get_message.reactions[reaction.unicode]) {
							let indexOF = get_message.reactions[reaction.unicode].indexOf(this.currentUserId)
							// console.log(indexOF);
							if (indexOF === -1) { // add user
								get_message.reactions[reaction.unicode].push(this.currentUserId)
							}
						} else {
							get_message.reactions[reaction.unicode] = [this.currentUserId]
						}
					}
					break;
				case "remove":
					for (var i = 0; i < get_message.reactions[reaction.unicode].length; i++) {
						if (get_message.reactions[reaction.unicode][i] === this.currentUserId) {
							get_message.reactions[reaction.unicode].splice(i, 1);
						}
					}
					break;
			}
			socket.emit('reaction', { roomId, reactions: get_message.reactions, messageId }, (status) => {
				status
			});
		},
		async uploadFile({ file, messageId, roomId }) {
			socket.emit("uploadfile", { file, messageId, roomId }, ({ chat_new, room_update }) => {
				const index_rooms = this.rooms.findIndex(room => {
					return room._id === room_update._id;
				});
				if (index_rooms !== -1) {
					this.rooms[index_rooms] = room_update
				}
				// update messages
				const idx_messages = this.messages.findIndex(message => {
					return message._id === chat_new._id;
				});
				if (idx_messages === -1) {
					this.messages = [
						...this.messages,
						chat_new
					]
				} else {
					this.messages[idx_messages] = chat_new;
				}
			});
		},
		formattedFiles(files) {
			const formattedFiles = []
			files.forEach(file => {
				const messageFile = {
					name: file.name,
					size: file.size,
					type: file.type,
					extension: file.extension || file.type,
					url: file.url || file.localUrl,
				}
				// console.log('messageFile', messageFile.extension);
				if (messageFile.extension == 'png' || messageFile.extension == 'jpg') {
					formattedFiles.push(messageFile)
				}
			})
			return formattedFiles
		},

	},
}

</script>

<style lang="scss">
body {
	font-family: 'Quicksand', sans-serif;
}
</style>