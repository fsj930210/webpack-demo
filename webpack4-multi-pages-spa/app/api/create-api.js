import { getAxios } from "./axios";
import gConf from "gConf";

export const api = getAxios({
  baseURL: gConf.apiHost.replace(/\/$/, ""),
  headers: {
    "Content-Type": "application/x-www-form-urlencoded"
  }
});
