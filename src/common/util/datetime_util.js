/**
 * 方法目录：
 * 
 * 1.getDate(time) //字符串或时间戳转Date
 * 2.parseDateToJson(date)  //将Date转为json对象
 * 3.formatDate(date, format) //将Date日期类型格式化为字符串
 * 4.getNextDay(date) //获取后一天
 * 5.getPreDay(date) //获取前一天
 * 6.getToday() //获取今天
 * 7.getHanziWeek(weekIndex) //获取汉字周几
 * 8.friendlyDate(time, {locale, threshold, format}) //聊天列表时间格式化
 */


/**
 * 字符串或时间戳转Date（iOS依然不认识2020-12-12，需要转换为2020/12/12）
 * @param {String | Number | Date} time 格式化时间或时间戳，如果是Date类型就直接返回
 * @returns 
 */
export function getDate(time) {
    if (time instanceof Date) {
		return time
	}
	switch (typeof time) {
		case 'string': {
			// 2020-12-12T12:12:12.000Z、2020-12-12T12:12:12.000
			if (time.indexOf('T') > -1) {
				return new Date(time)
			}
			return new Date(time.replace(/-/g, '/'))
		}
		default:
			return new Date(time)
	}
}

/**
 * 将Date转为json对象
 * @param {Date} date 
 * @returns {Object}
 */
export function parseDateToJson(date) {
    // const date = new Date();
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const week = date.getDay(); // 周几，0 表示周日，1 到 6 分别表示周一到周六
    const hanziWeek = getHanziWeek(week)
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    // console.log('~~~~~~~~getWeekList',year,month,day,week,hanziWeek,hours,minutes,seconds)
    const formatDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    const formatDate = `${year}-${month}-${day}`
    return {
        year,
        month,
        day,
        week,
        hanziWeek,
        hours,
        minutes,
        seconds,
        formatDateTime,
        formatDate
    };
}

function pad(str, length = 2) {
	str += ''
	while (str.length < length) {
		str = '0' + str
	}
	return str.slice(-length)
}

const _parser = {
	yyyy: (dateObj) => {
		return pad(dateObj.year, 4)
	},
	yy: (dateObj) => {
		return pad(dateObj.year)
	},
	MM: (dateObj) => {
		return pad(dateObj.month)
	},
	M: (dateObj) => {
		return dateObj.month
	},
	dd: (dateObj) => {
		return pad(dateObj.day)
	},
	d: (dateObj) => {
		return dateObj.day
	},
	hh: (dateObj) => {
		return pad(dateObj.hour)
	},
	h: (dateObj) => {
		return dateObj.hour
	},
	mm: (dateObj) => {
		return pad(dateObj.minute)
	},
	m: (dateObj) => {
		return dateObj.minute
	},
	ss: (dateObj) => {
		return pad(dateObj.second)
	},
	s: (dateObj) => {
		return dateObj.second
	},
	SSS: (dateObj) => {
		return pad(dateObj.millisecond, 3)
	},
	S: (dateObj) => {
		return dateObj.millisecond
	},
}

/**
 * 将Date日期类型格式化为字符串
 * @param {Date | String | Number} date Nate类型或格式化时间字符串或时间戳
 * @param {String} format 格式
 * @returns 
 */
export function formatDate(date, format = 'yyyy/MM/dd hh:mm:ss') {
	if (!date && date !== 0) {
		return ''
	}
	date = getDate(date)
	const dateObj = {
		year: date.getFullYear(),
		month: date.getMonth() + 1,
		day: date.getDate(),
		hour: date.getHours(),
		minute: date.getMinutes(),
		second: date.getSeconds(),
		millisecond: date.getMilliseconds()
	}
	const tokenRegExp = /yyyy|yy|MM|M|dd|d|hh|h|mm|m|ss|s|SSS|SS|S/
	let flag = true
	let result = format
	while (flag) {
		flag = false
		result = result.replace(tokenRegExp, function(matched) {
			flag = true
			return _parser[matched](dateObj)
		})
	}
	return result
}

/**
 * 获取后一天
 * @param {Date} date 
 * @returns {Date}
 */
export function getNextDay(date) {
    date.setDate(date.getDate() + 1);
    return date;
}

/**
 * 获取前一天
 * @param {Date} date 
 * @returns {Date}
 */
export function getPreDay(date) {
    date.setDate(date.getDate() - 1);
    return date;
}

/**
 * 获取今天
 * @returns {Date}
 */
export function getToday() {
    let date = new Date();
    return date;
}

/**
 * 转周几汉字
 * @param {Number}
 * @returns 
 */
export function getHanziWeek(weekIndex) {
    const weeks = ['周日', '周一', '周二','周三', '周四', '周五', '周六']
    return weeks[weekIndex];
}

/**
 * 聊天列表时间格式化
 * @param {String | Number | Date} time 
 * @param {Object} options 
 * @param {String} options.locale 国际化
 * @param {Number} options.threshold 时间阀值[小于阀值（显示刚刚），大于阀值显示年前或天前] 单位毫秒
 * @param {String} options.format 格式
 * @returns 
 */
export function friendlyDate(time, {
	locale = 'zh',
	threshold = [60000, 3600000],
	format = 'yyyy/MM/dd hh:mm:ss'
}) {
	if (time === '-') {
		return time
	}
	if (!time && time !== 0) {
		return ''
	}
	const localeText = {
		zh: {
			year: '年',
			month: '月',
			day: '天',
			hour: '小时',
			minute: '分钟',
			second: '秒',
			ago: '前',
			later: '后',
			justNow: '刚刚',
			soon: '马上',
			template: '{num}{unit}{suffix}'
		},
		en: {
			year: 'year',
			month: 'month',
			day: 'day',
			hour: 'hour',
			minute: 'minute',
			second: 'second',
			ago: 'ago',
			later: 'later',
			justNow: 'just now',
			soon: 'soon',
			template: '{num} {unit} {suffix}'
		}
	}
	const text = localeText[locale] || localeText.zh
	let date = getDate(time)
	let ms = date.getTime() - Date.now()
	let absMs = Math.abs(ms)
	if (absMs < threshold[0]) {
		return ms < 0 ? text.justNow : text.soon
	}
	if (absMs >= threshold[1]) {
		return formatDate(date, format)
	}
	let num
	let unit
	let suffix = text.later
	if (ms < 0) {
		suffix = text.ago
		ms = -ms
	}
	const seconds = Math.floor((ms) / 1000)
	const minutes = Math.floor(seconds / 60)
	const hours = Math.floor(minutes / 60)
	const days = Math.floor(hours / 24)
	const months = Math.floor(days / 30)
	const years = Math.floor(months / 12)
	switch (true) {
		case years > 0:
			num = years
			unit = text.year
			break
		case months > 0:
			num = months
			unit = text.month
			break
		case days > 0:
			num = days
			unit = text.day
			break
		case hours > 0:
			num = hours
			unit = text.hour
			break
		case minutes > 0:
			num = minutes
			unit = text.minute
			break
		default:
			num = seconds
			unit = text.second
			break
	}

	if (locale === 'en') {
		if (num === 1) {
			num = 'a'
		} else {
			unit += 's'
		}
	}

	return text.template.replace(/{\s*num\s*}/g, num + '').replace(/{\s*unit\s*}/g, unit).replace(/{\s*suffix\s*}/g,
		suffix)
}