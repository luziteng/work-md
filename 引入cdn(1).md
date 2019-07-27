### 在项目中引入cdn
> 个人理解，对不对不一定

> [较为完整的看得懂的参考](https://juejin.im/post/5a7b22026fb9a0634b4d6393)

- 首先，引入cdn只是为了打包上线之后，可以直接通过script的方式去访问这些cdn的依赖，因此打包的时候不用打包这些依赖，就可以大大的减少包体积！
- 所以！开发环境中还是需要 npm install 安装相关依赖的！！！

#### 那如何引入cdn的依赖不被打包？
> `webpack` 提供了 `externals` 作用是从打包的bundle文件中排除依赖。也就是通过import引入的依赖在打包的时候不会打包到bundle包中去，而是通过script的方式去访问这些依赖

#### 引入步骤
1. 在html入口文件中引入
```
// antd pro中在 antd-pro\src\pages\document.ejs文件中
// vue 在 vue\index.html 文件中

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
    />
    <title>Ant Design Pro</title>
    <link rel="icon" href="/favicon.png" type="image/x-icon" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.24.0/moment.min.js"></script> // 引入cdn 版本？ 看下面
    <script src="https://gw.alipayobjects.com/os/antv/pkg/_antv.g2-3.5.0/dist/g2.min.js"></script> // 引入cdn 直接在对应的官网查看，或者直接搜索
  </head>
  <body>
    <noscript>Sorry, we need js to run correctly!</noscript>
    <div id="root"></div>
  </body>
</html>

```
说明： 如何选择版本号？ **看package.json中安装的版本号**
```
  "dependencies": {
    "@antv/g2": "^3.5.0", // 对应这里的版本号
    "moment": "^2.24.0",
  },
```

2. 配置`external`
```
// 在 antd-pro\config\config.js 文件中 config文件

export default {
 ...,
 
  output: {
    libraryTarget: 'umd',
  },
  
  <!--配置externals 将需要忽略打包的都写在这个里面，但前提是index.html文件里面必须script引入-->
  externals: {
  // 后面是原本使用的全局变量名，前面的是引入的包名（就是import xx from 'moment'），然后我们实际写代码时候，用的是xx这个变量名。
    moment: 'moment',   
    '@antv/g2': 'G2',
  },
  
  // webpack就会在遇到引用moment或者@antv/g2的模块时，不将其打包入bundle.js中。所以moment或@antv/g2代表的是模块名，一定不能写错。模块名参照package.json中的包的名称
  
  ...
};
```

3. 页面中引入
```
import moment from 'moment';
import G2 from '@antv/g2';
```
