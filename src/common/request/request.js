import axios from 'axios';

const baseURL = 'http://timemeetyou.com:8889/api/private/v1/';
const timeOut = 5000;
const Authorization = 'Authorization';

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: baseURL,
    timeOut: timeOut,
    methods: config.method
  });

  // 2.axios的拦截器
  // 2.1.请求拦截的作用
  instance.interceptors.request.use(config => {
    config.headers[Authorization] = window.sessionStorage.getItem('token');
    console.log("interceptors request", config);
    return config;
  }, error => {
    console.log(error)
  });

  // 2.2.响应拦截
  instance.interceptors.response.use(config => {
    // console.log("interceptors response", config);
    return config.data;
  }, error => {
    console.log(error)
  });

// 3.发送真正的网络请求
  return instance(config);
}
