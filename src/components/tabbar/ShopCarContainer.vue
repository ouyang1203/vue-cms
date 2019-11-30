<template>
    <div class="shop-car-container">
        <!--商品列表区域-->
        <div class="goods-list" v-for="item in goodsCarList" :key="item.goodsCarId">
            <div class="switch">
                <van-switch v-model="checked" size="20px"/>
            </div>
            <div class="content">
                <van-card
                        :num="item.goodsCount"
                        :price="item.goodsSellPrice"
                        :desc="item.goodsTitle"  
                        :title="item.goodsTitle"
                        :thumb="item.goodsImagePath">
                        <div slot="footer">
                            <number-box></number-box>
                            <van-button size="mini" class="delOption">删除</van-button>
                        </div>
                    </van-card>
            </div>
        </div>
        <!--结算区域-->
        <div class="goods-list">
            <div class="mui-card">
                <div class="mui-card-content">
                    <div class="mui-card-content-inner">
                        结算区域
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import number from '../subComponents/shopCar_numberBox.vue';
export default {
    data(){
        return {
            checked:true,
            goodsCarList:[]
        }
    },created(){
        this.initGoodsList();
    },methods:{
        initGoodsList(){
            //初始化购物车中的数据
            var goodsIds = [];
            //获取localStorge中暂存的商品
            var getGoodsList = this.$store.getters.getGoodsList;
            if(getGoodsList.length<=0){
                return ;
            }
            getGoodsList.forEach(function(item){
                goodsIds.push(item.goodsId);
            });
            var json = {'user_id':0,'goodsIds':goodsIds.join(',')};
            this.$http.post(this.GLOBAL.findGoodsCarList,json).then(function(result){
                var body = result.body;
                if(body.status===0){
                    //获取后端接口返回的新闻数据
                    this.goodsCarList = body.list;
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
                this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        }
    },components:{
        'number-box':number
    }
}
</script>
<style lang="scss">
.shop-car-container{
    background-color: #eee;
    overflow: hidden;
    .goods-list{
        display: flex;
        background-color:#fff;
        margin: 10px;
        .switch{
            width:10%;
            align-self:center;
            float: left;
        }
        .content{
            width:90%;
            .van-card{
                padding: 10px;
                margin:10px;
                background-color: #fff;
            }
        }
        .delOption{
            margin-top: 20px;
        }
    }
}
</style>