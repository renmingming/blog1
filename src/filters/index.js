// 时间格式YYYY-MM-DD HH:mm:ss 转化为YYYY-MM-DD
export function getDateTime (dataTime) {
  let time = dataTime
  let str = time.substring(0, 10)
  let strArr = str.split('-')
  let lastTime = `${strArr[0]}年${strArr[1]}月${strArr[2]}日`
  return lastTime
}
