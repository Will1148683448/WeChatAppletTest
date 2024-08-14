/**
 * 数字或字符串前面补0
 * @param {Number | String} str 需要前面补0的字符串或数字
 * @param {Number} length 对齐长度
 * @returns 
 */
export function pad(str, length = 2) {
	str += ''
	while (str.length < length) {
		str = '0' + str
	}
	return str.slice(-length)
}
