## 滚动区域 BaseContent
```sh
components
|-BaseContent 
   |-BaseContent.vue                # BaseContent 源文件
 ```
 ```BaseContent```也是自己封装一个用于内容展示的组件，所有的组件都建议用```BaseContent```作为根节点，主要是为了实现：
 - 特点区域的滚动
 - 组件缓存
 - 界面缩放/滚动自适应
 - 直接点击滚动栏对应位置即可快速定位
- 页面刷新或切换时记录滚动位置（如果页面不被```<keep-alive>```缓存则不会记录）

主要方法：
```js
methods: {

  // 滚动到 position ， 持续时间 300
  ScrollToPosition (position) {
     this.$refs.scrollArea.setScrollPosition(position, 300)
  },

  // 获取位置，在使用前最好进行节流或防抖处理
  getPosition () {
     return this.$refs.scrollArea.getScrollPosition()
  }

},
```

### 如何记录位置的？
1、当页面被```<keep-alive>```缓存时：

- 在```deactivated()```中使用```$route.path```作为```key```，保存缓存位置对象```toPosition:{"listScrollTop":0}```到```sessionStorage```中
- 在页面被```activated ()```时，用过```$route.path```作为```key```，取缓存位置对象```toPosition:{"listScrollTop":0}```，并调用```this.ScrollToPosition(toPosition.listScrollTop)```让页面滚动到对应位置

2、当页面被刷新时，在```mounted ()```中去缓存对象并滚动到对应位置

3、页面被销毁时，删除对应```sessionStorage```

详情请看[源码](https://github.com/972784674t/vue-quasar-manage/tree/master/src/components/BaseContent)

