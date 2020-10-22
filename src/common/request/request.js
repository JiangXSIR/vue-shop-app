import axios from 'axios';

const baseURL = "http://123.207.32.32:8000";
const timeOut = 5000;

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: baseURL,
    timeOut: timeOut
  });

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    console.log(config);
    return config;
  }, error => {
    console.log(error)
  });

  // 2.2.响应拦截
  instance.interceptors.response.use(config => {
    console.log(config);
    return config.data;
  }, error => {
    console.log(error)
  });

// 3.发送真正的网络请求
  return instance(config);
}

