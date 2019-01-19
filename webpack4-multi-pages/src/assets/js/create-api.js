import { getAxios } from "./axios";
import gConf from "gConf";

export const api = getAxios({
  baseURL: gConf.apiHost.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

export const apiLocal = getAxios({
  baseURL: "/api/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});

// export const setHttpAuth = token => {
//   const basicAuth = getBasicAuth(token);
//   api.defaults.headers.common.Authorization = basicAuth;
// };
