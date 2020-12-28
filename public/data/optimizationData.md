## 体积性能优化
最近发现项目在```github```上启动速度达到恐怖的 8 秒，在```gitee```的启动速度也很慢，3.04 秒，首页动画是通过 CDN 加载进来的，所以没有算在内，```github```8秒，国外吧，那也没啥好说的

但是```gitee```的启动速度 3.04 秒

不得了，我强迫症犯了，就好比有人在我的耳边对我说：这个世界上根本没有奥特曼！！！

难受，淦 o(ﾟДﾟ)っ！

本来想着项目在```github```/```gitee```上部署后，这两个网站都自带```GZIP```压缩了，所以打包时就用了最原始的打包方式，方便其他同学根据自己的需求自定义打包配置。好家伙，咩想到这么慢。

直接定位问题，然后顺便把体积性能优化的过程也写出来吧。

### 定位问题
在 v1.0.1 beta 版本中发现路由组件懒加载无效，导致```chunk-vendors```文件大小达到 5M，同时```quasar```体积达到 1M 

问题原因出在用来做嵌套路由布局的 ```layout```组件上，当时```layout```组件不是懒加载的，是在路由声明时一次性加载完成，同时它还把本该懒加载的组件都加载进来了，因此导致体积过大。

分析项目体积可以使用```webpack```的```webpack-bundle-analyzer```或是 VUE GUI 里自带的```webpack Analyzer```

使用```webpack-bundle-analyzer```分析结果如下：
|````chunk-vendors.js````| ```echarts```|```quasar```|
|--|--| -|
| 5.05 MB（路由懒加载失败 ） | 2 MB （没有按需引入） | 1MB（路由懒加载失败） |
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208235651994.gif#pic_center)

### 找到问题后使用通用的优化方法进行优化，常规的性能优化一般有五种：

1. 单组件 / UI 组件按需引入
2. 路由懒加载
3. 通过 CDN 获取资源，而不是将资源打包到项目中 
4. 关闭```sourcemap```文件打包
5. Gzip 压缩项目资源
6. 对于字体等体积较大的静态资源，开启浏览器缓存

### 1、按需引入

按需引入就是在开发的时候只引入需要的组件，而不是一次性将所有不需要的 UI 组件都引入进来，最常见的就是 UI 框架组件按需引入，比如我只需要```Dialog```组件，那我就只引如```Dialog```组件即可。

对于```quasar```按需引入的格式一般如下：

```js
import {
  Quasar,
  LoadingBar,
  Dialog,
  ......
} from 'quasar'

Vue.use(Quasar,
{
  ......
  plugins: {
    LoadingBar,
    Dialog,
  ......
  }
})
```
同时各个依赖都有自己按需引入的方法，比如```echarts```按需引入如下：
```js
import ECharts from 'vue-echarts'

// 手动引入 ECharts 各模块来减小打包体积
import 'echarts/lib/chart/bar'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'
import 'echarts/lib/chart/pie'

// 注册 ECharts
Vue.component('v-chart', ECharts)
```

### 2、路由懒加载：
路由懒加载目前比较常用的格式如下（当然还有很多种格式，需要请自行百度）：
```js
{
  path: 'optimization',
  name: 'optimization',
  meta: {},
  component: () => import('../views/router/optimization')
}
```

### 有同学提出问题，为什么配置了路由懒加载之后，依旧是在首屏加载时加载所有的资源信息，那路由懒加载的作用是什么？
首先要明确的是配置路由懒加载后确实是生效了的，只不过 vue 默认为所有被懒加载的路由使用了 prefetch(预先加载模块)，提前获取用户未来可能会访问的内容，因此才会将路由懒加载的文件一股脑加载进来。

vue 官网[路由懒加载](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)中提到，路由懒加载的作用是将不同的路由打包在不同的块（chunk_xxxxxxx.js）中，而原本默认是将路由都打包在 main （chunk-vendors.js）里，这样做能通过将懒加载的路由从 main 中分割出来，从而减少 main 的体积。
当然你也可以指定某几个路由打包成一个chunk文件：

比如：通过内联注释的方式，将下面三个路由打包成 group-foo.js 文件
```js
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

```chunk-vendors.js```加载之后，其他配置了路由懒加载的页面基本不会影响首屏加载的速度。

当然比如在移动端或对流量比较敏感的场景，我们也可以将默认的 prefetch(预先加载模块) 关闭。

vue 官网给出了关闭方法 [Prefetch](https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch)

```js
// vue.config.js
module.exports = {
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')

    // 或者
    // 修改它的选项：
    config.plugin('prefetch').tap(options => {
      options[0].fileBlacklist = options[0].fileBlacklist || []
      options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/)
      return options
    })
  }
}
```

当 prefetch 插件被禁用时，你可以通过 webpack 的内联注释手动选定要提前获取的代码区块：

```js
import(/* webpackPrefetch: true */ './someAsyncComponent.vue')
```
:::tip
对于 prefetch 和 Preload 的详细使用，可以参考下面这篇文章，里边还提供了一些最佳实践的场景分享：

[使用 Preload&Prefetch 优化前端页面的资源加载](https://blog.csdn.net/vivo_tech/article/details/109485871?ops_request_misc=%25257B%252522request%25255Fid%252522%25253A%252522160913047616780276386432%252522%25252C%252522scm%252522%25253A%25252220140713.130102334.pc%25255Fall.%252522%25257D&request_id=160913047616780276386432&biz_id=0&utm_medium=distribute.pc_search_result.none-task-blog-2~all~first_rank_v2~rank_v29-12-109485871.nonecase&utm_term=vue%20cli%204%20prefetch) BY: vivo互联网技术
:::

### 3、通过 CDN 获取资源
比如```echarts```使用 CDN 资源引入（项目中对```echarts```配置了按需加载）

在```index.html```文件中添加资源标签
```html
<script src="https://cdn.bootcss.com/echarts/3.7.0/echarts.min.js"></script>
```
在```vue.config.js```中做配置，告诉```Webpack```打包时```echarts```是外部引入的
```js
module.exports = {
  configureWebpack: {
    externals: {
      echarts : 'echarts' // 不影响在项目中使用 import 引入 echarts
    }
  }
}
```
CDN 不只能用在引入外部 js 资源，如果有 json 或 md 数据，也可以把它当做一个 OOS 使用。甚至是创建自己的 CDN 服务器为自己服务，如果你对自己的服务器没有信心的话。
### 4、关闭```sourcemap```文件打包
打包后生成的```sourcemap```文件的主要用来处理```chunk```文件映射，这样你的程序到生产环境运行时报错还能找到源码对应的位置，但既然是生产环境了，```sourcemap```文件也没啥用了
```js
module.exports = {
  ......
  // 关闭 sourcemap
  productionSourceMap: false,
  ......
}
```
### 5、使用```Gzip```压缩文件
```Gzip```是默认绝大部分浏览器都支持的文件格式，```Gzip```能将默认打包生成的大文件压缩成小文件，从而提高项目的响应速度。

首先需要引入```Webpack```的```Gzip```压缩插件，在```package.json```中插入

```sh
"compression-webpack-plugin": "^1.1.12"
或
npm i compression-webpack-plugin@1.1.12 --save-dev
```

:::tip
别用太高版本的```compression-webpack-plugin```，会出现未知错误，本人深受其害，当时默认```npm```安装最新版，好家伙，花我半天去找问题。
:::


在```vue.config.js```中配置压缩规则：
```js
module.exports = {
  ......
  // Webpack 函数式配置
  configureWebpack: config => {
    // 生产环境配置
    if (process.env.NODE_ENV === 'production') {
    
      // 消除 console 输出信息
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true

      // Gzip 压缩
      const CompressionPlugin = require('compression-webpack-plugin')
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',  // 
          test: /\.(js|css|woff|woff2|svg)$/, // 哪些文件会被压缩
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false, // 不删除压缩前的文件，如果浏览器不支持 Gzip ,则会加载源文件
          minRatio: 0.8 // 压缩比大于 0.8 的文件将不会被压缩
        })
      )

      // 将 js 文件夹添加时间戳，这样浏览器不会加载上个版本缓存的代码
      config.output.filename = `js/[name].${timeStamp}.js`
      config.output.chunkFilename = `js/[name].${timeStamp}.js`
      
    } else {
      // 开发环境配置
    }
  },
  ......
}
```
配置```Gzip```压缩之后，需要你的服务器支持```Gzip```格式文件（浏览器支持，服务器不一定默认支持）

我用的比较多的是```Nginx```、```express```和```tomcat```，因此只列出这些服务器的配置方式，其他服务器都是异曲同工
#### Nginx 开启```Gzip```支持
在```conf/nginx.conf```中添加如下配置

```sh
 server {
   ......
	# 开启gzip
	gzip on;
		
	# 压缩的文件类型（如果没有你需要的类型，可以去 mime.types 里查看，然后复制过来）
	gzip_types text/plain application/javascript application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png font/ttf font/otf image/svg+xml;
		
	# 是否在 http header 中添加 Vary: Accept-Encoding 建议开启
	gzip_vary on;
	 ......
}
```

对于```gzip_types```的配置项，可以在```mime.types```文件里找到对应的类型，```mime.types```可以把它当做是浏览器支持的格式声明，因此就算修改其中的类型值，也是无用的

:::tip
我在做某个项目时，压缩了```ttf```文件，然而在```mime.types```文件没有发现```ttf```格式文件的支持类型，看了一下浏览器中对于```ttf```格式的类型是```Content-Type: application/x-font-ttf```，因此```ttf```压缩后的```Gzip```文件在服务器中并没有生效。
网络上虽然有```Ngnix```使用```Gzip```的```ttf```压缩痕迹，但是都是一笔带过。还是自己太菜了......
:::

#### Express 开启```Gzip```支持
安装对应依赖
```js
npm install compression --save
```
在```app.js```中启用
```js
var compression = require('compression')
var app = express()
// 启用gzip
app.use(compression())
```

#### Tomcat 开启```Gzip```支持
修改 tomcat 8 的 ```server.xml```，找到默认端口的位置，在后面添加配置如下
```html
<Connector connectionTimeout="20000" port="8080" protocol="HTTP/1.1" redirectPort="8443"
	compression="on" compressionMinSize="2048" noCompressionUserAgents="gozilla,traviata" 
	compressableMimeType="text/html,text/xml,text/css,application/javascript,text/plain"/>
```

### 体积性能优化后的结果
|  | 未优化 | 优化后 | Gzip 压缩后 |
|--|--|--|--|--|
| ````chunk-vendors.js````| 5.05 MB | 2.66 MB | 350 KB |
| ```echarts```| 2 MB | 1.08 MB | 90.4 KB |
| ````quasar````| 1MB | 294.62 KB | 44.39 KB |

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201208234226813.gif#pic_center)
### 这一次的性能优化到这就结束了，来看看效果
|  | 优化前 | 优化后 |
|--|--|--|
| ```Github```| 8s 左右 |3.5s 左右|
| ```Gitee```| 3s 左右 | 1s 左右 |


这是 v1.0.1 beta 版本的在```Gitee```上的访问速度，减去首屏动画 CDN 下载的耗时，速度在 3s 左右
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201209001308453.png#pic_center)
性能优化后在```Gitee```上访问的速度：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201209113921634.png#pic_center)
可以看到响应时间从 3.76 s 提升到了 1.073 s （减去首屏动画 CDN 下载的耗时）

性能优化后在```Github```上的访问速度

![在这里插入图片描述](https://img-blog.csdnimg.cn/20201209113811473.png#pic_center)
可以看到响应时间从 8 s 提升到了 3.57 s

在我自己的 Express 部署，然后 Ngnix 转发后的速度，减去首屏动画 CDN 下载的耗时 167 ms，优化后的速度为 347 ms
![在这里插入图片描述](https://img-blog.csdnimg.cn/20201209004210479.png#pic_center)

### 那天我拿着手电筒对着电视照亮迪迦奥特曼的能量指示器，助他战胜基里艾洛德星人 ┗( ▔, ▔ )┛
### 我，也变成了光 ~ ~

