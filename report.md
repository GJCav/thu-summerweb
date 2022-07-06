# 作业 1 报告

## 效果呈现

电脑端效果：

<img src=".typora\image-20220706105809844.png" alt="image-20220706105809844" style="zoom:50%;" />



手机端效果：

<img src=".typora\image-20220706113704845.png" alt="image-20220706113704845" style="zoom:30%;" />



## 使用说明

### 快速访问

使用浏览器打开 https://hw1-websummer.gjm20.top

注：因为网站托管在 Cloudflare 下，加载速度可能较慢。



### 从源代码开始

使用`yarn`进行包管理，使用`npm`会遇到一些奇怪的依赖问题：

```bash
git clone https://github.com/GJCav/thu-summerweb.git
cd thu-summerweb
git checkout homework1
yarn install
yarn dev -o
```



本项目使用到的框架：

* `Nuxt3`：基于Vue3的框架，能自动完成SSR、路由等一系列繁琐但重要的功能
* `Voca.js`：JS 中的字符串格式化
* `sass`：让写CSS的血压稍稍降低



本项目使用到的图标资源：具体图标来源见源码注释

* Awesome Font
* Bootstrap Font



## 实现思路

### 垂直居中效果

解决方式：html, body 的 height 设为 100% ，然后通过 flex 实现垂直居中



### 各个框的重叠效果

解决方式：`position: absolute`，设置`z-index`，然后用 `margin` 完成定位



### 配色效果

难点：统一设置主题色，然后从主题色衍生出较深和较浅的颜色。

解决：使用SASS中的变量和`darken`、`lighten`函数，完成css内的配色统一

切换配色：打开`pages/index.vue`，找到`$theme-color: xxx;` 一行，修改后面的颜色值即可。

效果展示：

* 紫色：<img src=".typora\image-20220706120721975.png" alt="image-20220706120721975" style="zoom:40%;" />

* 蓝色：<img src=".typora\image-20220706120931527.png" alt="image-20220706120931527" style="zoom:40%;" />

 美中不足：因为流量使用条被单独放在一个组件中，不能随主题改变颜色，后续可以把配色独立成一个全局sass文件，实现统一配色。



### 对话框的三角

<img src=".typora\image-20220706121250282.png" alt="image-20220706121250282" style="zoom:50%;" />

核心思路：搞一个正方形的框，背景纯色填充，然后`clip-path: polygon(0 0, 100% 0, 0 100%);`



### 流量条

<img src=".typora\image-20220706121507028.png" alt="image-20220706121507028" style="zoom:50%;" />

独立成一个组件，位于`components/VolumeBar.vue`，具备一定的可复用性。

使用 Grid 布局实现，是一个 2x7 的 grid，第二行背景深浅不一的方块用 div+背景色填充实现，黄色进度条用另一个 div 重叠在第二行上实现。

组件接受以下 props：

* `prompt_text`：grid 第一行的数字标识，默认为 `["", "20", "30", "40", "50"]`
* `value`：黄色条的宽度，范围 [0, 1]，为 1 时黄色条填满流量条



### 阴影

<img src=".typora\image-20220706122047620.png" alt="image-20220706122047620" style="zoom:50%;" />

官方网站的实现方法是放一个图片在那里，太麻烦了，可以纯 css 实现：

```css
.pannel-shadow {
    height: 20px;
    width: 80px;
    background: radial-gradient(#9a9a9a 0%, #dcdcdcab 80%, transparent 100%);
    filter: blur(3px);
    transform: scale(3.5, 1) translate(40px, 4px);
}
```

核心是：

* 背景渐变填充灰色
* `transform`  变形成扁扁的椭圆阴影
* `filter` 加上模糊，让阴影更真实



### 小图标

<img src=".typora\image-20220706122405824.png" alt="image-20220706122405824" style="zoom:80%;" />

右对齐布局：flex justify-content: right

图标：从 Font Awesome 和 Bootstrap Font 找 svg 代码

颜色：修改 path 标签的 fill 属性
