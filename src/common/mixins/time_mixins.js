// 时间戳格式化为时间字符串
export const time_mixins = {
	methods: {
		time_mixins(timestamp,type) {
			const date = new Date(timestamp);
			const year = date.getFullYear();
			const month = ('0' + (date.getMonth() + 1)).slice(-2);
			const day = ('0' + date.getDate()).slice(-2);
			const hours = ('0' + date.getHours()).slice(-2);
			const minutes = ('0' + date.getMinutes()).slice(-2);
			const seconds = ('0' + date.getSeconds()).slice(-2);
			if(type==1){
				const formattedDate = year + '年' + month + '月' + day + '日' + hours + ':' + minutes;
				return formattedDate
			}
			if(type==2){
				const formattedDate = year + '.' + month + '.' + day;
				return formattedDate
			}
			if(type==3){
				const formattedDate = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;
				return formattedDate
			}
			if(type==4){
				const formattedDate = year + '/' + month + '/' + day ;
				return formattedDate
			}
			
		}
	}
}