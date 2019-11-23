<template>
    <div class="newsDetail-container">
        
        <div class="mui-card">
            <div class="mui-card-header mui-card-media">
                <div class="mui-media-body">
                    <!--标题区域-->
                    <h3 class="title">{{newsDetail.newsTitle}}</h3>
                    <!--子标题区域-->
                    <p class="subtitle">
                        <span>发表于：{{newsDetail.newsCreatedDate|timeFormat('')}}</span>
                        <span>阅读量：{{newsDetail.newsViewCount}}</span>
                    </p>
                </div>
            </div>
            <!--新闻内容区域-->
            <div class="mui-card-content newsContent" v-html="newsDetail.newsContent"></div>
            <!--评论内容区域-->
            <comment-box :id="this.id" :module="this.module"></comment-box>
        </div>
        <!--
        <h3 class="title" v-text="newsDetail.newsTitle"></h3>
        <p class="subtitle">
            <span>发表于：{{newsDetail.newsCreatedDate|timeFormat('')}}</span>
            <span>阅读量：{{newsDetail.newsViewCount}}</span>
        </p>
        <div calss="newsContent" v-html="newsDetail.newsContent"></div>
        -->
    </div>
</template>
<script>
import { Toast} from 'mint-ui';
//导入comment评论子组件
import comment from '../subComponents/comment.vue';
var newsDetail = {
    newsId:1,
    newsImagePath:"http://localhost:3000/images/shuijiao.jpg",
    newsTitle:"幸福",
    newsContent:"能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？",
    newsCreatedDate:'2019-11-23 11:45:00',
    newsViewCount:3
};
export default {
    data(){
        return {
            newsDetail,
            module:'news',//指定当前业务模块
            //将URL中传递的ID挂载到data上面，方便后续调用
            id: this.$route.params.id
        };
    },
    created() {
        this.initNewInfo();
    },methods: {
        initNewInfo(){
            var json = {"newsId":this.id};
            this.$http.post("news/getNewsInfo",json).then(function(result){
                var body = result.body;
                if(body.status===0){
                    this.newsDetail = body.message;
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
                this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        }
    },
    components:{//注册子组件
        'comment-box':comment
    }
}
</script>
<style lang="scss">
//修改MUI原生样式
.mui-card{
    margin: 2px;
}
.mui-media-body{
    margin-left: 0px!important;
}
.newsDetail-container{
    //padding: 0 2px;
    //height: 100%;
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
    }
    .newsContent{
        img{
            //避免文章内容中存在图片太大导致只看到一部分的问题
            width: 100%;
        }
    }
}
</style>