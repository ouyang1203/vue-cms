<template>
    <div class="number_box_container">
        <van-stepper v-model="value" min="1" input-width="50px" button-size="32px" @change="stepperChange" :max="maxNumber"/>
    </div>
</template>
<script>
export default{
    data(){
        return {
            value:1//步进器最初始值为1
        }
    },
    methods:{
        stepperChange(){
            //步进器每次值发生变化时调用父组件的方法回传当前值
            this.$emit('func',parseInt(this.value));
        }
    },
    props:['maxNumber']
}
</script>
<style lang="scss">
.number_box_container{
    display: inline;
    .van-stepper{
        display:inline-flex;        
    }
}
</style>