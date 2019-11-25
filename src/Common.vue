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
 * overTimeErrorMessage 全局超时提示错误信息
 * errorToastPosition 错误提示位置
 * errorToastDuration 错误提示时长
 * commentContentUndefinedMessage 评论数据为undefined时的替换信息
 * currentProjectHeaderTitle 设置Header中的文字
 * globalPageSize 设置全局分页大小
 * loadMoreCommentText 分页按钮显示文字
 * noMoreDataText 分页到最大时按钮文字
 */
const overTimeErrorMessage = '网络异常,目前展示的为静态页面,请联系管理员检查接口是否正常。。';
const errorToastPosition = 'top';
const errorToastDuration = 3000;
const commentContentUndefinedMessage = '此用户很懒,什么都没说。。。。';
const currentProjectHeaderTitle = 'VUE项目-全局标题';
const globalPageSize = 10;
const loadMoreCommentText = '加载更多';
const noMoreDataText = "没有更多的数据可供加载";
const inputCanNotEmpty = '输入内容不能为空';

/***
 * 所有后端请求地址
 * homePageLunBoPath为首页轮播图后台请求地址
 * newsListGetAllNewsPath为新闻列表后台请求地址
 * newsDetailGetNewsInfoPath新闻详情后台请求地址
 * commentFindCommentsPath新闻对应评论列表获取地址
 * commentAddCommentPath发送评论对应后台地址
 * findAllImageCategoryPath查询图片分类列表后台地址
 * findAllImagesByCategoryPath 查询分类下所有图片列表后台地址
 * getImageInfoPath 查询图片明细后台地址
 */
const homePageLunBoPath = 'image/postImageListByCategoryId';
const newsListGetAllNewsPath = 'news/getAllNews';
const newsDetailGetNewsInfoPath = "news/getNewsInfo";
const commentFindCommentsPath = "comment/findComments";
const commentAddCommentPath = "comment/addComment";
const findAllImageCategoryPath = "imageCategory/findAllImageCategory";
const findAllImagesByCategoryPath = "image/postImageListByCategoryId";
const getImageInfoPath = "image/getImageById";

/**
 * 当后端接口地址无法请求时,使用全局配置的静态图片路径,避免页面中元素空白
 * 注意：所有后端接口返回格式规定为JSON字符串,{status:0,statusText:'',list/message:object}
 * status=0代表接口请求成功，其他状态均为失败；
 * statusText代表错误提示信息；
 * list/message如果当前页面是列表则用list返回后端查询的List数据，如果是明细则用message返回查询对象，具体参考下面说明：
 * lunboList轮播图列表返回格式
 * newsList新闻列表数据返回格式
 * newsDetail新闻详情数据返回格式
 * commentList评论列表数据返回格式
 * categoryList图片分享的类别列表数据返回格式
 */
const lunboList = [
    {imageId:1,imagePath:"images/1.jpg",imageTitle:"轮播图-1.jpg"},
    {imageId:1,imagePath:"images/beach.jpg",imageTitle:"轮播图-beach.jpg"}
];
const newsList = [
    {newsId:1,newsImagePath:"images/shuijiao.jpg",newsTitle:"幸福",newsCreatedDate:'2019-11-23 11:45:00',newsViewCount:3},
    {newsId:2,newsImagePath:"images/muwu.jpg",newsTitle:"木屋",newsCreatedDate:'2019-11-23 11:45:01',newsViewCount:5},
    {newsId:3,newsImagePath:"images/cbd.jpg",newsTitle:"CBD",newsCreatedDate:'2019-11-23 11:46:00',newsViewCount:7}
];
const newsDetail = {
    newsId:1,
    newsImagePath:"images/shuijiao.jpg",
    newsTitle:"幸福",
    newsContent:"能和心爱的人一起睡觉，是件幸福的事情；可是，打呼噜怎么办？",
    newsCreatedDate:'2019-11-23 11:45:00',
    newsViewCount:3
};
const commentList = [
    {commentId:1,commentUser:'匿名用户',commentTime:'2019-11-23 17:34:23',commentMessage:'啊啊啊啊啊啊啊啊'},
    {commentId:2,commentUser:'匿名用户',commentTime:'2019-11-23 17:36:24',commentMessage:'日照香炉生紫烟呀'},
    {commentId:3,commentUser:'匿名用户',commentTime:'2019-11-23 17:37:24',commentMessage:'undefined'}
];
const categoryList = [
    {"imageCategoryCode":"recommend","imageCategoryId":1,"imageCategoryName":"推荐1"},
    {"imageCategoryCode":"hotspot","imageCategoryId":2,"imageCategoryName":"热点1"},
    {"imageCategoryCode":"beijng","imageCategoryId":3,"imageCategoryName":"北京1"},
    {"imageCategoryCode":"society","imageCategoryId":4,"imageCategoryName":"社会1"},
    {"imageCategoryCode":"amusement","imageCategoryId":5,"imageCategoryName":"娱乐1"},
    {"imageCategoryCode":"technology","imageCategoryId":6,"imageCategoryName":"科技1"}
];
const imageList = [
    {"imageCategoryId":3,"imageContent":"推荐信息测试啊","imageId":3,"imageName":"tuijian.jpg","imagePath":"http://localhost:3000/images/tuijian.jpg","imageTitle":"推荐信息测试啊"},
    {"imageCategoryId":4,"imageContent":"热点信息图片","imageId":4,"imageName":"redian.jpg","imagePath":"http://localhost:3000/images/redian.jpg","imageTitle":"热点信息图片"},
    {"imageCategoryId":5,"imageContent":"北京天安门","imageId":5,"imageName":"beijing.jpg","imagePath":"http://localhost:3000/images/beijing.jpg","imageTitle":"北京天安门"},
    {"imageCategoryId":6,"imageContent":"社会主义价值观","imageId":6,"imageName":"shehui.jpg","imagePath":"http://localhost:3000/images/shehui.jpg","imageTitle":"社会主义价值观"},
    {"imageCategoryId":7,"imageContent":"随便找的明星照片","imageId":7,"imageName":"yule.jpg","imagePath":"http://localhost:3000/images/yule.jpg","imageTitle":"随便找的明星照片"},
    {"imageCategoryId":8,"imageContent":"科技图片","imageId":8,"imageName":"keji.jpg","imagePath":"http://localhost:3000/images/redian.jpg","imageTitle":"科技图片"}
];
/***
 * 暴露出全局定义的方法和属性
 */
export default {
    error,
    overTimeErrorMessage,
    errorToastPosition,
    errorToastDuration,
    homePageLunBoPath,
    newsListGetAllNewsPath,
    newsDetailGetNewsInfoPath,
    commentFindCommentsPath,
    commentAddCommentPath,
    lunboList,
    newsList,
    newsDetail,
    commentList,
    commentContentUndefinedMessage,
    currentProjectHeaderTitle,
    globalPageSize,
    loadMoreCommentText,
    noMoreDataText,
    inputCanNotEmpty,
    categoryList,
    findAllImageCategoryPath,
    imageList,
    findAllImagesByCategoryPath,
    getImageInfoPath
}
</script>