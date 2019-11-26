<template>
    <div class="number_box_container">
        <van-stepper v-model="value" min="1" input-width="50px" button-size="32px"/>
    </div>
</template>
<script>

</script>
<style lang="scss">
.number_box_container{
    display: inline;
    .van-stepper{
        display:inline-flex;        
    }
}
</style>