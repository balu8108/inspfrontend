import axios from "axios";
import { BASE_URL } from "../../constants/staticurls";
const API = axios.create({ withCredentials: true, baseURL: BASE_URL });

export const loginApi = (secret_token) =>
  API.post(`/auth/login/${secret_token}`);
export const loginApiWithIP = () => API.post(`/auth/login_with_ip`);
export const loginWithUidApi = (unique_id) =>
  API.post(`auth/login_with_uid/${unique_id}`);
