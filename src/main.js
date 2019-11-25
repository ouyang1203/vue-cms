/**
 * 项目所有JS入口
*/
import Vue from 'vue';
//导入VUE路由的包
import VueRouter from 'vue-router';
/**
 * 导入Vue-Resource
 */
import vueResource from 'vue-resource';
/**
 * 按需导入Mint-Ui中的组件以及对应CSS样式,并将这个组件注册到Vue里面
 * 导入Mint-Ui中轮播组件
 */
import { Header,Swipe, SwipeItem,Button} from 'mint-ui';
import 'mint-ui/lib/style.css';
/**引入MUI样式 */
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
//导入moment时间插件
import moment from 'moment';
//导入App根组件
import app from './App.vue';
//导入项目的route.js路由模块
import router from './router.js';
//导入全局变量文件
import global from './Common.vue';
//导入vant组件替换MUI的滑动组件
import { Tab, Tabs,Lazyload,Panel,NavBar } from 'vant';
//导入vant组件样式
import 'vant/lib/index.css';
/***
 * vue-preview缩略图组件
 */
import VuePreview from 'vue-preview'

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(Tab).use(Tabs).use(Lazyload,{
    lazyComponent: true
}).use(Panel).use(NavBar);
Vue.use(VuePreview, {
    mainClass: 'pswp--minimal--dark',
    barsSize: {top: 0, bottom: 0},
    captionEl: false,
    fullscreenEl: false,
    shareEl: false,
    bgOpacity: 0.85,
    tapToClose: true,
    tapToToggleControls: false
  });

/**设置Vue-Router全局属性,必须要在Vue.use(vueResource);后面才行*/
Vue.http.options.emulateJSON = false;
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;
/**
 * 设置全局访问根节点
 * 修改为调试模式，手机和电脑都能正常访问,在package.json的dev中新增--host 192.168.1.3 重启服务即可
 *  */
Vue.http.options.root='http://192.168.1.3:8080';
Vue.prototype.GLOBAL = global

//时间格式化filter
Vue.filter('timeFormat',function(data,pattern){
    if(pattern==''){
        pattern = 'YYYY-MM-DD HH:mm:ss';
    }
    return moment(data).format(pattern);
});

var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router:router//挂载路由对象到vm实例上
});