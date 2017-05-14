import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { LoginUsers, taskListObj } from './data/user';

import MD5 from 'MD5/md5.js' // MD5
import Lodash from 'lodash' 


export default {

	bootstrap() {

		let mock = new MockAdapter(axios);

		// mock success request
	    mock.onGet('/success').reply(200, {
	      msg: 'success'
	    });

	    // mock error request
	    mock.onGet('/error').reply(500, {
	      msg: 'failure'
	    });

	    //登录
	    mock.onPost('/login').reply(config => {
	      let {username, password} = JSON.parse(config.data);
	      return new Promise((resolve, reject) => {
	        let user = null;
	        setTimeout(() => {
	          let hasUser = LoginUsers.some(u => {
	            if (u.username === username && u.password === (MD5('vue') + password)) {
	              user = JSON.parse(JSON.stringify(u));
	              user.password = undefined;
	              return true;
	            }
	          });
	          if (hasUser) {
	            resolve([200, { code: 200, msg: '请求成功', user }]);
	          } else {
	            resolve([200, { code: 500, msg: '账号或密码错误' }]);
	          }
	        }, 1000);
	      });
	    });


	    mock.onPost('/syncTask').reply(config => {
	      let { currentPage } = JSON.parse(config.data);
	      let start = (currentPage - 1) * 20;
	      let end = currentPage * 20;

	      return new Promise((resolve, reject) => {
	        setTimeout(() => {
	          let totalNum = taskListObj.taskList.length;
	          if ( totalNum >= 20) {
	            resolve([200, { code: 200, msg: '请求成功', total: totalNum, pageData: _.slice(taskListObj.taskList, start, end) }]);
	          } else {
	            resolve([200, { code: 200, msg: '请求成功1', total: totalNum, pageData: taskListObj.taskList }]);
	          }

	        }, 1000);
	      });
	    });


	}

}