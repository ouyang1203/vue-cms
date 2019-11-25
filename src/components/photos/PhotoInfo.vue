<template>
    <div class="imageInfo-container">
        <van-panel>
            <!--自定义vant的header-->
            <div slot="header" class="header">
                <!--标题区域-->
                <h3 class="title" v-text="imageInfo.imageTitle"></h3>
                <!--子标题区域-->
                <p class="subtitle">
                    <span>发表于：{{imageInfo.imageCreateTime|timeFormat('')}}</span>
                    <span v-text="'阅读量：'+imageInfo.imageViewTime"></span>
                </p>
            </div>
            <hr>
            <!--缩略图区域-->
            <!--<img :src="imageInfo.imagePath">-->
            <div class="thumb">
                <vue-preview :slides="slide1"></vue-preview>
            </div>
            <!--图片内容区域-->
            <div style="font-size:13px;text-align:justify;color:#746969;" v-html="imageInfo.imageContent"></div>
             <!--评论区域-->
            <comment-box :id="this.id" :module="this.module"></comment-box>
        </van-panel>
    </div>
</template>
<script>
//导入comment评论子组件
import comment from '../subComponents/comment.vue';
export default {
    data(){
        return{
            id:this.$route.params.id,
            imageInfo:{},
            module:'photo',
            slide1:this.GLOBAL.slide1
        }
    },created(){
        this.initImageInfo();
    },methods:{
        //图片详情
        initImageInfo(){
            var json = {"imageId":this.id,"updateFlag":"Y"};
            this.$http.post(this.GLOBAL.getImageInfoPath,json).then(function(result){
                var body = result.body;
                if(body.status===0){
                    this.imageInfo = body.message;
                    //去掉静态页面数据
                    this.slide1 = [];
                    var smallImage = {
                        src:body.message.imagePath,
                        msrc:body.message.imagePath,
                        alt:body.message.imageContent,
                        title:body.message.imageTitle,
                        w:600,
                        h:400
                    };
                    this.slide1.push(smallImage);
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
                this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        },
        addPhoto(){

        }
    },
    components:{
        'comment-box':comment
    }
}
</script>
<style lang="scss">
//调整vant默认样式
.imageInfo-container{
    img{
        width:100%;
    }
    .header{
        .title{
            font-size:14px;
            text-align: center;
            margin: 10px;
            color: crimson;
        }
        .subtitle{
            font-size: 12px;
            color:#226aff;
            display: flex;
            justify-content: space-between;
            padding: 2px;
        }
    }
    .thumb{
        //设置缩略图大小
        figure{
            //width:80px;
            //height:100px;
            font-size: 14px;
        }
        img{
            margin: 4px;
            box-shadow: 0 0 8px #999;
        }
    }
}

</style>