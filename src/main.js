/**
 * 项目所有JS入口
*/
import Vue from 'vue';
/**
 * 按需导入Mint-Ui中的组件以及对应CSS样式,并将这个组件注册到Vue里面
 * 
 */
import { Header } from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(Header.name, Header);
/**引入MUI样式 */
import './lib/mui/css/mui.min.css';
//导入App根组件
import app from './App.vue';

var vm = new Vue({
    el:'#app',

    render:c=>c(app)
});