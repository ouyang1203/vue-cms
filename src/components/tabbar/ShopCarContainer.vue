<template>
    <div class="shop-car-container">
        <!--商品列表区域-->
        <div class="goods-list">
            <div class="switch">
                <van-switch v-model="checked" size="20px"/>
            </div>
            <div class="content">
                <van-card
                        num="2"
                        price="6899.00"
                        desc="【12期免息】Huawei/华为Mate 30 Pro 5G麒麟990徕卡四摄5G芯片智能手机"  
                        title="【12期免息】Huawei/华为Mate 30 Pro 5G麒麟990徕卡四摄5G芯片智能手机"
                        thumb="http://192.168.1.3:3000/images/goods/cellphone/huaweiMate30Pro.webp">
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
            checked:true
        }
    },methods:{

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