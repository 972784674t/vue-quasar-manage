## LoadingBar 加载栏

[[toc]]

加载栏配置在```/components/loadingBar```
```js
import { LoadingBar } from 'quasar'

LoadingBar.setDefaults({
  color: 'blue',
  size: '2.3px',
  position: 'top'
})

export default LoadingBar
```
之后在路由守卫中使用它
```js
import LoadingBar from '../components/loadingBar/loadingBar'

router.beforeEach((to, from, next) => {
  LoadingBar.start()
  ......
}

router.afterEach(() => {
  LoadingBar.stop()
})
```
### 如何自定义颜色
在```css```中添加
```css
/* 必须以 bg- 开头 */
.bg-my-loadingBar-color{
    background: red
}
```
在```LoadingBar.js```中使用
```js
import { LoadingBar } from 'quasar'

LoadingBar.setDefaults({
  // 注意：loadingBar 在装载颜色时，会在类名前面自动加上'bg-'，
  // 因此我们只需要填写 'my-loadingBar-color' 即可
  color: 'my-loadingBar-color',
  size: '2.3px',
  position: 'top'
})

export default LoadingBar
```
### 为加载栏添加动画效果
在```css```中
```css
.bg-my-loadingBar-color{
    background-image: linear-gradient(to right, #56ccf2, #2f80ed, #eeeeee) !important;
    background-size: 400% !important;
    animation: loadingBar_animation 3s infinite;
}

@keyframes loadingBar_animation {
    0% {
        background-position: 0 0;
    }
    100% {
        background-position: -100% 0;
    }
}
```
