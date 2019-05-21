import axios from 'axios'
import { Indicator } from 'mint-ui';

//请求拦截
axios.interceptors.request.use(config =>{
    Indicator.open();
    return config;
},error =>{
    return Promise.reject(error)
})

//响应拦截
axios.interceptors.response.use(response =>{
    Indicator.close();
    return response;
},error =>{
    Indicator.close();
    return Promise.reject(error)
})