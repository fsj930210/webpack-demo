import axios from "axios";

export function getAxios (settings, timeout = 10000) {
  const ins = axios.create(settings);
  axios.defaults.timeout = timeout;
  setInterceptors(ins);
  return ins;
}

function setInterceptors (axiosIns) {
  axiosIns.interceptors.request.use(req => {
    return req;
  }, error => {
    console.error(error);
    return Promise.reject(error);
  });
  axiosIns.interceptors.response.use(res => {
    if (res.status >= 200 && res.status < 300 && res.data.success) {
      return res.data.data;
    }
    return Promise.reject(res.data);
  }, error => {
    return Promise.reject(error.data || (error.response && error.response.data) || {
      code: 5001,
      message: "api error"
    });
  });
}
