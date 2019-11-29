/**
 * 项目所有JS入口
*/
import Vue from 'vue';
//导入Vuex组件
import Vuex from 'vuex';
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
import { Tab, Tabs,Lazyload,Panel,NavBar,Stepper,Switch,Card} from 'vant';
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
Vue.use(Vuex);
Vue.use(VueRouter);
Vue.use(vueResource);
Vue.use(Tab).use(Tabs).use(Lazyload,{
    lazyComponent: true
}).use(Panel).use(NavBar).use(Stepper)
.use(Switch).use(Card);
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
/**
 * 页面加载时先去localStorage获取之前保存的数据
*/
var goodsList = JSON.parse(localStorage.getItem("goodsList")||'[]');
var totalGoodsCount = JSON.parse(localStorage.getItem("totalGoodsCount")||0);
/**
 * new Vuex.Store();实例，得到一个数据仓储对象
*/
var store = new Vuex.Store({
    state:{
        //类比为Vue中的data,专门用来存储数据
        //如果在组件中想访问state中的数据只能通过this.$store.state.totalGoodsCount获取
        totalGoodsCount:totalGoodsCount,
        goodsList:goodsList//存储购物车中的数据(商品ID，商品数量，商品单价，商品是否被选中开关)
    },
    mutations:{
        /**
         * 注意：如果要操作store中的state的值，只能通过mutations提供的方法才能操作对应数据，不推荐直接操作state的值;
         * 万一导致了数据的紊乱，不能快速定位到错误的原因，因为每个组件都可能有操作数据的方法。
         * 如果组件中想要调用mutations中的方法，只能使用this.$store.commit('方法名');
         * 注意:mutations中的方法最多只能传递两个参数，其中第一个是固定的state，第二个参数是组件传递过来的参数,
         * 这个参数可以是数组/对象
        */
       addGoodsToCar(state,goodsInfo){
            /**
             * goodsListInfo是包含商品ID，商品数量，商品单价，商品是否被选中开关
             * 1. 如果购物车中已经有这个商品，那么只需要更新数量
             * 2. 如果没有，则直接把这个商品数据push到goodsList
            */
           //判定商品是否已经存在购物车的标志
           var goodsExists = false;
           state.goodsList.some(function(item){
                if(item.goodsId==goodsInfo.goodsId){
                    item.goodsSelectedCount += parseInt(goodsInfo.goodsSelectedCount);
                    goodsExists = true;
                    return true;
                }
           });
           if(!goodsExists){
                state.goodsList.unshift(goodsInfo);
           }
           //计算购物车中所有商品的数量
           state.totalGoodsCount += parseInt(goodsInfo.goodsSelectedCount);
           //将添加之后的数据暂存到本地的localStorage中
           localStorage.setItem("goodsList",JSON.stringify(state.goodsList));
           localStorage.setItem("totalGoodsCount",JSON.stringify(state.totalGoodsCount));
       }
    },
    getters:{
        /**
         * 这里的getters只负责对外提供数据，不负责修改数据，需要修改数据要到mutations中的方法定义
         */
        getTotalGoodsNumber:function(state){
            return state.totalGoodsCount;
        }
    }
});

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
    router:router,//挂载路由对象到vm实例上
    store:store //将Vuex定义的存储挂载到Vue对象上
});