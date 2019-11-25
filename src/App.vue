<template>
    <div class="app-container">
        <!--顶部Header区域-->
        <mt-header fixed :title="currentProjectHeaderTitle">
           <!--
            <router-link :to="this.$route.path" slot="left">
                返回
            </router-link>
            -->
        </mt-header>
        <!--<van-nav-bar  title="标题"  left-text="返回"  left-arrow  @click-left="onClickLeft"/>-->
        <!--中间的路由route-view区域-->
        <transition>
            <router-view></router-view>
        </transition>
        <!--底部Tabber区域-->
        <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item" to="/member">
                <span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item" to="/shop">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart">
                    <span class="mui-badge">0</span>
                </span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                currentProjectHeaderTitle:this.GLOBAL.currentProjectHeaderTitle
            }
        }
    }
</script>
<style lang="scss" scoped>
.app-container{
    //避免避免route-view区域第一条数据被顶部Header区域遮挡
    padding-top: 40px;
    //避免route-view区域最后一条数据被底部Tabber遮挡
    padding-bottom: 50px;
    overflow-x: hidden;
    /***替换vant导航默认样式 */
    .van-nav-bar{
        top: 0;
        right: 0;
        left: 0;
        position: fixed;
        z-index: 1;
        background-color: #26a2ff;
    }
}
/**设置模块切换动画效果*/
.v-enter{
    opacity: 0;
    transform: translateX(100%);
}
.v-leave-to{
    opacity: 0;
    transform: translateX(-100%);
    position: absolute;
}
.v-enter-active,
.v-leave-active{
    transition: all 0.5s ease;
}


</style>