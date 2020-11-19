## tagView 
在SPA中因为减少了浏览器跳转，所以```tagView```的存在是必要的
:::tip
- 鼠标右键可以打开 ```tagView``` 菜单项，移动端下则是长按打开菜单项
- 当路由跳转带路径参数时，```tagView```标签会加上第一个参数的值，作为标识
:::

```tagview```位置
```sh
components
|-TagView
   |-tagView.vue                # tagView 源文件
   |-tagViewUtils.js            # tagView 工具类： 增/删
```

本项目中```tagView ```的作用不只是作为快捷导航使用。同时还作为页面缓存```<keep-alive>```中的标识使用，即，有 ```tagView```存在的话则对应页面的缓存也存在（该路由元信息中声明了```keepAlive: false```除外）， ```tagView```被关闭则对应页面缓存将被从内存中清除

在```Vuex```中维护了两个数组：```tagView: []```、```keepAliveList: []```，其中```tagView: []```保存的是访问过的路由信息，```keepAliveList: []```则是需要被缓存组件列表。

```tagView: []```结构如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109193512403.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxOTEyMzk4,size_16,color_FFFFFF,t_70#pic_center)

```keepAliveList: []```则是由从```tagView: []```中抽取 ```keepAlive === true```的元素的```name```，组成的

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201109193935667.png#pic_center)

项目会```watch```每一次```tagView[]```的变化，并组成新的```keepAliveList: []```

具体如何实现缓存，请看```keep-alive 缓存```说明


tagView的实现并不复杂，不过处理逻辑挺复杂的，比如：
1.如果被关闭的```tagView```是当前组件，应该作何反应
2.如果被关闭的```tagView```是第一个或最后一个，应该作何反应，如果不是，又作何反应
3.关闭左侧，关闭右侧，关闭全部等操作
4.当路由跳转带参数时```tagView```作何处理
4.如何适配移动端等

下面是```tagView```事件处理入口，如果需要，请自行修改

```mutations.js```中，```removeOneSide```和```removeATagView```方法在```tagViewUtils.js```里
```js
/**
 * 移除 tagView
 * case 'undefined' : 移除所有 tagView
 * case 'object' : 移除某一侧 tagView 或两侧都移除
 * default '要删除元素的下标 i ' : 移除第 i 一个 tagView
 *          如果移除的是第一个 tagView，则跳转到当前的第一个 tagView
 *          如果移除的是最后一个 tagView，则跳转到当前的最后一个 tagView
 *          否则返回主页
 * @param state
 * @param payload
 * @constructor
 */
REMOVE_TAG_VIEW: (state, payload) => {
  switch (typeof payload) {
    case 'undefined':
      state.tagView = []
      router.push('/')
      break
    case 'object':
      removeOneSide(state, payload)
      break
    default:
      removeATagView(state, payload)
  }
}
```
在组件中调用
```js
// 调用方法
methods: {
  removeAllTagView () {
    this.$store.commit('REMOVE_TAG_VIEW')
  },
  removeLeftTagView (i) {
    this.$store.commit('REMOVE_TAG_VIEW', { side: 'left', index: i })
  },
  removeRightTagView (i) {
    this.$store.commit('REMOVE_TAG_VIEW', { side: 'right', index: i })
  },
  removeOthersTagView (i) {
    this.$store.commit('REMOVE_TAG_VIEW', { side: 'others', index: i })
  }
 }
```


