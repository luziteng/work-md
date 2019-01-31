





# Ant Design Pro @2.1.1版本

#### 1、搭建一个项目

a、新建一个空文件夹，从 GitHub 仓库中直接安装最新的脚手架代码。 

```
$ git clone --depth=1 https://github.com/ant-design/ant-design-pro.git my-project
$ cd my-project
```

生成的目录结构,我们已经为你生成了一个完整的开发框架，提供了涵盖中后台开发的各类功能和坑位，下面是整个项目的目录结构。

```
├── config                   # umi 配置，包含路由，构建等配置
├── mock                     # 本地模拟数据
├── public
│   └── favicon.png          # Favicon
├── src
│   ├── assets               # 本地静态资源
│   ├── components           # 业务通用组件
│   ├── e2e                  # 集成测试用例
│   ├── layouts              # 通用布局
│   ├── models               # 全局 dva model
│   ├── pages                # 业务页面入口和常用模板
│   ├── services             # 后台接口服务
│   ├── utils                # 工具库
│   ├── locales              # 国际化资源
│   ├── global.less          # 全局样式
│   └── global.js            # 全局 JS
├── tests                    # 测试工具
├── README.md
└── package.json
```

b、在my-project文件中安装依赖。`$ npm install` 

c、 启动服务器代码:`$ npm start` 。启动完成后会自动打开浏览器访问 [http://localhost:8000](http://localhost:8000/)，你看到登录页面。 

#### 2、改变首次加载的默认路由

因为在config/router.config.js中它默认设置为跳转BasicLayout：基础页面布局。包含了头部导航，侧边栏和通知栏 。由于@2.1版本是12月份才出的，网上除了官方文档，也没有其他资料文档。官方给出的方案是：

![1546676541957](C:\Users\lp\AppData\Local\Temp\1546676541957.png)

我就是天真的信了官方文档，结果一直报错，也没有什么用。

![1546676687149](C:\Users\lp\AppData\Local\Temp\1546676687149.png)

事实上在`./src/pages/.umi/router.js`中是可以找到test的。

#### 3、新建页面，添加基础布局

a:首先添加以下两句代码：

```
import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'; //基础布局，侧边导航栏和头部等
```

b:在render()中return（<PageHeaderWrapper>标签）；此时新页面就会有侧边导航栏、头部菜单、页头信息、底部注释；

c:如果你不想要页头，可以在`src/components/PageHearderWrapper/index.js`中将`<MenuContext.Consumer>` 标签注释掉，以及响应的配置引入。！！！记住只能把`<MenuContext.Consumer>`标签注释掉，否则你想在页面中添加任何结构都无法显示。

d:如果你想加入一些ant design的组件，可以先在首部添加

```
import {放置组件名，如：Button, Card,} from 'antd';
```

#### 4、链接数据

A:首先我先在utils   文件夹下新建一个apis.js文件，此文件放置所有的接口IP与接口名（接口IP一般都相同），

如登录接口：

```
const prefix = 'http://XX.X.X.XXX:8081/';

const admin = {
    login: `${prefix}admin/auth`,
}
```

B:在`services/api.js`的文件夹中配置登录的接口及方法；

```
import request from '@/utils/request';
import {admin,} from '../utils/apis';//引入apis中的admin

// 登录接口
export async function isLogin(params) {
  return request(admin.login,{
    method:'POST',
    body: {
      ...params,
    },
  });
}

```

C:在`src/models/login.js`中操作拿到的数据。这里有三个关键点，

1、首先是`namespace:""`的命名。`namespace:""`的命名是要在页面中链接数据使用的。



![1547031237049](C:\Users\lp\AppData\Roaming\Typora\typora-user-images\1547031237049.png)![1547031190895](C:\Users\lp\AppData\Roaming\Typora\typora-user-images\1547031190895.png)

2、第二effects中请求数据命名，必须要和`namespace：""`的命名一致。

`*login({ payload }, { call, put })`

3、第三 yield call中的请求名为`services/api.js`中登录接口命名。所以这里为

 `const response = yield call(isLogin, {username,password:md.digest().toHex()});`

D：在`src/pages/？`文件中链接数据时，如果要加上loading效果，需要在@connect中引入loading；如

```
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
```

#### 5、表格问题

1、表格中的dataIndex的命名对应后端数据字段命名，这样表格的数据就会自行渲染。

2、表格排序问题，使用表格API的onChange：分页、排序、筛选变化时触发。function函数必须把三个文档中的三个参数都带上，否则会拿不到结果，打印出来的参数为空。

![1548661411837](C:\Users\lp\AppData\Roaming\Typora\typora-user-images\1548661411837.png)

##### 6、标签页问题

1、Tabs标签切换页去掉底下border===》tabrStyle={{border:0}}

2、在选项卡头显示文字或者徽标数，使用文档中的Tabs.TabPan属性tab;`tab={<Badge dot offset={[4,0]}>分成规则</Badge>}`

##### 7、标签问题

1、标签配合选择器的写法，如果标签是静态生成的，可在render()中定义个对象常量，在选择器中使用一个map函数遍历出来。

```
 const owners = [
 {id: 'tailor',name: '裁剪',},
 {id: 'perm',name: '烫发',},
 {id: 'dye',name: '染发',},
 {id: 'manage',name: '经营',},
 {id: 'sculpt',name: '造型',},
 {id: 'other',name: '其他',},];
 
 
 // 值得注意的是 Options中必须给个key! value决定了select的value值，这里可以根据要传给后端的数据进行改变，
 <Select mode="multiple" placeholder="点击选择标签">
     {owners.map(owner => (
     <Options key={owner.id} value={owner.name}>{owner.name}								</Options>
     ))}
 </Select>
```

