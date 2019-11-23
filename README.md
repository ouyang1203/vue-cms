# 这是一个VUE项目

## VUE前端APP制作
### 1. 完成Header区域，使用Mint-UI中的组件
### 2. 制作底部的Tabber区域，使用MUI的Tabber.html代码
#### 1.在制作购物车小图标时，操作会相对更多一些
#### 2. 先把扩展图标的CSS文件复制到项目的CSS目录下
#### 3. 拷贝扩展字体库.ttf到项目的字体目录下
#### 4. 为购物车添加如下样式：mui-icon-extra mui-icon-extra-cart
### 3. 要在页面中间放置一个route-view来展示路由组件
### 4. 设置底端tabber为router-link
### 5. 设置路由切换高亮router.js中添加属性linkActiveClass:"mui-active"//覆盖默认的路由高亮类为MUI提供的mui-active样式(默认的高亮类是：router-link-active)
### 6. 点击tabbar中的路由链接，展示对应的组件

### 7. 制作首页轮播图布局
### 8. 加载首页轮播图数据
#### 1.获取轮播图数据,使用vue-resource
### 9. 安装moment插件格式化页面的时间npm i moment -S
### 10. 单独封装一个comment.vue评论子组件
 #### 1.先创建一个comment.vue模板
 #### 2. 在需要使用commetn组件的页面中，先手动导入comment组件
 #### 3. 在父组件中使用'components'属性将刚才导入的comment组件注册为自己的子组件
 #### 4. 将注册子组件时候的注册名称，以标签的形式引入页面即可