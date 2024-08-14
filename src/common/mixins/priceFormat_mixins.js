export default {
  methods:{
    //分转元 110 => 1.1
    amountFormat_mixin(price) {
		const formattedPrice = (price/100).toFixed(2);
		const integerPart = parseInt(formattedPrice); // 提取整数部分
		const decimalPart = formattedPrice.split('.')[1]; // 提取小数部分
		if (decimalPart === '00') {
		  return integerPart.toString(); // 如果小数部分为00，则返回整数部分
		} else if (decimalPart === '0') {
		  return integerPart + '.'; // 如果小数部分只有一位，则加上小数点
		} else {
		  return formattedPrice; // 否则返回完整的格式化价格
		}
    },
  }
}