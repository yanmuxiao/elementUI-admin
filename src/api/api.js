
import Mock from './../mockData/dataAPI.js'
Mock.bootstrap();

import axios from 'axios';


let base = '';

// 用户登录接口
export const requestLogin = params => { 
	return axios.post(`${base}/login`, params).then(res => res.data); 
};

export const getTaskList = params => { 
	return axios.post(`${base}/syncTask`, params).then(res => res.data); 
};
