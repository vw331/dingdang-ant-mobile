import axios from 'axios'
import { Toast } from 'antd-mobile'


const $http = axios.create({
  //baseURL: '',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  },
})

// 添加响应拦截器
$http.interceptors.response.use(function (response) {

  return response;
}, function (error) {

  if( error.response ) {
    const { data } = error.response
    Toast.fail(data.message);
  }

  return Promise.reject(error);
});

export default $http
