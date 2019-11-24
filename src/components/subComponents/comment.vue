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
                    {{item.commentMessage==='undefined'?commentContentUndefinedMessage:item.commentMessage}}
                </div>
            </div>
        </div>
        <mt-button type="danger" size="large" plain @click="getMore" style="">
            {{pageHaveNextFlag?loadMoreCommentText:noMoreDataText}}
        </mt-button>
    </div>
</template>
<script>
export default {
    data(){
        return {
            commentContentUndefinedMessage:this.GLOBAL.commentContentUndefinedMessage,
            commentMessage:'',//评论内容
            pageIndex:1,//默认展示第一页评论数据
            pageSize:this.GLOBAL.globalPageSize,//全局分页大小设置
            pageHaveNextFlag:true,//控制加载评论按钮是否能再次点击
            loadMoreCommentText:this.GLOBAL.loadMoreCommentText,//加载更多数据的按钮文字
            noMoreDataText:this.GLOBAL.noMoreDataText,//没有更多数据可供加载时将页面按钮文字替换掉
            commentList:this.GLOBAL.commentList//避免后端接口无数据返回页面上空白
        }
    },
    created(){
        this.initComments('init');
    },
    methods:{
        initComments(way){
            //this.id是父组件传递过来的
            var json = {commentModuleId:this.id,pageIndex:this.pageIndex,pageSize:this.pageSize}
            this.$http.post(this.GLOBAL.commentFindCommentsPath,json).then(function(result){
                var body = result.body;
                if(body.status===0){
                    if(way==='init'){
                        this.commentList = body.list;
                    }else{
                        this.commentList = this.commentList.concat(body.list);
                    }
                    if(this.pageIndex===body.totalPage){
                        //当前页大小和总页数大小一致时不允许再次点击加载更多按钮
                        this.pageHaveNextFlag = false;
                    }
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
            this.$http.post(this.GLOBAL.commentAddCommentPath,json).then(function(result){
                var body = result.body;
                if(body.status===0){
                    //刷新评论列表,使用后端接口返回的JSON对象直接插入到列表中
                    this.commentList.splice(0,0,body.message);
                    //清除评论文本域中的输入
                    this.commentMessage = '';
                    this.pageHaveNextFlag = true;
                }else{
                    this.GLOBAL.error(body.statusText,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
                }
            },function(error){
                this.GLOBAL.error(this.GLOBAL.overTimeErrorMessage,this.GLOBAL.errorToastPosition,this.GLOBAL.errorToastDuration);
            });
        },
        getMore(){
            //加载下一页的数据
            this.pageIndex++;
            this.initComments('load');
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