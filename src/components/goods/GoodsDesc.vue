<template>
    <div class="goodsdesc-container">
        <h3 v-text="goodsDesc.goodsTitle"></h3>
        <hr>
        <div class="content" v-html="goodsDesc.goodsDetailInfo"></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:this.$route.params.id,
            goodsDesc:{}
        }
    },
    created(){
        this.initGoodsDesc();
    },
    methods:{
        initGoodsDesc(){
            var url = this.GLOBAL.findGoodsDetailById+"/"+this.id;
            this.$http.get(url).then(function(result){
                var body = result.body;
                if(body.status===0){
                    //获取后端接口返回的商品详情数据
                    this.goodsDesc = body.message;
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
               this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        }
    }
}
</script>
<style lang="scss">
.goodsdesc-container{
    padding: 4px;
    h3{
        font-size: 16px;
        color: #226aff;
        text-align: center;
        margin: 15px 0;
    }
    .content{
        img{
            width:100%;
        }
    }
}
</style>