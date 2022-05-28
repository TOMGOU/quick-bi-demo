import Vue from 'vue';
import axios from 'axios';
import Ajax from '@lx-frontend/ajax';
import Message from '@lx-frontend/wrap-element-ui/packages/singleMessage';
import interceptors from './interceptors';
import rest from './rest';

const showTips = (tips) => {
  Message({
    type: 'error',
    message: tips,
  });
};

Vue.use(Ajax);
// 实例化配置
const options = {
  baseUrl: '/api/v1',
  rest,
  requestInstance: axios,
  ...interceptors,
};

// 实例化
const ajax = new Ajax(options);

// code !== 0时，提示错误的函数, ajax.showTips(message)
ajax.extend({ showTips });

export default ajax;
