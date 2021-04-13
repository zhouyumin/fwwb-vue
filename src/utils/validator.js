// 设置身份证号的验证规则
export const checkIdNumber = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入身份证号'))
  } else {
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
    if (reg.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的身份证号'))
    }
  }
}
// 设置手机号的验证规则
export const checkTel = (rule, value, callback) => {
  if (!value) {
    callback(new Error('请输入联系方式'))
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
    const reg2 = /0\d{2,3}-\d{7,8}/
    if (reg.test(value)) {
      callback()
    } else if (reg2.test(value)) {
      callback()
    } else {
      return callback(new Error('请输入正确的电话'))
    }
  }
}
