import cookie from '@/common/cookie';
import cache from '@/common/cache';
import ajax from './index';

function normalizeRes(res) {
  const { data = {} } = res;
  if (res && typeof data === 'string') {
    res.data = {
      code: -1,
      message: res.statusText,
    };
  } else if (data.code && data.message) {
    return res;
  } else {
    res = {
      data: {
        code: -1,
        message: '未知错误',
      },
    };
  }
  return res;
}

function getIdentier (search, rest) {
  let href = search.split('_from_corp_id=')[1];
  if (href && href.indexOf('&auth_code=')) {
    [href] = href.split('&auth_code=');
  }
  if (href) {
    return rest.login.getIdentifier(`${href}/identifier`);
  }
  return '';
}

async function operNoneLogin (ctx) {
  if (!ctx.logining) { // 只使第一次401的hash
    ctx.logining = true;

    // 避免第一次登录的用户重复进入登录页面
    if (!window.location.pathname.startsWith('/login') && !(window.location.pathname === '/')) {
      // 保存服务商地址
      const { pathname, hash, href } = window.location;

      if (href.indexOf('auth_code=')) {
        cache.setSessionData('serviceProvider', pathname);
      }

      if (hash) {
        ctx.next = encodeURIComponent(hash);
      }

      // 根据_from_corp_id参数，获取企业标识
      let identifier = cache.getSessionData('identifier');
      const res = await getIdentier(window.location.search, ctx.rest);
      if (res && res.code === 0) {
        identifier = res.data;
      }

      let redirect = '';
      if (identifier) { // 服务商
        redirect = `/login/${identifier}`;
      } else {
        redirect = `/login?${ctx.next}`;
      }
      ctx.$store.commit('UPDATE_REDIRECT', redirect);
    } else {
      ctx.logining = false;
    }
  }
  return true;
}

const requestInterceptor = (ctx: typeof ajax) => (config) => {
  try {
    const csrftoken = cookie.getCookie('csrf-token');
    const access_token = cache.getLocalStorageData('access_token');
    
    if (!/^(GET|HEAD|OPTIONS|TRACE)$/i.test(config.method) && !config.withCredentials) {
      config.headers['X-CSRF-Token'] = csrftoken;
    }
    config.headers['access-token'] = access_token;
    return config;
  } catch (e) {
    console.log('requestInterceptor catch:', e);
  }
};

// const responseOkInterceptor = (ctx: typeof ajax) => (response) => {
//   const { config, request } = response;
//   const { method, url } = config || request;
//   console.log(`${method} ${url} success!`);
//   return response;
// }

const responseErrorInterceptor = (ctx: typeof ajax) => (err) => {
  const { response } = err;
  if (response) {
    const { status } = response;
    switch (status) {
      case 404:
        ctx.showTips('请求发生404错误');
        break;
      case 500:
        ctx.showTips('请求发生500错误');
        break;
      case 504:
        ctx.showTips('请求超时');
        break;
      case 400: // 用户没有csrf-token
      case 401: // 用户没有登录态
        ctx.showTips('未登录');
        operNoneLogin(ctx);
        break;
      default:
        ctx.showTips(`error:${err.response.status}`);
        break;
    }
    const res = normalizeRes(err.response);
    // return Promise.reject(res.data); // 返回接口返回的错误信息
    return res;
  }
  return null;
};

// const responseNotOkHandler = (res) => {
//   const { message } = res.data;
//   message && typeof message === 'string' && showTips(message);
// };


export default {
  requestInterceptor,
  // responseOkInterceptor,
  responseErrorInterceptor,
  // responseNotOkHandler,
};
