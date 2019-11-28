<template>
    <div>
        商品详情
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

    },
    methods:{
        initGoodsDesc(){
            var url = this.GLOBAL.findGoodsBasicInfoById+"/"+this.id;
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
<style lang="scss" scoped>

</style>