Quasar支持：Material Icons、Font Awesome、Ionicons、MDI、Eva Icons和Themify Icons。
这个项目的图标集使用的是quasar自带的material design和fontawesome-v5图标集

[[toc]]

### 使用方式
```html
<!-- 单个图标使用 -->
<q-icon name="settings"/>

<!-- 在按钮上使用图标 -->
<q-btn color="primary" icon="mail" label="On Left" />
```
几乎所有的组件都提供了icon属性来设置图标

如果想要使用Quasar的其他图标集合，请在```quasar.js```里添加对于的依赖即可使用，关于图标的依赖都在```quasar/extras```目录下,比如我想要使用mdi-v4图标集

```js
import '@quasar/extras/mdi-v4/mdi-v4.css'
```

### 注意，需要使用全小写才能正确使用图标
在导入图标集合是发现，集合导出的图标名称是驼峰命名的，但是在quasar里使用驼峰命名的图标会出问题，比如：
图标名为 ArrowUpward 时
需要为 ```<q-icon name="arrow_upward"/>``` 才能正确使用
### 如果你想制作一个图标集合界面，就需要对导出的图标集合名词进行修改，使用正则是最方便的修改方式
```js
// 下面是针对 material 和 fontawesome-v5 图标集的修改
// 驼峰转 - 连接,并且添加' fa-'前缀
toLowerLine (str) {
  if (str.substr(0, 3) === 'mat') {
    return str.replace(/([A-Z]|\d+)/g, (a, l) => `_${l.toLowerCase()}`).substring(4)
  }
  if (str.substr(0, 2) === 'fa') {
    return str.replace(/([A-Z]|\d+)/g, (a, l) => `-${l.toLowerCase()}`).replace(/-/, ' fa-')
  }
}
```

### 当然你也可以使用第三方工具包，比如：``name-styles``

```js
import {
    camel,
    pascal,
    hyphen,
    snake
} from "name-styles";
 
const s = "Hello Name-Styles";
 
camel(s);
// helloNameStyles
 
pascal(s);
// HelloNameStyles
 
hyphen(s);
// hello-name-styles
 
snake(s);
// hello_name_styles
```

下面是quasar对各个图标集图标名称的限制（我也不知道为啥要加这些限制）

| Quasar IconSet name | Name prefix | Examples | Notes |
| --- | --- | --- | --- |
| material-icons | *None* | thumb_up | Notice the underline character instead of dash or space |
| material-icons-outlined | o_ | o_thumb_up | Notice the underline character instead of dash or space; **Quasar 1.0.5+** |
| material-icons-round | r_ | r_thumb_up | Notice the underline character instead of dash or space; **Quasar 1.0.5+** |
| material-icons-sharp | s_ | s_thumb_up | Notice the underline character instead of dash or space; **Quasar 1.0.5+** |
| ionicons-v4 | ion-, ion-md-, ion-ios-, ion-logo- | ion-heart, ion-logo-npm, ion-md-airplane | Use QIcon instead of `<ion-icon>` component; Logo icons require 'ion-logo-' prefix |
| fontawesome-v5 | fa[s,r,l,d,b] fa- | "fas fa-ambulance" | QIcon "name" property is same as "class" attribute value in Fontawesome docs examples (where they show `<i>` tags) |
| mdi-v5/v4/v3 | mdi- | mdi-alert-circle-outline | Notice the use of dash characters; Use only one of mdi-v5, mdi-v4 or mdi-v3 |
| eva-icons | eva- | eva-shield-outline, eva-activity-outline | Notice the use of dash characters |
| themify | ti- | ti-hand-point-up | Notice the use of dash characters |
| line-awesome | la[s,r,l,d,b] la- | "las la-atom" | QIcon "name" property is same as "class" attribute value in Line Awesome docs examples (where they show `<i>` tags); 

### 当然你也可以使用iconfont图标集
使用iconfont图标集的方式在百度上都有，而且很简单，需要的话自己整合即可
