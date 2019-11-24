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
import { Tab, Tabs } from 'vant';
//导入vant组件样式
import 'vant/lib/tab/style';
import 'vant/lib/tabs/style';

Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(Tab).use(Tabs);


/**设置Vue-Router全局属性,必须要在Vue.use(vueResource);后面才行*/
Vue.http.options.emulateJSON = false;
Vue.http.options.crossOrigin = true;
Vue.http.options.emulateHTTP = true;
/**
 * 设置全局访问根节点
 * 本地开发时可以使用http://localhost:8080
 * 局域网内手机访问需要使用nginx代理一下修改为http://192.168.1.3/
 *  */
Vue.http.options.root='http://localhost:8080';
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