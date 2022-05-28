// 续保重构接口配置项
export const optionsV2 = {
  autoShowErr: true,
  baseUrl: '/api/v2',
  cache: false,
};

export const configOptionsV2 = {
  autoShowErr: false,
  baseUrl: '/api/v2',
  cache: false,
};

// 不拦截 code !== 0 请求展示错误信息
export const doNotShowErr = {
  cache: false,
  autoShowErr: false,
};
