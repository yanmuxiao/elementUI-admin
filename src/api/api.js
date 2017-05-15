
import Mock from './../mockData/dataAPI.js'
Mock.bootstrap();

import axios from 'axios';


let base = '';


// 用户登录接口
export const requestLogin = params => { 
	return axios.post(`${base}/login`, params).then(res => res.data); 
};


// 获取用户列表接口
export const getUserList = params => { 
	return axios.post(`${base}/userList`, params).then(res => res.data); 
};

// 删除单个用户
export const removeUserList = params => { 
	return axios.post(`${base}/rmUserList`, params).then(res => res.data); 
};




