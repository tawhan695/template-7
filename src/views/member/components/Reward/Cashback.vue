<template>
    <div class="cashback-reward" :class="{ 'd-none': !show }">
        <i class="fa fa-times-circle" aria-hidden="true" @click="close()"></i>
        <img src="../../../../assets/rewards/cashback.png" alt="" class="img-cashbaack" @click="ToggleReward()">

    </div>
</template>

<script>
import Swal from 'sweetalert2';
import Cookies from "js-cookie";
import axios from 'axios';
import { useUserStore } from "../../../../stores/user"

export default {
    setup() {
        const UserStore = useUserStore();
        return {
            UserStore
        }
    },
    data() {
        return {
            show: true,
            HEADERS: {
                Authorization: 'Bearer ' + Cookies.get('accessToken'),
                'Content-Type': 'application/json'
            },
        }
    },
    methods: {
        close() {
            this.show = false;
        },
        ToggleReward() {
            const swalWithBootstrapButtons = Swal.mixin({
                customClass: {
                    confirmButton: 'btn -submit mx-1',
                    cancelButton: 'btn -cancel mx-1',
                    popup: "swall-cashback"
                },
                buttonsStyling: false
            })
            const data = {
                ag: this.UserStore.selector.num
            }
            swalWithBootstrapButtons.fire({
                title: 'รับยอดเสีย',
                text: "ลูกค้าสามารถรับยอดเสียได้ 1 ครั้งต่อวัน!",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: 'รับเลย',
                cancelButtonText: 'ยกเลิก',
                showLoaderOnConfirm: true,
                preConfirm: async () => {

                    return axios.post(`${import.meta.env.VITE_API_URL}/user/return/loss`, data, { headers: this.HEADERS })
                        .then((response) => {
                            return response.data
                        })
                        .catch((error) => {
                            console.log(error);
                            Swal.showValidationMessage(
                                `Request failed: ${error}`
                            )
                        });
                },
                allowOutsideClick: () => !Swal.isLoading()
            }).then((result) => {

                if (result.isConfirmed) {
                    console.log(result.value.data);
                    if (!result.error) {
                        if (result.value.data) {
                            swalWithBootstrapButtons.fire(
                                'สำเร็จ!',
                                `ยินดีด้วยคุณได้รับยอดเสีย ${result.value.data.amount} บาท`,
                                'success'
                            )
                        } else {
                            swalWithBootstrapButtons.fire(
                                'เป็นที่น่าเสียใจ!',
                                `${result.value.error.msg}`,
                                'error'
                            )
                        }

                    } else {
                        result.dismiss === Swal.DismissReason.cancel
                    }
                }
            })

        }
    }
}
</script>
 
<style lang="scss" scoped>


.cashback-reward {
    width: 114px;
    position: fixed;
    top: 18.5rem;
    left: -1rem;

    @media (max-width: 576px) {
        width: 94px;
    }

    .fa {
        position: absolute;
        right: -2rem;
        width: 48px;
        height: 48px;
        z-index: 99;
        padding: 1rem;
    }

    .img-cashbaack {
        transform: scale(1);
        width: 100%;
        animation: tada 3s 3s infinite;
    }
}

@keyframes pulse {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
}

@keyframes tada {
    from {
        transform: scale3d(1, 1, 1);
    }

    10%,
    20% {
        transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg);
    }

    30%,
    50%,
    70%,
    90% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg);
    }

    40%,
    60%,
    80% {
        transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg);
    }

    to {
        transform: scale3d(1, 1, 1);
    }
}
</style>