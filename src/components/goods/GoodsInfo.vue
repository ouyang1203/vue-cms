<template>
    <div class="goodsinfo-container">
        <transition 
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!--商品轮播图区域-->
        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <swiper :list="lunboList" :isFull="false"></swiper>
                </div>
            </div>
        </div>
        <!--商品购买区域-->
        <div class="mui-card">
            <div class="mui-card-header" v-text="goodsItem.goodsTitle"></div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥{{goodsItem.goodsMarketPrice}}</del>&nbsp;&nbsp;
                        销售价：<span class="new_price">￥{{goodsItem.goodsSellPrice}}</span>
                    </p>
                    <p class="buy_amount">
                        <span v-text="'购买数量：'"></span><numbox @func="getSelectedGoodsNumber" :maxNumber="goodsItem.goodsStockQuantity"></numbox>
                    </p>
                    <p class="goods-info-btn">
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small" @click="addToShopCar">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数区域-->
        <div class="goods-info-detail">
            <div class="mui-card">
                <div class="mui-card-header">商品参数</div>
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        <p>商品货号：{{goodsItem.goodsNumber}}</p>
                        <p>库存数量：{{goodsItem.goodsStockQuantity}}件</p>
                        <p>上架时间：{{goodsItem.goodsCreateTime|timeFormat('')}}</p>
                    </div>
                </div>
                <div class="mui-card-footer">
                    <mt-button type="primary" plain size="large" @click="getGoodsDesc">图文介绍</mt-button>
                    <mt-button type="danger" plain size="large" @click="getComments">商品评论</mt-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * 抽离公共的轮播图组件
*/
import swiper from '../subComponents/swiper.vue';
import numbox from '../subComponents/goods_numberBox.vue';
export default {
    data(){
        return {
            id:this.$route.params.id,
            lunboList:this.GLOBAL.lunboList,
            goodsItem:{},
            module:'goods',//指定当前业务模块
            ballFlag:false,//控制小球隐藏和显示的标识
            selectedCount:1//保存用户选中的商品数量，默认值为：1
        }
    },
    mounted(){
        this.initGoosInfo();
    },
    created(){
        this.getLunbo(); 
    },
    methods:{
        getLunbo(){//获取轮播图数据的方法
            var json = {imageCategoryId:9,imageCategoryShowFlag:'N',imageCategoryObjectId:this.id};
            this.$http.post(this.GLOBAL.homePageLunBoPath,json).then(function(result){
                var body = result.body;
                if(body.status===0){
                    //获取后端接口返回的轮播图数据
                    this.lunboList = body.list;
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
               this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        },
        initGoosInfo(){
            //加载商品信息需要在加载到内存的时候就调用，否则无法将库存量子组件。
            var url = this.GLOBAL.findGoodsBasicInfoById+"/"+this.id;
            this.$http.get(url).then(function(result){
                var body = result.body;
                if(body.status===0){
                    //获取后端接口返回的轮播图数据
                    this.goodsItem = body.message;
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
               this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        },
        getGoodsDesc(){
            var goodsId = this.id;
            //获取商品详情(编程式导航)
            this.$router.push({name:"goodsdesc",params:{goodsId}});
        },
        getComments(){
            var goodsId = this.id;
            //获取商品评论(编程式导航)
            this.$router.push({name:"goodscomments",params:{goodsId}});
        },
        addToShopCar(){
            this.ballFlag = !this.ballFlag;
        },
        beforeEnter(el){
            el.style.transform = "translate(0,0)";
        },
        enter(el,done){
            el.offsetWidth;
            //获取小球的初始位置
            var ballPosition = this.$refs.ball.getBoundingClientRect();
            //使用DOM操作获取shopCarBadge徽标在页面中的位置
            var shopCarBadgePosition = document.getElementById("shopCarBadge").getBoundingClientRect();
            var left = shopCarBadgePosition.left-ballPosition.left;
            var height = shopCarBadgePosition.top-ballPosition.top;
            el.style.transform = "translate("+left+"px,"+height+"px)";
            el.style.transition = "all 0.8s cubic-bezier(.4,-0.3,1,.68)";
            done();
        },
        afterEnter(el){
            this.ballFlag = !this.ballFlag;
        },
        getSelectedGoodsNumber(count){
            //获取本次购买的商品数量，需要从numbox中调用这个方法把对应值回传
            this.selectedCount = count;
            console.log("商品明细页面获取的购买数量："+this.selectedCount);
        }
    },
    components:{
        swiper,
        numbox
    }
}
</script>
<style lang="scss">
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;
    .ball{
        width: 15px;
        height: 15px;
        border-top-left-radius: 50%;
        border-top-right-radius: 50%;
        border-bottom-left-radius: 50%;
        border-bottom-right-radius: 50%;
        background-color: red;
        position:absolute;
        z-index:99;
        top:395px;
        left:142px;
    }
    .new_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        padding-left: 0px;
        button{
            margin:1.5%;
        }
    }
    .buy_amount{
        line-height: 32px;
    }
    .goods-info-btn{
        display: flex;
        justify-content:center;
        button{
            width:30%;
            margin: 10px;
        }
    }
}
</style>