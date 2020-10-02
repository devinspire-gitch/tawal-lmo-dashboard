import axios from "axios";
import { createBrowserHistory } from "history";
import get from "get-value";
import { apiBaseUrl } from "../constants/environment";
import emitter from "./EventEmitter";

const API = () => {
  const history = createBrowserHistory();

  const accessToken = localStorage.getItem("accessToken");

  const axiosConf = {
    baseURL: apiBaseUrl
  };

  if (accessToken) {
    axiosConf.headers = {
      Authorization: accessToken
    };
  }

  const axiosInstance = axios.create(axiosConf);

  // Configuring request interceptors
  axiosInstance.interceptors.request.use(
    config => {
      emitter.emit("ShowLoader", get(config, "showLoader", true));
      return config;
    },
    error => {
      emitter.emit("ShowLoader", false);
      return Promise.reject(error);
    }
  );

  // Configuring response interceptors
  axiosInstance.interceptors.response.use(
    response => {
      emitter.emit("ShowLoader", false);
      return response;
    },
    error => {
      emitter.emit("ShowLoader", false);
      if (
        get(error, "config.errorHandle", true) &&
        get(error, "response.status", false)
      ) {
        switch (error.response.status) {
          case 401:
            history.replace("/user/login");
            window.location.reload();
            break;
          default:
            emitter.emit(
              "ShowAlert",
              get(error, "response.data.error.message", "Error")
            );
            break;
        }
      }
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default API;
