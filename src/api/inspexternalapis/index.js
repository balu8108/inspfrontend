import axios from "axios";
import { EXTERNAL_INSP_BASE_URL } from "../../constants/staticurls";

const API = axios.create({ baseURL: EXTERNAL_INSP_BASE_URL });

// This is temporary secret key instead of this we will use clients secret key who is logged in
const secret_key = {
  secret_key: "U5Ga0Z1aaNlYHp0MjdEdXJ1aKVVVB1TP",
};

export const getAllChaptersApi = (body) =>
  API.post("/webservices/apis/chapters", { ...body, ...secret_key });
