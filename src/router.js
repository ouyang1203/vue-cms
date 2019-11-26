import VueRouter from 'vue-router';

/***
 * 导入对应的路由组件
 */
import Home from './components/tabbar/HomeContainer.vue';
import Member from './components/tabbar/MemberContainer.vue';
import ShopCar from './components/tabbar/ShopCarContainer.vue';
import Search from './components/tabbar/SearchContainer.vue';
import NewsList from './components/news/NewsList.vue';
import NewsDetail from './components/news/NewsDetail.vue';
import PhotoList from './components/photos/PhotoList.vue';
import PhotoInfo from './components/photos/photoInfo.vue';
import GoodsList from './components/goods/GoodsList.vue';
import GoodsInfo from './components/goods/GoodsInfo.vue';

var router = new VueRouter({
    routes:[//配置路由规则
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/member',component:Member},
        {path:'/shop',component:ShopCar},
        {path:'/search',component:Search},
        {path:'/home/newList',component:NewsList},
        {path:'/home/newsDetail/:id',component:NewsDetail},
        {path:'/home/photoList',component:PhotoList},
        {path:'/home/photoInfo/:id',component:PhotoInfo},
        {path:'/home/shoppingMail',component:GoodsList},
        {path:'/home/goodeInfo/:id',component:GoodsInfo}
    ],
    linkActiveClass:"mui-active"//覆盖默认的路由高亮类为MUI提供的mui-active样式(默认的高亮类是：router-link-active)
});

/**暴露出路由属性 */
export default router;