<template>
    <div class="photo-list-container">
        <!--顶部滑动条区域-->
        <van-tabs animated v-model="categoryId" @click="tableClick">
            <van-tab v-for="item in categoryList" :key="item.imageCategoryId" :name="item.imageCategoryId" :title="item.imageCategoryName">
                内容 {{ item.imageCategoryName }}--{{item.imageCategoryId}}
            </van-tab>
        </van-tabs>
        <!--内容区域-->
    </div>
</template>
<script>
export default {
    data(){
        return {
            categoryList:this.GLOBAL.categoryList,
            categoryId:1//设置默认激活第一个分类
        }
    },
    created(){
        this.initImageCategoryList()
    },
    methods:{
        initImageCategoryList(){
            //加载所有图片的分类列表
            this.$http.get(this.GLOBAL.findAllImageCategoryPath).then(function(result){
                var body = result.body;
                if(body.status===0){
                    //获取后端接口返回的图片的分类列表
                    this.categoryList = body.list;
                    //在最开始添加一个查询全部的分类
                    this.categoryList.unshift({"imageCategoryCode":"all","imageCategoryId":1,"imageCategoryName":"全部"});
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
               this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        },
        tableClick(){
            //获取点击的模块ID
            //console.log(this.categoryId);
        }
    }
}
</script>
<style lang="scss">
.photo-list-container{
    .van-tab--active{
        color: #007aff;
    }
}

</style>