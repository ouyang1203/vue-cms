<template>
    <div class="goodsList">
        <div class="goodsItem">
            <img src="http://192.168.1.3:3000/images/goods/iphoneX.webp" alt="">
            <h1 class="title">【分期免息】Apple/苹果 iPhone X 苹果x手机国行iphonex全网通4G</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥3650.00</span>
                    <span class="old">￥4000.00</span>
                </p>
                <p class="sell">
                    <span class="status">热卖中</span>
                    <span class="status">剩余60件</span>
                </p>
            </div>
        </div>
        <div class="goodsItem">
            <img src="http://192.168.1.3:3000/images/goods/huaweiMate30Pro.webp" alt="">
            <h1 class="title">【12期免息】Huawei/华为Mate 30 Pro 5G麒麟990徕卡四摄5G芯片智能手机</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥6899.00</span>
                    <span class="old">￥7000.00</span>
                </p>
                <p class="sell">
                    <span class="status">热卖中</span>
                    <span class="status">剩余30件</span>
                </p>
            </div>
        </div>
        <div class="goodsItem">
            <img src="http://192.168.1.3:3000/images/goods/iphoneX.webp" alt="">
            <h1 class="title">【分期免息】Apple/苹果 iPhone X 苹果x手机国行iphonex全网通4G</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥3650.00</span>
                    <span class="old">￥4000.00</span>
                </p>
                <p class="sell">
                    <span class="status">热卖中</span>
                    <span class="status">剩余60件</span>
                </p>
            </div>
        </div>
        <div class="goodsItem">
            <img src="http://192.168.1.3:3000/images/goods/huaweiMate30Pro.webp" alt="">
            <h1 class="title">【12期免息】Huawei/华为Mate 30 Pro 5G麒麟990徕卡四摄5G芯片智能手机</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥6899.00</span>
                    <span class="old">￥7000.00</span>
                </p>
                <p class="sell">
                    <span class="status">热卖中</span>
                    <span class="status">剩余30件</span>
                </p>
            </div>
        </div>
        <div class="goodsItem">
            <img src="http://192.168.1.3:3000/images/goods/iphoneX.webp" alt="">
            <h1 class="title">【分期免息】Apple/苹果 iPhone X 苹果x手机国行iphonex全网通4G</h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥3650.00</span>
                    <span class="old">￥4000.00</span>
                </p>
                <p class="sell">
                    <span class="status">热卖中</span>
                    <span class="status">剩余60件</span>
                </p>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
.goodsList{
    display:flex;
    flex-wrap: wrap;
    padding: 6px;
    justify-content: space-between;
    .goodsItem{
        width: 49%;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin:4px 0;
        padding: 1px;
        display: flex;
        flex-direction: column;
        justify-content:space-between;
        min-height: 293px;
        img{
            width: 100%;
        }
        .info{
            background-color: #eee;
            p{
                margin:0;
                padding: 5px;
            }
            .price{
                .now{
                    color: red;
                    font-weight: bold;
                    font-size: 16px;
                }
                .old{
                    text-decoration:line-through;
                    font-size: 12px;
                    margin-left: 10px;
                }
            }
            .sell{
                display:flex;
                justify-content:space-between;
                font-size: 12px;
            }
        }
    }
    .title{
        font-size: 14px;
    }
}
</style>