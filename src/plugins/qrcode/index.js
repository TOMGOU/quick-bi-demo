/**
 * @name vue封装的二维码生成器插件
 */
import QRCode from './components/QRCode.vue';

const Qr = {
  install(Vue, options) {
    Vue.component('qrcode', QRCode);
  },
};

export default Qr;

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(Qr);
}
