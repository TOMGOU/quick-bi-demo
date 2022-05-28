import { Message } from 'element-ui';

export default {
  regexpMap: {
    regexp_mobile: /^1\d{10}$/, // 手机校验
    car_plate_number: /^[\u4e00-\u9fa5]{1}[A-Z]{1}[A-Z0-9]{4,5}[A-Z0-9\u4e00-\u9fa5]{1}$/i, // 车牌号校验
    regexp_vin: /^[A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]{8}$/i, // 车架号
    regexp_last7char_or_full_vin: /^([A-HJ-NPR-Z\d]{8}[\dX][A-HJ-NPR-Z\d]){0,1}[A-HJ-NPR-Z\d]{7}$/, // 车架号后七位
    regexp_coupon_code: /^\d{12}$/, // 优惠券
    regexp_order_id: /^[0-9a-zA-Z]{0,50}$/, // 业务单号
    regexp_url: /^((https|http|ftp|rtsp|mms)?:\/\/)[^\s]+/, // 网址校验
    regexp_Identification_card: /^\d{13,17}[0-9xX]$/, // 身份证号码格式校验
    regexp_engine_number: /^[A-Za-z0-9]{1,20}$/, // 发动机号
    regexp_tel: /(^(\d{3,4}-)?\d{7,8})$|(^1\d{10}$)/, // 校验电话号码
    regexp_url_head: /^https?:\/\//, // 表单验证url，需以http://，或https://开头
    regexp_note: /^.{0,20}$/, // 20个字符以内
    regexp_rule_name: /^.{0,30}$/, // 30个字符以内(规则名称）
  },
  /**
   * @description 校验表单是否为空是数字值
   * @param options value={ required: '为空值提示语',
                            number: '请输入数值',
                            min: {
                              value: 1,
                              message: '最小值提示语'
                            },
                            max: {
                              value: 1000000,
                              message: '最大值提示语'
                            }
   * @returns {function(*, *=, *)} 返回值，
   */
  checkNum(options) {
    return (rule, value, cb) => {
      let message = '';
      if (value === '' && options.required) { // 校验是否为空
        message = options.required;
      } else if (options.number && Number.isNaN(Number(value))) { // 校验是否是数字 Number.isNaN(Number('1.2.3')); // true
        message = options.number;
      } else if (options.max && options.max.value < value) { // 校验是否超过最大值
        ({ message } = options.max);
      } else if (options.min && options.min.value > value) { // 校验是否超过最小值
        ({ message } = options.min);
      } else if (options.int && Number(value) !== parseInt(value, 10)) { // 输入的是不是整数
        message = options.int;
      }
      message ? cb(new Error(message)) : cb();
    };
  },
  /**
   * @description 校验表单是否为有值
   * @param options
   * @returns {function(*, *=, *)}
   */
  checkSelNull(options) {
    return (rule, value, cb) => {
      let message = '';
      if (!value && options.required) { // 校验是否为空
        message = options.required;
      }
      message ? cb(new Error(message)) : cb();
    };
  },
  /**
   * 校验input表单
   * @param options value={nullValue: 空值提示语，haveValue：有值不符合校验规则的提示语，regex: 校验规则的正则表达式，type：Message弹窗方式的错误提示 }
   */
  checkInput(options) {
    return (rule, value, cb) => {
      let message = '';
      if (value === '' && options.nullValue) {
        message = options.nullValue;
      } else if (value !== '' && options.haveValue && !this.regexpMap[options.regex].test(value)) {
        message = options.haveValue;
      }
      message ? cb(new Error(message)) : cb();
    };
  },
  /**
   * @description Message提示方式的表单校验
   * @param options options = {
      value: '',
      nullValue: '空值错误提示',
      haveValue: '不符合校验规则提示',
      regex: 'regexp_mobile'
    }
   * @returns {boolean}
   */
  checkInputTips(options) {
    let message = '';
    if ((typeof options.value === 'undefined' || options.value === null || options.value === '') && options.nullValue) {
      message = options.nullValue;
    } else if (options.value !== '' && options.haveValue && !this.regexpMap[options.regex].test(options.value)) {
      message = options.haveValue;
    }
    if (message) {
      Message({
        type: 'warning',
        message,
      });
      return false;
    }
    return true;
  },
};
