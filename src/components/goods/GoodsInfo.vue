<template>
    <div class="goodsinfo-container">
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
            <div class="mui-card-header">商品名称标题</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p class="price">
                        市场价：<del>￥4000</del>&nbsp;&nbsp;销售价：<span class="new_price">￥3650</span>
                    </p>
                    <p class="buy_amount">
                        购买数量：<numbox></numbox>
                    </p>
                    <p>
                        <mt-button type="primary" size="small">立即购买</mt-button>
                        <mt-button type="danger" size="small">加入购物车</mt-button>
                    </p>
                </div>
            </div>
        </div>
        <!--商品参数区域-->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：</p>
                    <p>库存数量：</p>
                    <p>上架时间: </p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" plain size="large">图文介绍</mt-button>
                <mt-button type="danger" plain size="large">商品评论</mt-button>
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
            module:'goods',//指定当前业务模块
        }
    },
    created(){
        this.getLunbo()
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
    .new_price{
        color: red;
        font-size: 16px;
        font-weight: bold;
    }
    .mui-card-footer{
        display: block;
        padding-left: 0px;
        button{
            margin:15px;
        }
    }
}
</style>