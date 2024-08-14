//全局静态资源路径混入
import Config from '@/config/index.js';

export default {
    data() { 
        return { 
            STATIC_URL: Config.StaticLocalUrl+'/', //静态资源路径
            
            // IMG_URL: Config.StaticWebUrl+'/image/', //正式使用网络图片路径 
            IMG_URL: Config.StaticLocalUrl+'/image/', //开发时使用本地图片路径 

            LOCAL_IMG_URL: Config.StaticLocalUrl+'/imgs/', //本地图片路径 
        } 
    }
}