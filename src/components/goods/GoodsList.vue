<template>
    <div class="goodsList">
        <router-link class="goodsItem" v-for="item in goodsBasicInfoList" :key="item.goodsId"
         :to="'/home/goodeInfo/'+item.goodsId" tag="div">
            <img :src="item.goodsImagePath">
            <h1 class="title" v-text="item.goodsTitle"></h1>
            <div class="info">
                <p class="price">
                    <span class="now">￥{{item.goodsSellPrice}}</span>
                    <span class="old">￥{{item.goodsMarketPrice}}</span>
                </p>
                <p class="sell">
                    <span class="status">热卖中</span>
                    <span class="status">剩余{{item.goodsStockQuantity}}件</span>
                </p>
            </div>
        </router-link>
        <mt-button type="danger" size="large" plain @click="getMoreGoods">
            {{pageHaveNextFlag?loadMoreCommentText:noMoreDataText}}
        </mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            goodsBasicInfoList:this.GLOBAL.goodsBasicInfoList,
            pageHaveNextFlag:true,
            loadMoreCommentText:this.GLOBAL.loadMoreCommentText,//加载更多数据的按钮文字
            noMoreDataText:this.GLOBAL.noMoreDataText,//没有更多数据可供加载时将页面按钮文字替换掉
            pageIndex:1,
            pageSize:this.GLOBAL.globalPageSize
        }
    },
    created(){
        this.initGoodsBasicInfoList('init');
    },
    methods:{
        initGoodsBasicInfoList(way){
            var json = {goodsEnableFlag:'Y',pageIndex:this.pageIndex,pageSize:this.pageSize};
            this.$http.post(this.GLOBAL.goodsBasicInfoListPath,json).then(function(result){
                var body = result.body;
                if(body.status===0){
                    //获取后端接口返回的商品数据
                    if(way==='init'){
                        this.goodsBasicInfoList = body.list;
                    }else{
                        this.goodsBasicInfoList = this.goodsBasicInfoList.concat(body.list);
                    }
                    if(this.pageIndex===body.totalPage){
                        //当前页大小和总页数大小一致时不允许再次点击加载更多按钮
                        this.pageHaveNextFlag = false;
                    }
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
                this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        },
        getMoreGoods(){
            this.pageIndex++;
            this.initGoodsBasicInfoList('load');
        }
    }
    
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