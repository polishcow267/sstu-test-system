import axios from 'axios';
import { getOrCreateDeviceId } from 'deviceId';

export default function setAuthTokenStored() { //установка токена для авторизации всех запросов
    localStorage.getItem("accessToken") ? axios.defaults.headers.common["Authorization"] = `Bearer ` + localStorage.getItem("accessToken") : delete axios.defaults.headers.common["Authorization"];

    const deviceId = getOrCreateDeviceId();
    axios.defaults.headers.common["X-Device-Id"] = deviceId;
}