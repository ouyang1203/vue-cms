<template>
    <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要评论的内容(最多允许输入120字)" maxlength="120" v-model="commentMessage"></textarea>
        <mt-button type="primary" size="large" @click="addComment">发表评论</mt-button>
        <div class="cmt-list">
            <div class="cmt-item" v-for="(item,i) in commentList" :key="item.commentId">
                <div class="cmt-title">
                    第{{i+1}}楼&nbsp;&nbsp;用户：{{item.commentUser}}&nbsp;&nbsp;发表时间：{{item.commentTime|timeFormat('')}}
                </div>
                <div class="cmt-content">
                    {{item.commentMessage}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain>加载更多</mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            commentMessage:'',//评论内容
            pageIndex:1,//默认展示第一页评论数据
            pageSize:10,//默认一页展示10条数据
            commentList:[//避免后端接口无数据返回页面上空白
                {commentId:1,commentUser:'匿名用户',commentTime:'2019-11-23 17:34:23',commentMessage:'啊啊啊啊啊啊啊啊'},
                {commentId:2,commentUser:'匿名用户',commentTime:'2019-11-23 17:36:24',commentMessage:'日照香炉生紫烟呀'}
            ]
        }
    },
    created(){
        this.initComments();
    },
    methods:{
        initComments(){
            //this.id是父组件传递过来的
            var json = {commentModuleId:this.id,pageIndex:this.pageIndex,pageSize:this.pageSize}
            this.$http.post("comment/findComments",json).then(function(result){
                var body = result.body;
                if(body.status===0){
                    this.commentList = body.list;
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
                this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        },
        addComment(){
            //发送评论(this.module和this.id是父组件传递过来的参数)
            var json = {
                commentUserId:2,
                commentMessage:this.commentMessage,
                commentModule:this.module,
                commentModuleId:this.id,
                commentLevel:'3',
                commentIsWork:'Y'
            };
            this.$http.post("comment/addComment",json).then(function(result){
                var body = result.body;
                if(body.status===0){
                    //刷新评论列表
                    this.initComments();
                    //清除评论文本域中的输入
                    this.commentMessage = '';
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
                this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        }
    },
    //获取父组件传递过来的参数
    props:['id','module']
}
</script>
<style lang="scss">
.cmt-container{
    h3{
        font-size: 16px;
    }
    textarea{
        font-size:14px;
        height: 20%;
        margin: 0;
    }
    .cmt-list{
        margin: 1px;
        .cmt-item{
            font-size: 13px;
            .cmt-title{
                background-color: #aaa;
                line-height: 30px;
            }
            .cmt-content{
                line-height: 35px;
                text-indent: 2em;
            }
        }
    }
}
</style>