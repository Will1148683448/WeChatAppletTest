//处理表情字符串截取
function truncated(str, num){
    let s = '';
    for(let v of str){
        s += v;
        num--;
        if(num<=0){
            break;
        }
    }
    return s;
}

export default {
	methods: {
		/**
		 * @param {Object} str 
		 * @param {Object} start
		 * @param {Object} end
		 * @param {Object} showDot
		 */
		subStr_mixins(str,strNum,showDot=false) {
			if (str == undefined || str == null ) return ''
			else {
				if(str.length>strNum){
					// if(showDot) return str.substr(0,strNum)+'...'
					// else return str.substr(0,strNum)
					if(showDot) return truncated(str,strNum) +'...'
					else return truncated(str,strNum)
				} 
				else return str
			}
		},
		strlen(str) {
			 let count = 0;  //初始化字节数递加变量并获取字符串参数的字符个数
			    if (str) {  //如果存在字符串，则执行
			        let len = str.length; 
			        for (let i = 0; i < len; i++) {  //遍历字符串，枚举每个字符
			            if (str.charCodeAt(i) > 255) {  //字符编码大于255，说明是双字节字符(即是中文)
			                count += 2;  //则累加2个
			            } else {
			                count++;  //否则递加一次
			            }
			        }
			        console.log(count);
			        return count;  //返回字节数
			    } else {
			   		console.log(0);
			        return 0;  //如果参数为空，则返回0个
			    }
		}
	}
}
