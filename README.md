<div align="center">
  <h1>vue-quasar-manage</h1>
</div>
<p align="center">
    <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
    <img src="https://img.shields.io/badge/vue-2.6.12-brightgreen.svg" alt="vue">
  <img src="https://img.shields.io/npm/v/quasar.svg?label=quasar">  <img src="https://img.shields.io/npm/v/%40quasar/extras.svg?label=@quasar/extras"> 
</p>

Vue-Quasar-Manage 是一款中后台前端解决方案：
- 基于 [vue](https://cn.vuejs.org/) 和 [quasar-ui](http://www.quasarchs.com/) 实现，[quasar-ui](http://www.quasarchs.com/) 的设计规范来自 [Material Design](https://material.io/)
- 包含动态路由，动态缓存，权限验证等常用功能
- 响应式设计，SPA / Electron / Mobile / Cordova 兼容良好
- 包含 tagView 快捷导航、面包屑导航等 SPA 应用常用功能
- 内置 Material Design 图标集
- 简单的代码逻辑，多种自定义组件，高度可定制性（只有 1600 行代码）
- 完全开源及免费

当然如果你想要```Quasar-cli```版本的：[Quasar-Manage](https://github.com/972784674t/Quasar-Manage)

使用这个项目前您需要了解如下技术栈：

[ES6](https://es6.ruanyifeng.com/) | [Node.js](https://nodejs.org/en/) | [webpack](https://www.webpackjs.com/) | [vue](https://cn.vuejs.org/) | [vuex](https://vuex.vuejs.org/zh/) | [vue-router](https://router.vuejs.org/zh/) | [vue-cli](https://cli.vuejs.org/zh/) | [axios](http://www.axios-js.com/) | [ESlint](https://eslint.bootcss.com/)
### DEMO地址

[Github](https://972784674t.github.io/vue-quasar-manage/) | [Gitee 国内用户访问](http://incimo.gitee.io/vue-quasar-manage)

![输入图片说明](https://images.gitee.com/uploads/images/2020/1121/001642_63a6fa66_5663937.png "home.png")

![输入图片说明](https://images.gitee.com/uploads/images/2020/1120/235645_43a6f8ea_5663937.png "屏幕截图.png")

### 更新日志
- *2020/12/3*    
将```public```文件夹路径注入```vue```原型，方便静态资源引用
- *2020/12/9*    
更新到 v1.0.3 beta 版本，进行了性能优化。```Github```/```Gitee```的首屏加载速度得到较大的提升。 ```Gitee```访问从原先的 3.5s 左右，提升到 1s 左右。但```Github```访问收网络影响...此次更新将优化过程新增到```性能优化```导航项提供参考。
- *2020/12/24*    
修复了一个内存泄漏的 bug，以及对 ICON 集合界面进行了渲染性能优化，并将优化过程新增到```性能优化```导航项提供参考。
有同学反映侧边栏被选中时效果不明显，于是顺便增加了点样式
- *2020/12/31*  
优化```<BaseContent>```的处理逻辑，解决关闭```tagView```后，重新进入对应页面依然会跳转到滚动记录位置的问题
- *2020/1/22*  
1 重构```<tagView>```组件，使其更好的兼容多端环境， SPA / Electron / Mobile / Cordova 兼容良好  
2 原先版本基于 ```quasar 1.3x```，有 bug，现版本更新为 ```quasar 1.5x```    
原先项目如何升级：  
2.1 删除 原先版本 ```package-lock.json``` 文件， ```node_modules``` 文件  
2.2 重新运行 install 即可

### 如何运行
请确保您的计算机已经安装了 ```Node.js``` 以及 ```git```，当前项目主要用于展示说明文档

建议使用模板项目 [vue-quasar-manage-template](https://github.com/972784674t/vue-quasar-manage-template)  进行开发。


1、克隆项目
```sh
git clone https://github.com/972784674t/vue-quasar-manage-template.git
```
2、在项目文件夹 cmd 下，下载项目所需依赖
```npm
npm install 或 cnpm i （如果您正在使用 cnpm，但是 cnpm 下载依赖不太稳定 ）
```
3、在项目文件夹 cmd 下，启动开发服务器
```npm
npm run serve
```
### 如何打包
```npm
npm run build
```

## License

Copyright (c) 2015-present Razvan Stoenescu

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
