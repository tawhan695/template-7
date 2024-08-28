import Cookies from "js-cookie";

export default function log({ next }) {
    if (Cookies.get('accessToken')) {
        return window.location.href = "/member"
    }
    return next()
}