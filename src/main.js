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
import { Header,Swipe, SwipeItem} from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(Header.name, Header);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
/**引入MUI样式 */
import './lib/mui/css/mui.min.css';
import './lib/mui/css/icons-extra.css';
//导入App根组件
import app from './App.vue';
//导入项目的route.js路由模块
import router from './router.js';

Vue.use(VueRouter);
Vue.use(vueResource);
var vm = new Vue({
    el:'#app',
    render:c=>c(app),
    router:router//挂载路由对象到vm实例上
});