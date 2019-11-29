<template>
    <div>
        <!--评论内容区域-->
        <comment-box :id="this.id" :module="this.module"></comment-box>
    </div>
</template>
<script>
//导入comment评论子组件
import comment from '../subComponents/comment.vue';
export default {
    data(){
        return {
            id:this.$route.params.id,//获取本次点击的商品ID
            module:'goods'//加载商品模块的评论
        }
    },
    created(){

    },
    methods:{

    },
    components:{//注册子组件
        'comment-box':comment
    }
}
</script>
<style lang="scss" scoped>

</style>