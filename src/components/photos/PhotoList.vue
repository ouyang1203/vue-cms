<template>
    <div class="photo-list-container">
        <!--顶部滑动条区域-->
        <van-tabs animated v-model="categoryId" @click="tableClick">
            <van-tab v-for="item in categoryList" :key="item.imageCategoryId" :name="item.imageCategoryId" :title="item.imageCategoryName">
            </van-tab>
        </van-tabs>
        <!--内容区域-->
        
            <div class="img-display-zone"> 
                <div class="img-display-div" v-for="img in imageList" :key="img.imageId">
                    <router-link :to="'/home/photoInfo/'+img.imageId">
                        <img v-lazy="img.imagePath" >
                        <div class="info">
                            <h1 class="info-title">
                                {{img.imageTitle}}
                            </h1>
                            <div class="info-body">
                                {{img.imageContent}}
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return {
            categoryList:this.GLOBAL.categoryList,
            categoryId:1,//设置默认激活第一个分类
            imageList:this.GLOBAL.imageList //图片列表数组
        }
    },
    created(){
        this.initImageCategoryList();
        this.initImageList(this.categoryId);
    },
    methods:{
        initImageCategoryList(){
            var json = {imageCategoryShowFlag:'Y'};
            //加载所有图片的分类列表
            this.$http.post(this.GLOBAL.findAllImageCategoryPath,json).then(function(result){
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
        initImageList(categoryId){
            var json = {imageCategoryId:this.categoryId,imageCategoryShowFlag:'Y'};
            if(this.categoryId===1){
                json = {imageCategoryShowFlag:'Y'};
            }
            //加载指定分类下所有图片的列表
            this.$http.post(this.GLOBAL.findAllImagesByCategoryPath,json).then(function(result){
                var body = result.body;
                if(body.status===0){
                    //获取后端接口返回的分类下所有图片的列表
                    this.imageList = body.list;
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
               this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        },
        tableClick(){
            //获取点击的模块ID
            this.initImageList(this.categoryId);
        }
    }
}
</script>
<style lang="scss">
.photo-list-container{
    .van-tab--active{
        color: #007aff;
    }
    .img-display-zone{
        padding:4px;
        margin-bottom: 0px;
        .img-display-div{
            background-color: #cccccc;
            text-align: center;
            margin-bottom: 6px;
            box-shadow: 0 0 4px #999;
            position: relative;
            img{
                width:100%;
                vertical-align: middle;//避免图片比div更小看到背景色
            }
            .info{
                color:white;
                text-align: left;
                position:absolute;
                bottom:0px;
                background-color:rgba(0,0,0,0.4);
                max-height: 84px;
                .info-title{
                    font-size: 14px;
                }
                .info-body{
                    font-size: 13px;
                    max-height: 70px;
                    overflow: hidden;
                }
            }
        }
    }
}

</style>