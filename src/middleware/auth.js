import Cookies from "js-cookie";

export default function auth({ next }) {
    if (!Cookies.get('accessToken')) {
      return window.location.href = "/"
    }
    return next();
}