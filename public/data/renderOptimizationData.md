## 渲染性能优化

这是无意间发现的一个课题，引起了我的兴趣......

事情是这样的，有一天我发现，项目在进入路由```icon 集合```页面时，页面有概率出现短暂的顿挫感

像这样

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201216021652370.gif#pic_center)
看面包屑就知道卡了，淦 

年轻人，这样好吗？这样不好。

### 定位问题：

Icon 集合是从```quasar```中导出的源数据，一共是```material Icon```1317 个 +``fontawesome-v5 Icon`` 1601 个 = 2918 个``SVG`` 图标。正是因为一次渲染的```svg```图标太多，所以在进入页面时会有顿挫感。

呵，强迫症，我就是要把它搞掂

### 第一次优化：
既然一次加载 3000 个图标会引起卡顿，那么就使用分组渲染的方式来加载图标，之后使用```v-for```渲染出分组后的中的图标，代码如下：
```js
initMaterialIcon () {
  // 基于 quasar 的约定，需要将 icon 的名称转为下划线的形式(蛇形)
  // 这一段只是单纯的获取图标 materialIcons 下划线格式命名集合
  for (const i in materialIconsSet) {
    this.materialIcons_key.push(this.toLowerLine(i))
  }
  // 将获取到的 materialIcons_key 图标名称集合分组，其中每组 300 个，每 300 ms 渲染一组
  let i = 0
  this.timer1 = setInterval(() => {
    this.group_md = this.group_md.concat(this.materialIcons_key.slice(i, i + 300))
    i += 300
    if (i > 1320) {
      clearInterval(this.timer1)
    }
  }, 300)
}
```
效果如下（点击可看大图）：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201224145006749.gif#pic_center)
发现并没有得到很好的效果，还是会有 5 到 10 帧左右的卡顿，有不过也在意料之中。

看来渲染```svg```的话没有单纯的文本那么简单，应该是和回流 / 重绘有关了，不懂的同学可以看一下这篇文章 [你真的了解回流和重绘吗](https://segmentfault.com/a/1190000017329980)

去看了一下```v-for```的源码，使用的是```createElement```来创建节点，```createElement```相比```createDocumentFragment```来说渲染能力差一点

:::tip
当然虽说```createElement```渲染能力比较差，但是相比```createDocumentFragment```它也有自己的特点，需要了解的请自行百度哦
:::

### 第二次优化
确定好以回流 / 重绘为下一次的解决方向后，接下来就是使用```createDocumentFragment```和```requestAnimationFrame```来进行渲染操作了

:::tip
```requestAnimationFrame```可以暂且把它等价为```setTimeout```
不同的是```requestAnimationFrame```的执行周期是根据你当前屏幕设备的刷新频率来确定的，比如你的屏幕设备的频率是```60 HZ```，那么```requestAnimationFrame```的执行周期就是 16ms
等价于 setTimeout( ()=>{ }, 16ms )
:::

因为一开始不能确定渲染一个比较大的```svg```图标需要多久，因此第一次写代码时，就直接写为

屏幕每刷新一次渲染一个```svg```图标，代码如下：
```js
initMaterialIcon () {
  // 获取图标 materialIcons 下划线格式命名集合
  for (const i in materialIconsSet) {
    this.materialIcons_key.push(this.toLowerLine(i))
  }
  this.$nextTick(() => {
    // 渲染入口
    this.RenderMDIcon(0)
  })
}

RenderMDIcon (i) {
  if (i >= 1317) {
    cancelAnimationFrame(this.timer1)
  } else {
    // 创建虚拟文档碎片
    const fragment = document.createDocumentFragment()
    // 创建虚拟节点
    const li = document.createElement('li')
    // 写入数据
    li.innerText = this.materialIcons_key[i]
    li.setAttribute('class', 'myIcon material-icons q-icon notranslate')
    fragment.appendChild(li)
    // 将虚拟文档碎片加入正式文档流
    document.getElementById('mdtext').appendChild(fragment)
    i++  // 步长 1
    this.timer1 = requestAnimationFrame(() => {
      this.RenderMDIcon(i)
    })
  }
},
```
### 效果如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201224031700371.gif#pic_center)
可以看到屏幕每刷新一次渲染一个```svg```图标还是很轻松的，接下来就是慢慢的更改单次渲染图标数，找到单次渲染但又不卡的图标数量作为步长即可。

(￢_￢) 狗血的是，第一页有 1317 个图标，使用这个方法一次渲染 1317 个图标都不会卡顿......

代码如下：
```js
// materialIcons 图标集合初始化
initMaterial () {
  // 获取图标 materialIcons 下划线格式命名集合
  for (const i in materialIconsSet) {
    this.materialIcons_key.push(this.toLowerLine(i))
  }
  this.$nextTick(() => {
    this.RenderMDIcon(0)
  })
},
// 渲染图标
RenderMDIcon (i) {
  if (i >= 1317) {
    cancelAnimationFrame(this.timer1)
  } else {
    const fragment = document.createDocumentFragment()
    for (let j = i; j < i + 1317; j++) {
      const li = document.createElement('li')
      li.innerText = this.materialIcons_key[j]
      li.setAttribute('class', 'myIcon material-icons q-icon notranslate')
      li.setAttribute('onclick', 'window.copyIcon(' + "'" + this.materialIcons_key[j] + "'" + ')')
      fragment.appendChild(li)
      i += 1317   // 步长 1317
    }
    document.getElementById('mdtext').appendChild(fragment)
      this.timer1 = requestAnimationFrame(() => {
      this.RenderMDIcon(i)
    })
  }
},
```
### 效果如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2020122403213597.gif#pic_center)
确认过眼神，是我想要的效果

:::tip
题外话：经过测试，这个方式单次渲染超过 6000 个图标时，才会开始卡顿。如果还想继续加载，可以使用```IntersectionObserver```这个 API 进行埋点，来加载接下来的数据。感兴趣请自行百度哦。
:::

### 接下来说一下其中的原理
有的同学可能会认为，是因为```requestAnimationFrame```的执行频率紧贴着屏幕的刷新频率，因此渲染的速度是最佳的速度，所以看不出来卡顿。其实这是不正确的。

关键点在于```createDocumentFragment```

```createDocumentFragment```会创建一个虚拟的文档碎片节点

它将需要渲染的操作统一集中在虚拟的文档碎片节点里，之后再将虚拟的文档碎片节点插入真实的文档流，这样的话就能保证只进行一次回流操作。

渲染时如下图所示，只进行了 1 次回流：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201224163845149.gif#pic_center)
（图片来自：[页面优化，DocumentFragment对象详解](https://www.cnblogs.com/echolun/p/10098752.html)）

而如果按照普通的方式向文档流插入节点，每插入一次新节点就会执行一次回流操作，这样开销非常大。

渲染时如下图所示，就进行了 5 次回流：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201224163741116.gif#pic_center)
### 第三种方法：虚拟滚动
网络上对于虚拟滚动的介绍目前已经比较多了，不知道的请先自行百度

它有很多好处，比如仅渲染可见项，在任何给定时间点DOM树中的节点数量最少，并且内存消耗保持在最低水平，不用担心内存泄漏的问题等。

对于图标的渲染我也使用过虚拟滚动，用的是 quasar 内置的虚拟滚动组件，效果如下：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201224165330256.gif#pic_center)
我还模拟了 1w 个 icon 的数据，使用虚拟滚动，模拟用户操作 90 s 页面时的性能分析：

可以看到在内存到达一定的阈值之后会被立即释放掉

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201224172225415.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxOTEyMzk4,size_16,color_FFFFFF,t_70#pic_center)
不足之处就是每次渲染将要出现的数据时，会有些许卡顿

图中 FPS 栏上面一段一段红色帧就是渲染新 icon 时出现的卡顿

### 为什么最后没有使用虚拟滚动？有下面几个因素：
1. 虚拟滚动更适合于列表型的数据，即每一行为一项，这样能更好的计算出滚动区域的高度。但是当前这一页是一个 icon 集合页，每个图标作为一项，此时想实现每一行为一项，需要通过计算将 icon 根据自身宽度以及滚动区域宽度进行分行操作，比如将 15 个 icon 作为一行，之后根据行高和行数生成虚拟滚动。然而这样做的话又需要监听当前屏幕的变化去重新计算每一行需要多少个 icno，来完成其他的响应式操作，对于只显示 3000 个图标的页面来说，我觉得开销有点大.......

3.  ```quasar```内置的虚拟滚动组件在渲染即将出现的 icon 时，会有短暂卡顿，应该也是与回流有关。关键是，卡顿这一下，我就有些受不了了  (￣(00)￣)　这个才是主要原因....

4. 百度会发现很多写着高性能的虚线滚动组件，如果想要自己完成一个虚拟滚动还是需要在其中下不少功夫  (￣(00)￣)　

### 最后还顺便解决了一个内存泄漏问题
这是无意间在性能分析面板看到的，从图中可以看到当前页是一个静态页面，然后分析 5 s，可以看到堆栈信息一直在那跳来跳去，不知道执行了啥 js 语句用了 9786ms 。

年轻人，一看就知道这样不好，要讲武德。


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201224175840329.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxOTEyMzk4,size_16,color_FFFFFF,t_70#pic_center)
打开```Bottom-up```面板就能看到，有几个脚本一直在执行是什么鬼。


![在这里插入图片描述](https://img-blog.csdnimg.cn/20201224180157760.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxOTEyMzk4,size_16,color_FFFFFF,t_70#pic_center)
### 好家伙，马上定位问题：

原因是封装的 lottie 组件中添加了动画加载完成事件监听，并且没有在 lottie 被销毁时移除该监听

不要问我为什么知道，因为 BUG 是我写的， (￣(00)￣)　
```js
this.lottie.addEventListener('data_ready', this.isLottieFinish)
```

### 如何解决：
使用```addEventListener```的第三个参数确保事件只执行一次，并在完成后被移除

```js
this.lottie.addEventListener('data_ready', this.isLottieFinish, { once: true })
```
在组件被销毁的同时销毁该对象

```js
beforeDestroy () {
  this.lottie.destroy()
  this.lottie = null
}
```
看一下效果，是不是爽多了：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201224204313853.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQxOTEyMzk4,size_16,color_FFFFFF,t_70#pic_center)

到这里这一次性能优化就又结束了，希望能成为你成功路上的绊脚石......
