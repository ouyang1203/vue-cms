<template>
    <div>
        <!--swiper组件抽离-->
        <swiper :list="lunboList" :isFull="true"></swiper>
        <div class="mui-content myDiv">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/newList">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/photoList">
                        <span class="mui-icon mui-icon-image"><span class="mui-badge">5</span></span>
                        <div class="mui-media-body">图片分享</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/shoppingMail">
                        <span class="mui-icon mui-icon-extra mui-icon-extra-cart"></span>
                        <div class="mui-media-body">商品购买</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/sendMsg">
                        <span class="mui-icon mui-icon-chat"></span>
                        <div class="mui-media-body">留言反馈</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/videos">
                        <span class="mui-icon mui-icon-videocam"></span>
                        <div class="mui-media-body">视频专区</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/contrant">
                        <span class="mui-icon mui-icon-phone"></span>
                        <div class="mui-media-body">联系我们</div>
                    </router-link>
                </li>
            </ul> 
		</div>
    </div>
</template>
<script>
/**
 * 抽离公共的轮播图组件
*/
import swiper from '../subComponents/swiper.vue';
export default {
    data(){
        return {
            //用于保存后端接口返回的轮播图片列表信息(默认提供两张vscode发布的图片,避免后端服务未启动时轮播图显示空白)
            lunboList:this.GLOBAL.lunboList
        }
    },
    created(){
        this.getLunbo();
    },
    methods:{
        getLunbo(){//获取轮播图数据的方法
            var json = {imageCategoryId:2,imageCategoryObjectId:-1,imageCategoryShowFlag:'N'};
            this.$http.post(this.GLOBAL.homePageLunBoPath,json).then(function(result){
                var body = result.body;
                if(body.status===0){
                    //获取后端接口返回的轮播图数据
                    this.lunboList = body.list;
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
               this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        }
    },
    components:{
        swiper
    }
}
</script>
<style lang="scss" scoped>
/**替换原生样式*/
.mui-grid-view.mui-grid-9{
    background-color:#fff;
    border:none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border:none;
}
</style>