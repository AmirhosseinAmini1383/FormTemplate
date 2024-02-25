import axios from "axios";
export const Service = axios.create({
  baseURL: "http://authservice.azhadev.ir/api/auth/",
});
