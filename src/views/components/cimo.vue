<template>
  <base-content>
    <div class="base-markdown-content">
      <h2>1</h2>
      <p>2020 恍如隔世，60多次 commit，或许这是给 22 岁的自己一个交代吧。ambitions 架构师，冲！</p>
      <p>如果您觉得这个项目对您有帮助，可以请作者吃一碗螺蛳粉表示鼓励</p>
      <div class="row justify-center">
       <q-img width="450px" :src="this.$PUBLIC_PATH + 'data/pay.png'"/>
      </div>
      <p>972784674@qq.com</p>
      <q-parallax :height="150">
        <template v-slot:media>
          <video width="720" height="450" poster="https://cdn.quasar.dev/img/polina.jpg" autoplay loop muted>
            <source type="video/webm" src="https://cdn.quasar.dev/img/polina.webm">
            <source type="video/mp4" src="https://cdn.quasar.dev/img/polina.mp4">
          </video>
        </template>
        <h3 class="text-white">CIMO</h3>
      </q-parallax>
      <h2>2</h2>
      <h5>作者的其他项目</h5>
      <h5>2.1 cimo 音乐播放器 （Android）<a style="text-decoration: none" target="_blank" href="https://github.com/972784674t/Experiment08">Github地址</a></h5>
      <p>Service + BroadcastReceiver 实现</p>
      <div class="row justify-center">
        <iframe src="//player.bilibili.com/player.html?aid=625498947&bvid=BV1Bt4y1y7zF&cid=183527309&page=1"
                width="400px"
                height="850px"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"/>
      </div>
      <h5>2.2 CimoGallery （Android Material Design 组件集合Demo) <a target="_blank" style="text-decoration: none" href="https://github.com/972784674t/CimoShop">Github地址</a></h5>
      <p> <a target="_blank" style="text-decoration: none" href="https://www.bilibili.com/video/BV1w4411t7UQ?p=1">longway777</a> 这位大佬用 kotlin 写了一个简易版的画廊Demo，我就想能不能用 Java 也实现一个 Demo ，顺便加上自己喜欢的元素</p>
      <p>于是就对着 Kotlin 把 Java 代码敲出来了，还加了很多额外的功能。</p>
      <div class="row justify-center">
        <iframe src="//player.bilibili.com/player.html?aid=926946918&bvid=BV1vT4y1w7zf&cid=229851898&page=1"
                width="400px"
                height="850px"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"/>
      </div>
      <p></p>
      <h2>3</h2>
      <p>小技巧：</p>
      <p>- 当你在网络上找不到答案时，不妨去试试<a style="text-decoration: none" target="_blank" href="https://cn.vuejs.org/v2/api/"> Vue API </a>，自己探寻原理，找到解决方法。</p>
      <p>- 搞 IT，想要得到更及时的信息，或者不同的体验，科学上网尤为重要。</p>
      <p>- 感觉没有美感？不妨去看一看某个开源 ui 框架的设计规范</p>
      <p>- 请善用开发工具，比如 idea 用 ctrl + shift + f，全局搜索 tagView 就能找到相关代码。</p>
      <p>- icon 图标也是 svg 生成的文字，因此可以通过设置文字颜色来设置图标的颜色。</p>
      <p>- css投影应该是比较虚的，切勿太实，最好投影中融入一些背景色，比如这样：</p>
      <p>-</p>
      <div class="row justify-center">
      <q-btn
        align="center"
        class="logon-btn bg-logon-card-input"
        text-color="white"
        unelevated
        label=""
        style="font-size: large;"
      >注意投影变化
      </q-btn>
      </div>
      <h1></h1>
    </div>
  </base-content>
</template>

<script>
import BaseContent from '../../components/BaseContent/BaseContent'

export default {
  name: 'cimo',
  components: { BaseContent }
}
</script>
<style scoped>
  .bg-logon-card-input{
    background:  linear-gradient(to right, #36d1dc 1%, #5b86e5 99%);
    transition: all 0.3s ease-in-out;
    background-size: 200% auto;
    margin: 0 auto;
  }

  .bg-logon-card-input:hover{
    background-position: right center;
    box-shadow: 0 12px 20px -11px #5b86e5;
  }
</style>
