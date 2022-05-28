import Message from '@lx-frontend/wrap-element-ui/packages/singleMessage';
import cache from './cache';

// 校验上传图片规则：类型 jpg | png 不大于2M
export function checkUploadImgRules(file) {
  const typeList = ['image/jpeg', 'image/jpg', 'image/png']
  const isType = typeList.includes(file.type)
  const isLt2M = (file.size / 1024 / 1024) < 2
  if (!isType) Message.error('建议上传的图片类型为jpg、png, 请重新选择')
  if (!isLt2M) Message.error('建议上传的图片大小不超过2MB, 请重新选择')
  return isType && isLt2M
}

// 获取上传图片的显示url
export function getUploadImg(images, type = 'default', token = false) {
  const imgObj = {
    image: '', // 原图
    thumbnail_image: '', // 缩略图
    upload_image: '', // 上传图
  }
  let accessToken = ''
  images = images || imgObj
  if (token) {
    accessToken = `?access_token=${cache.getLocalStorageData('access_token')}`
  }
  if (type === 'thumb' && images.thumbnail_image) {
    return `${images.thumbnail_image}${accessToken}`
  }
  if (images.image) {
    return `${images.image}${accessToken}`
  }
}

