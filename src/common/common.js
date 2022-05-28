// import store from '../vuex/store.js'

// 从vuex中获取该用户全部的权限列表
// const authList = store.state.authList

/**
 * 筛选用户的子菜单
 * authList 全部权限，通常为 this.$store.state.authList
 * totalAuth 如:  [{
                    name: '卡券核销',
                    path: '/coupon/couponcheck',
                    auth: 'coupon.write_off'
                  }]
 */
export function shwoAuthList(authList, totalAuth) {
  return totalAuth.filter(item => authList.includes(item.auth));
}

/* 判断元素是否含有该className */
export function hasClass(el, className) {
  const reg = new RegExp(`(^|\\s)${className}(\\s|$)`); // className前面或后面有空格
  return reg.test(el.className);
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  const newClass = el.className.split(' '); // 变数组
  newClass.push(className);
  el.className = newClass.join(' ');
}
