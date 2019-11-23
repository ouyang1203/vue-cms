<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in newsList" :key="item.newsId">
                <!--router-link 中动态绑定ID时要将固定字符串用单引号包含起来-->
                <router-link :to="'/home/newsDetail/'+item.newsId">
                    <img class="mui-media-object mui-pull-left" :src="item.newsImagePath">
                    <div class="mui-media-body">
                        <h1>{{item.newsTitle}}</h1>
                        <p class='mui-ellipsis'>
                            <span class="">发表时间：{{item.newsCreatedDate|timeFormat('')}}</span>
                            <span>点击{{item.newsViewCount}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>
<script>
import { Toast} from 'mint-ui';
export default {
    data(){
        return {
            newsList:[
                /**构造三条数据避免后端接口未启动报错导致列表为空*/
                {newsId:1,newsImagePath:"http://localhost:3000/images/shuijiao.jpg",newsTitle:"幸福",newsCreatedDate:'2019-11-23 11:45:00',newsViewCount:3},
                {newsId:2,newsImagePath:"http://localhost:3000/images/muwu.jpg",newsTitle:"木屋",newsCreatedDate:'2019-11-23 11:45:01',newsViewCount:5},
                {newsId:3,newsImagePath:"http://localhost:3000/images/cbd.jpg",newsTitle:"CBD",newsCreatedDate:'2019-11-23 11:46:00',newsViewCount:7}
            ]
        }
    },
    created(){
        this.getAllNews();
    },
    methods:{
        getAllNews(){
            this.$http.get('news/getAllNews').then(function(result){
                var body = result.body;
                if(body.status===0){
                    //获取后端接口返回的新闻数据
                    this.newsList = body.list;
                }else{
                    Toast({
                        message:  body.statusText,
                        position: 'top',
                        duration: 3000
                    });
                }
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    /**修改原生样式 */
    .mui-table-view{
        li{
            h1{font-size: 14px}
            .mui-ellipsis{
                font-size: 12px;
                color: #226aff;
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>