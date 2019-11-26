<template>
    <div>
        <!--轮播图组件-->
        <mt-swipe :auto="4000">
            <mt-swipe-item v-for="item in list" :key="item.imageId">
                <img :src="item.imagePath" :title="item.imageTitle" :class="{'full':isFull}">
            </mt-swipe-item>
        </mt-swipe>
    </div>
</template>
<script>
export default {
    data(){
        return {

        }
    },
    props:['list','isFull']
}
</script>
<style lang="scss" scoped>
.mint-swipe{
    height: 200px;
    .mint-swipe-item{
        text-align: center;
        img{
            //设置轮播图的样式
            //width: 100%;
            height:100%;
        }
    }
}
.full{
    width:100%
}
</style>