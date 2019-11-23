<template>
</template>
<script>
/***
 * 定义全局方法或者全局属性
 */
import { Toast} from 'mint-ui';

/***
 * 全局出错提示方法
 * @param message错误提示信息
 * @param position出错提示位置(top/middle/bottom)
 * @param duration提示时长(毫秒)
 */
function error(message,position,duration){
    Toast({
        message:  message,
        position: position,
        duration: duration
    });
}
/***
 * 全局属性
 */
const overTimeErrorMessage = '网络异常,目前展示的为静态页面,请联系管理员检查接口是否正常。。';
const errorToastPosition = 'top';
const errorToastDuration = 3000;

export default {
    error,
    overTimeErrorMessage,
    errorToastPosition,
    errorToastDuration
}
</script>