<h1 align="center">Markdown Editor built on Vue</h1>

<p align="center">
  <a href="https://npmcharts.com/compare/@kangc/v-md-editor?minimal=true"><img src="https://img.shields.io/npm/dm/@kangc/v-md-editor.svg?sanitize=true" alt="Downloads"></a>
  <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/v/@kangc/v-md-editor.svg?sanitize=true" alt="Version"></a>
  <a href="https://www.npmjs.com/package/@kangc/v-md-editor"><img src="https://img.shields.io/npm/l/@kangc/v-md-editor.svg?sanitize=true" alt="License"></a>
</p>

## Links

- [Demo](https://code-farmer-i.github.io/vue-markdown-editor/examples/base-editor.html)
- [中文文档](https://code-farmer-i.github.io/vue-markdown-editor/zh/)
- [更新日志](https://code-farmer-i.github.io/vue-markdown-editor/zh/changelog.html)

## 如何安装 

```bash
# 1. 项目中使用
  找到 package.json
  devDependencies: {
    ...
    "@kangc/v-md-editor": "1.4.10"  //最新版 2020.10
  }
  执行：
  npm install

# 2. use npm 
npm i @kangc/v-md-editor -S

# 3. use yarn
yarn add @kangc/v-md-editor
```

## 快速开始

```js
import Vue from 'vue';
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
// 使用 vuepressTheme 主题
VueMarkdownEditor.use(vuepressTheme);

Vue.use(VueMarkdownEditor);
```

## 使用

```html
<template>
  <v-md-editor v-model="text" height="400px"></v-md-editor>
</template>

<script>
  export default {
    data() {
      return {
        text: '',
      };
    },
  };
</script>
```

## 引用

- [ElementUi Scrollbar Component](https://github.com/ElemeFE/element/tree/dev/packages/scrollbar)
- [vuepress-plugin-container](https://vuepress.github.io/zh/plugins/container/)
