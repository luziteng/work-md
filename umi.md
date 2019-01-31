# umi

[umi.js中文文档](https://umijs.org/zh/guide/)

#### 介绍：

umi，中文可发音为乌米，是一个可插拔的企业级 react 应用框架。 

#### 特性：

- 📦 **开箱即用**，内置 react、react-router 等
- 🏈 **类 next.js 且功能完备的路由约定**，同时支持配置的路由方式
- 🎉 **完善的插件体系**，覆盖从源码到构建产物的每个生命周期
- 🚀 **高性能**，通过插件支持 PWA、以路由为单元的 code splitting 等
- 💈 **支持静态页面导出**，适配各种环境，比如中台业务、无线业务、[egg](https://github.com/eggjs/egg)、支付宝钱包、云凤蝶等
- 🚄 **开发启动快**，支持一键开启 [dll](https://umijs.org/zh/plugin/umi-plugin-react.html#dll) 和 [hard-source-webpack-plugin](https://umijs.org/zh/plugin/umi-plugin-react.html#hardSource) 等
- 🐠 **一键兼容到 IE9**，基于 [umi-plugin-polyfills](https://umijs.org/zh/plugin/umi-plugin-react.html#polyfills)
- 🍁 **完善的 TypeScript 支持**，包括 d.ts 定义和 umi test
- 🌴 **与 dva 数据流的深入融合**，支持 duck directory、model 的自动加载、code splitting 等等

#### 环境准备：

1、首先得有node，并确保node版本是8.10或以上。

2、C盘安装依赖命令：`npm i yarn tyarn -g`

3、然后全局安装umi，并确保版本是2.0.0或以上。

```
$ yarn global add umi
$ umi -v
2.0.0
```

