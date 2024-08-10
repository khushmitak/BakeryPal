import { addDays, format, parseISO } from "date-fns";

export function storeCookie(key, value) {
    document.cookie = `${key}=${value};SameSite=Strict`;
}

export function getCookie(key) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${key}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift()
    } else {
        return "";
    }
}

export const clearCookies = () => {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf("=");
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";
    }
};
export function formatDate(dateString) {
    return `${format(parseISO(String(dateString)), "M/d/yyyy h:mm a")}`;
}
