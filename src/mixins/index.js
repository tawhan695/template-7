import Cookies from "js-cookie";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
});

export default {
    setup() {
        return {
        }
    },
    data() {
        return {
            ASKMEBET_URL: import.meta.env.VITE_ASKMEBET_URL,
            LINE_URL: import.meta.env.VITE_LINE_URL,
            Toast,
            Swal,
            BACKGROUND: [
                "/bg/1.jpg", "/bg/2.jpg", "/bg/3.jpg", "/bg/4.jpg", "/bg/5.jpg",
            ]
        }
    },
    computed: {
    },
    created() {
        // LOAD BACKGROUND FROM COOKIES
        if (Cookies.get('background')) this.setBackgroundTheme()


    },
    methods: {
        isObjectEmpty(obj) {
            return Object.keys(obj).length === 0 && obj.constructor === Object
        },
        isNumber(evt) {
            evt = evt ? evt : window.event;
            const charCode = evt.which ? evt.which : evt.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 46) evt.preventDefault();
            else return true;
        },
        toCurrency(i) { /* ทำฟอแมท ยอดเงิน */
            let val = (i / 1).toFixed(2).replace(',', '.')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        },
        formatNumber(i, f) {
            let val = (i / 1).toFixed(f).replace(",", ".");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        toBankFormat(number) {
            return ("" + number).replace(/[^0-9]/g, '')
                .replace(/(\d{3})(\d{1})(\d{5})(\d{1})/, '$1-$2-$3-$4')
        },
        toPhoneFormat(phone) {
            return ("" + phone).replace(/[^0-9]/g, '')
                .replace(/(\d{3})/, '$1-')
        },
        copy(id) {
            let copyText = document.getElementById(id);
            copyText.select();
            copyText.setSelectionRange(0, 99999);
            document.execCommand("copy");
            if (id != 'suggest') {
                Swal.fire({
                    title: "คัดลอกเลขบัญชีแล้ว",
                    html: "<span style='color:red'>เพื่อความรวดเร็วของระบบ <br>กรุณาโอนเข้ามาเป็นเศษสตางค์นะคะ เช่น 200.81 , 500.79 </span>"
                })
            }

        },
        setBackgroundTheme() {
            document.body.style.background = 'linear-gradient(to bottom, #00000099 20%, #00000099), url("' + Cookies.get('background') + '")'
            document.body.style.background = '-webkit-gradient(linear, left top, left bottom, color-stop(20%, #00000099), to(#00000099)), url("' + Cookies.get('background') + '")'
            document.body.style.backgroundColor = "#000000"
            document.body.style.backgroundSize = "cover"
            document.body.style.backgroundPosition = "center"
            document.body.style.backgroundAttachment = "fixed"
        },

    },

}