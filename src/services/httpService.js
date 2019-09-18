import axios from "axios";
import logger from "./logService";
import { toast } from "react-toastify";
import {getJwt} from "./authSevice";

axios.interceptors.request.use(function (config) {
  const TOKEN = getJwt();
  config.headers.Authorization =   `Bearer ${TOKEN}`;  
  return config;
});
axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

    if(error.response.status==401){
      toast.error("You must be logged in or register to perform this action.");
    }
  if (!expectedError) {
    logger.log(error);
    toast.error("An unexpected error occurrred.");
  }

  return Promise.reject(error);
});

export default {
  get:  axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete
};
