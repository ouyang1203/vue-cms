<template>
    <div>
        <!--轮播图组件-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in lunboList" :key="item.imageId">
                <img :src="item.imagePath" :title="item.imageTitle">
            </mt-swipe-item>
        </mt-swipe>
        <div class="mui-content myDiv">
            <ul class="mui-table-view mui-grid-view mui-grid-9">
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/newList">
                        <span class="mui-icon mui-icon-home"></span>
                        <div class="mui-media-body">新闻资讯</div>
                    </router-link>
                </li>
                <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
                    <router-link to="/home/imageShare">
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
import { Toast} from 'mint-ui';
export default {
    data(){
        return {
            //用于保存后端接口返回的轮播图片列表信息(默认提供两张vscode发布的图片,避免后端服务未启动时轮播图显示空白)
            lunboList:[
                {imageId:1,imagePath:"http://localhost:3000/images/1.jpg",imageTitle:"轮播图-1.jpg"},
                {imageId:1,imagePath:"http://localhost:3000/images/beach.jpg",imageTitle:"轮播图-beach.jpg"}
            ]
        }
    },
    created(){
        this.getLunbo();
    },
    methods:{
        getLunbo(){//获取轮播图数据的方法
            this.$http.get('image/getLunBo').then(function(result){
                var body = result.body;
                if(body.status===0){
                    //获取后端接口返回的轮播图数据
                    this.lunboList = body.list;
                }else{
                    Toast({
                        message:  body.statusText,
                        position: 'top',
                        duration: 3000
                    });
                }
            },function(error){
                Toast({
                        message:  '网络异常,目前展示的为静态页面,请联系管理员检查接口是否正常。。',
                        position: 'top',
                        duration: 3000
                });
            });
        }
    }
}
</script>
<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
}
.mint-swipe-item{
    img{
        //设置轮播图的样式
        width: 100%;
        height:100%;
    }
}
/**替换原生样式*/
.mui-grid-view.mui-grid-9{
    background-color:#fff;
    border:none;
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    border:none;
}
</style>