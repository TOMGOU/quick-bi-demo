import Vue from 'vue';
import WWOpenData from '../plugins/WWOpenData';
import config from './config';

Vue.use(WWOpenData);
export default new WWOpenData(config);
