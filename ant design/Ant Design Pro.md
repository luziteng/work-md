





# Ant Design Pro @2.1.1版本

### 1、搭建一个项目

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

c、 启动服务器代码:`$ npm start` 。启动完成后会自动打开浏览器访问 [http://localhost:8000](http://localhost:8000/)，你看到分析页面。 



### 3、新建页面，添加基础布局

a:首先添加以下两句代码：

```
import React, { PureComponent } from 'react';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'; //基础布局，侧边导航栏和头部等
```

b:在render()中return（<PageHeaderWrapper>标签）；此时新页面就会有侧边导航栏、头部菜单、页头信息、底部注释；

c:如果你不想要页头，可以在`src/components/PageHearderWrapper/index.js`中将`<MenuContext.Consumer>` 标签注释掉，以及相应的配置引入。！！！记住只能把`<MenuContext.Consumer>`标签注释掉，否则你想在页面中添加任何结构都无法显示。

需要页头时使用<PageHeaderWrapper>包住所有标签

d:去除head UI(包含消息，头像，缩略图、搜索等)。在src/layouts/Header.js中将HeaderDom标签及相应的代码注释。

e:如果你想加入一些ant design的组件，可以先在首部添加

```
import {放置组件名，如：Button, Card,} from 'antd';
```

### 4、链接数据

**一定要去过一遍dva的官方文档，以下给的一些dva的文档链接**

[DvaJS](https://dvajs.com/guide/introduce-class.html#react-没有解决的问题)

[Dva model层理解](https://blog.csdn.net/zeng__yi/article/details/83211070)

[dva作者GitHub](https://github.com/dvajs/dva-knowledgemap)

[使用dva框架开发项目](https://github.com/dvajs/dva-knowledgemap)

A:首先我先在utils   文件夹下新建一个apis.js文件，此文件放置所有的接口IP与接口名（接口IP一般都相同），

如登录接口：

```
const prefix = 'http://XX.X.X.XXX:8081/';

const admin = {
    login: `${prefix}admin/auth`, // ${prefix}后面拼接后端给的接口名
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

C:在`src/models/login.js`中操作拿到的数据。这里有四个关键点，

1、首先是`namespace:""`的命名。`namespace:""`的命名是要在页面中链接数据使用的。

如在models中命名为： `namespace: 'login',`

则在页面中请求数据为：

```
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
}))
```

如果要在加载数据是添加loading效果可以这么写

```
@connect(({ organization, loading }) => ({
  organization,
  loading: loading.models.organization,
}))
```

2、 yield call中的请求名为`services/api.js`中登录接口命名。所以这里为

 `const response = yield call(isLogin, {username,password:md.digest().toHex()});`

3、effects中请求数据的命名，这里的命名会关系到页面中请求数据的拼接， 页面中请求，根据namespace与effects中的命名。

4、在`src/pages/？`文件中链接数据时，如果要加上loading效果，需要在@connect中引入loading；如

```
@connect(({ login, loading }) => ({
  login,
  submitting: loading.effects['login/login'],
  // loading: loading.models.organization,
}))
```

5、在页面中需要在componentDidMount()中请求数据并渲染的，在model的state中的定义变量，必须定义相应的初值，否则渲染会报错。

6、在request.js中加入以下代码

```
 else {
    let params = [];
    for (let key in newOptions.body) {
      params.push(key + '=' + newOptions.body[key]);
    }

    url += '?' + params.join('&');
    delete newOptions.body;
  }
```

7、登录失效，无法请求数据，跳转到登录页面。

```
 if (newOptions.method === 'DELETE' || response.status === 204) {
        
        return response.text();
      }
      response = response.json()
      response.then(function(result){
        if(result.code  === 401){
          message.error(result.msg)
          window.g_app._store.dispatch({
            type: 'login/logout',
          });
        }else{
          console.log(result)
        }
      })
      return response
    })
```

8、如果直接在页面中拿到数据则没有数据缓存的问题，写法如下：

models层

```
*gainPeople({ payload, callback }, { call }) {
            const response = yield call(applyPeopleMagess, payload);
            if (response.code === 200) {
                if (callback && typeof callback === 'function') {
                    callback(response); // 返回结果
                }
            } else if (callback && typeof callback === 'function') {
                callback(response); // 返回结果
            }
        },
```

页面：

```
 callback:(response) =>{
          if(response.code===200){
            if(response.data){
              const {studentName,studentPhone,studentIdCard,city,province,workTime,haircutPrice,hotDyePrice,performance,works,question} =response.data;
              let address = '';
              if(city===province){
                address=city
              }else{
                address=city+province;
              }
              let photo = works;
```



### 5、表格问题

1、表格中的dataIndex的命名对应后端数据字段命名，这样表格的数据就会自行渲染。

2、表格排序问题，使用表格API的onChange：分页、排序、筛选变化时触发。function函数中的各个参数必须遵循官方API的写法，`Function(pagination, filters, sorter, extra: { currentDataSource: [] })`，各个参数的顺序不能打乱，否则会拿不到结果，打印出来的参数为空。

```
    handleTableChange = (pagination) => {
      const { 
        dispatch,course
      } = this.props;
      const {peopleNum} =this.state;
      const {courseId} = course;
      dispatch({
        type: 'course/gainDividePeople',
        payload: {
          courseUid:courseId,
          schemeId:peopleNum,
          page: pagination.current,
          size:5,
        }
      });
    }       
            
```

3、表格分页栏属性的几种方法：

​	`pagination={false} // 不展示也不进行分页`

```
 pagination={{
     hideOnSinglePage:true,
 }}// 只有一页时不显示分页器
```

注意：orgsPage为后端传回来的数据

```
  const {pageNum,pageSize,totalCount,} = orgsPage;
          const paginationProps ={
            current:pageNum,
            pageSize,
            total:totalCount,
            hideOnSinglePage:true,
          }
```

```
  <Table
      columns={columns}
      dataSource={list}
      loading={loading}
      onChange={this.handleTableChange}
      rowKey={record => record.organizeUid}
      pagination={paginationProps}
  />
```



### 6、标签页问题

1、Tabs标签切换页去掉底下border===》tabBarStyle={{border:0}}

2、在选项卡头显示文字或者徽标数，使用文档中的Tabs.TabPan属性tab;

```
{
    shareSchemeDetail==='0'? 
    <TabPanes
    key='3'
    style={{fontSize:16}}
    tab={
    <span>分成规则<Badge dot offset={[0,-6]} /></span>}
    ><CourseDivide />
    </TabPanes>:
    <TabPanes 
    tab="分成规则" 
    key='3' 

    ><CourseDivide />
    </TabPanes>
}
```



### 7、标签问题

1、标签配合选择器的写法，如果标签是静态生成的，可在render()中定义个对象常量，在选择器中使用一个map函数遍历出来。

```
 const owners = [
 {id: 'tailor',name: '裁剪',},
 {id: 'perm',name: '烫发',},
 {id: 'dye',name: '染发',},
 {id: 'manage',name: '经营',},
 {id: 'sculpt',name: '造型',},
 {id: 'other',name: '其他',},];
 
 
 // 值得注意的是 Options中必须给个key! value决定了select的value值，这里可以根据要传给后端的数据进行改变，必须设value值，否则拿不到数据
 <Select mode="multiple" placeholder="点击选择标签">
     {owners.map(owner => (
     <Options key={owner.id} value={owner.name}>{owner.name}								</Options>
     ))}
 </Select>
```

### 8、form表单问题

##### 1、从一个组件拿到数据赋初值给另一个组件的form表单，如从表格到弹窗；

方法一：将数据先存入state，在从state拿数据用initialValue渲染；（注意不用大括号）

```
 {getFieldDecorator('phone',{
                                        initialValue:userPhone
                                    })(<Input placeholder={userPhone} />)}
```

方法二：直接通过回调的函数用setFieldsValue给form发送，注意这个地方只调用一次

```
showModal = (record) => {
      const {avatar , nickname , phone,} = record;
      const {form} = this.props;
      form.setFieldsValue({
        nickname:nickname,
        phone:phone,
      })
    }
```

##### 2、清除form表单中控件中的数据resetFields

```
   const {form} = this.props;
   this.props.form.resetFields();   //清除所有的
   this.props.form.resetFields(`conditionDesc`,[]);  //清除指定的一个
    //清除多个
    this.props.form.resetFields(['conditionDesc','origin','originItem',[]]);
```

##### 3、获取form表单中控件的数据

获取单个值：`getFieldValue`

获取多个值：`getFieldsValue`如不传入参数，则获取全部组件的值

```
 const {form} = this.props;
 const generalUserNum = form.getFieldValue('generalUser');
```

##### **4、form表单中多选框设初值的问题**

```
 {getFieldDecorator('orgAdduse',{
 initialValue:['A']
 })(
 // <Checkbox value='a' style={{marginLeft:100}}>是否启用为默认地址</Checkbox>不好使
     
     <Checkbox.Group style={{ width: '100%',marginLeft:96 }}>
     <Row>
     <Col span={15}><Checkbox value="A">是否启用为默认地址</Checkbox></Col>
     </Row>
     </Checkbox.Group>
  )}
```

注意：如果初始值为变量，一定要给变量加中括号。

这还有另一个方法自己封装一个多选框组件。

##### 5、form表单中给级联选择器设初始值的问题

​	cascader中有一个属性`fieldNames`，为设置form表单中的获取的value值，默认为code码（如地址的01码）。需要给cascader设置为`fieldNames={{value:'label'}}`，这样拿到的value值则为string字符。

在form表单中给cascader设置初始值时，必须为string字符。不管后端给的为code码还是string，最后都要设为string。后端给的数据为string数组时，要给cascader设置为`fieldNames={{value:'label'}}`，不然会出现初始值为空白，渲染不出来的情况。

​	配合China-division使用方式，首先安装China-division包：`npm install china-division`

接着在`src/components`路径下创建ChineseMap文件夹，新建文件cascader-address-options.js;配置以下代码：

```
import provinces from 'china-division/dist/provinces.json';
import cities from 'china-division/dist/cities.json';
import areas from 'china-division/dist/areas.json';

areas.forEach((area) => {
  const matchCity = cities.filter(city => city.code === area.cityCode)[0];
  if (matchCity) {
    matchCity.children = matchCity.children || [];
    matchCity.children.push({
      label: area.name,
      value: area.code,
    });
  }
});

cities.forEach((city) => {
  const matchProvince = provinces.filter(province => province.code === city.provinceCode)[0];
  if (matchProvince) {
    matchProvince.children = matchProvince.children || [];
    matchProvince.children.push({
      label: city.name,
      value: city.code,
      children: city.children,
    });
  }
});

const options = provinces.map(province => ({
  label: province.name,
  value: province.code,
  children: province.children,
}));

export default options;
```

在使用到行政地址的文件中引入cascader-address-options.js文件；使用：`<Cascader options={options} fieldNames={{value:'label'}} placeholder='点击选择机构地址' />`。如果`import provinces from 'china-division/dist/provinces.json';`的时候，并没有把数据引用过来，返回值是一个{}；则因为没有json-loader，webpack打包不识别json文件，npm install json-loader后再webpack里配置下就ok了

##### 6、设置form表单中input、select等各种输入框的value长度，`maxLength={30}`（maxLength=number）

##### 7、form表单输入框输入特殊字符，报错400参数错误的问题

（问题出现的原因，后端坚持认为get请求没问题）

如果是select选择框远程搜索，需要做特殊字符过滤，可以使用if判断。

如果是输入框可以使用正则校验。

最简单的方法还是使用post请求，因为get请求会在URL上拼接，不允许有特殊字符。

##### 8、form表单输入框的正则表达式写法

```
{getFieldDecorator('userIPhone',{
                          initialValue:phone,
                          validateTrigger:'onBlur',
                          rules: [{ 
                            required: true,
                            whitespace:true, 
                            message: '请输入手机号码', 
                          },
                          {
                            pattern: /^1[345789]\d{9}$/,
                            message: '号码格式不正确', // 正则提示
                        },],})(<Input placeholder='请输入手机号码' maxLength={11} />)}
```

##### 9、去除input输入框会有下拉缓存的问题

<Input placeholder='请输入课程名称' maxLength={20} autoComplete="off" />

添加`autoComplete="off"`

##### 10、使用form绑定rules问题

​	 在同一文件下，不同的form表单都是用了rules， `form.validateFields((err,values)=>{if(!err)})`触发校验，会将页面中的所有的rules校验，所以弹窗表单，可以放在不同的js文件中。

​	使用form绑定搜索框，如果在同一表单中还用form绑定rules，要避免使用 `form.validateFields((err,values)=>{if(!err)})`否则会出现函数不执行的情况。

### **9、modal对话框问题**

1、使用`destroyOnClose`属性在关闭时销毁 Modal 里的子元素，重打开modal时便会重新渲染。

2、点击蒙层是否允许关闭`maskClosable`属性设置为false时点击不关闭。

### 10、upload上传图片问题

1、ant design@3.13.1版本，上传组件存在控件fileList在测试环境无法正常上传的问题。将ant design升级最新版本解决。这里需要注意的是本地项目升级版本后，部署环境上也要升级。

2、在upload组件上设置默认图片时，fileList控件必须加uid这个参数值，否则会报错 Each child in an array or iterator should have a unique "key" prop。或 must set key for <rc-animate> children

```
  fileList = [{
        key,
        url,
        status: 'done',
        uid:uid||key,
        name:name||'',
      }]
```

3、设置headers参数：需要使用两个大括号

### 11、时间日期选择框问题

1、设置不可选日期使用disabledDate参数，设置不可选的日期函数。如 `disabledDate={disabledDate}`

```
function disabledDate(current) {
  console.log(current);
  return current && current < moment().endOf('day');//今天以前的日期不可选，包括今天
  return current > moment().startOf('day');//今天以前的日期不可选，包括今天
  return current < moment().startOf('day');// 今天以前的日期不可选，不包括今天
}
```

[设置日期或拿日期参考网站](http://momentjs.com/)

2、设置日期初始值

```
initialValue: [moment(dateBegin,'YYYY/MM/DD HH:mm:ss'), moment(dateEnd,'YYYY/MM/DD HH:mm:ss')], /// 变量不需要加大括号
```

3、将后端传回的毫秒数据转换为日期与时间

```
// 时间转换
timeChange =(time)=>{
  let unixTimestamp = new Date( time ) ;
  let commonTime = unixTimestamp.toLocaleString();
  Date.prototype.toLocaleString = function() {
    return this.getFullYear() + '/' + (this.getMonth() + 1) + '/' + this.getDate() + ' ' + this.getHours() + ":" + this.getMinutes() + ":" + this.getSeconds();
   };
   return commonTime;
}
```

```
// 时间转换
timeChange =(time)=>{
  let unixTimestamp = new Date( time ) ;
  let commonTime = unixTimestamp.toLocaleString();
  Date.prototype.toLocaleString = function() {
    let h = this.getHours() < 10 ? '0'+this.getHours() : this.getHours();
    let m = this.getMinutes() < 10 ? '0' + this.getMinutes() : this.getMinutes();
    let s = this.getSeconds() < 10 ? '0' + this.getSeconds() : this.getSeconds();
    return this.getFullYear() + '/' + (this.getMonth() + 1) + '/' + this.getDate() + ' ' + h + ":" + m + ":" + s;
   };
   return commonTime;
}
```

4、ant design 的日期选择框传给后端的数据为毫秒数。如果需要转化可用：`.format('YYYY-MM-DD hh:mm:ss')`设为年月日时分秒

### 12页面跳转传参

#### 方法一：各个页面同用一个model层，在model层中完成跳转。

例如：在跳转时实现存储数据，使用方法跳转。缺点：会有model层数据存储的，处理不好会有各种bug，无法进行刷新，刷新后存储的数据丢失。

```
       // 机构详情的ID  model层
       import {routerRedux} from 'dva/router';
       
        *gainOrgUid({payload}, {put,}){
            yield put({
                type: 'getId',
                payload
                
            })

            yield put(
                routerRedux.push('/organization/orgdetail')
            )
        },
        
        // js层
         sendUid = (record) => {
          const { dispatch} = this.props;
          const organizeId = record.organizeUid;
          dispatch({
            type: 'organization/gainOrgUid',
            payload: {
              organizeId,
              tabsKey:'1',
              })
          }
        
```

#### 	方法二：在URL上传递参数。页面刷新不会引起参数丢失。

首先在router.config.js中配置要跳转路由的参数。例如：

```
 {
        path:'/lineclass/coursedetail/:id/:orgid/:tabsKey',
        name:'课程详情',
        component:'./LineClass/Course/Coursedetails',
        hideInMenu: true,
  },
  转递多个参数
```

在该路由对应的页面中拿到参数

```
 const id = this.props.match.params.id;
 const organzitionId = this.props.match.params.orgid;
 const tabsKey = this.props.match.params.tabsKey;
```

如果在该页面中引入其他组件，也需要URL上的参数，采取父传子的方式；

在父组件中：

```
  constructor(props){
    super(props)
    this.state={
      id:this.props.match.params.id,
      orgId:this.props.match.params.orgid
    }
  }

```

引入的组件赋予参数

```
  <TabPanes tab="课程管理" key='1'><CourseManage courseId={this.state.id} organizeId={this.state.orgId} /> </TabPanes>
```

在子组件页面拿到参数的方式，直接通过this.props.参数，就可以拿到。

父传子 ｛…props｝直接继承爸爸所有props

### 13、ant design pro动态添加样式

#### 	方法一：给标签多个类名

页面编写：

```
 <li 
     className={`${styles.initialLi} ${item.id === tabsKey ? styles.active}` : ''}
     key={item.id} 
     onClick={() => {this.itemNav(item.id)}}
     >
     {item.title} <div className={styles.activeBorder} />
  </li>
```

less文件中：

```
   .initialLi{
          float: left;
          padding:0 18px;
          &.active{
            color:#008AFF;
            .activeBorder{
              margin:0 5px;
              border-bottom:2px solid #008AFF;
            }
          }
        }
```

#### 方法二：className中使用使用函数，进行命名

页面中：

```
    <a className={isActive('today')} onClick={() => selectDate('today')}>
                    今日
                    </a>
                    <a className={isActive('week')} onClick={() => selectDate('week')}>
                    本周
                    </a>
                    <a className={isActive('month')} onClick={() => selectDate('month')}>
                    本月
                    </a>
                    <a className={isActive('year')} onClick={() => selectDate('year')}>
                    全年
                    </a>
     </div>
```

函数：进行操作，并返回命名的名称

```
  isActive = type => {
    // console.log(type);
    const { rangePickerValue } = this.state;
    const value = getTimeDistance(type);
    if (!rangePickerValue[0] || !rangePickerValue[1]) {
      return '';
    }
    if (
      rangePickerValue[0].isSame(value[0], 'day') &&
      rangePickerValue[1].isSame(value[1], 'day')
    ) {
      // console.log( rangePickerValue[0].isSame(value[0], 'day'))
      // console.log(styles.currentDate);
      return styles.currentDate;
    }
    return '';
  };
```



# Ant design Pro 错误笔记

##### 1、警告Warning: ``defaultValue is invalid for getFieldDecorator will set value, please use option.initialValue instead.`

原因：

​	1、使用getFieldDecorator（）方法包装后的组件会自动更新表单组件的value以及onChange事件，无需再手动添加value属性,但onChange事件可根据需求添加以便监听数据变化。真是因为手动添加value属性才导致Warning的发生。

2、`getFieldDecorator`、`Select`、`Input`等组件中设置`defaultValue`；



解决：可以把`defaultValue`删掉或者改为`initialValue`。如果需要填写初始默认值也使用initialValue进行设置。

##### 2、错误提示`Cannot read property 'getFieldDecorator' of undefined`

原因：引入Form表单的‘getFieldDecorator’，缺少必要的引入和声明

解决：首先要引入`@Form.create()`

​	 其次要在render()中声明，   `const { form: { getFieldDecorator },  } = this.props;`

##### 3、错误提示：Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment；

原因：在jsx中在render中return中返回的html元素可能返回不止一个元素；此时又没有用ant design 中的组件包裹。例如在return（）直接返回两个div兄弟元素。

解决办法：使用一个空的div包裹所有标签；

##### 4、上传问题

1、想要选择上传的格式为PNG或者JPG时发生错误，图片无法预览也无法上传。

```
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  const isPNG = file.type === 'image/png';
  if (!isJPG || !isPNG) {
    message.error('图片格式只能为 JPG 或 PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!');
  }
  
  return isJPG && isLt2M && isPNG;
}
```

原因：暂时不知道

解决方法：

```
function beforeUpload(file) {
    const isPicture = (file.type === 'image/jpeg'  || file.type === 'image/png');
   // const isPNG = file.type === 'image/png';
    if (!isPicture) {
      message.error('图片格式只能为 JPG 或 PNG!');
      console.log('格式'); 
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('图片大小不能超过 2MB!');
      console.log('太大');
    }
    
    return isPicture && isLt2M ;
  }

```

##### 5、解构问题

下面这样的写法有时能拿到数据有时不能，归根结底是react的生命周期问题，数据请求时，例如下面的headMesss为空时，数据data肯定不存在。

```
   console.log(headMesss.data);// 正常的数据
   const {logo, applyNum, fansNum, courseNum, onsaleNum, stuNum ,intro, organizeAdress, tags, name, detail, } =headMesss.data;
      console.log(logo);
```

解决方式一步一步解构。

```
 console.log(headMesss.data);
 const {data} = headMesss;
 const {logo, applyNum, fansNum, courseNum, onsaleNum, stuNum ,intro, organizeAdress, tags, name, detail, fileList ,} = data;
      console.log(logo);
```

所以最好不要用属性值的写法，最好一步一步解构。

##### 6、表格问题

1、表格Table中的onChange属性：分页、排序、筛选变化时触发。function函数必须把三个文档中的三个参数都带上，否则会拿不到结果，打印出来的参数为空。

![1548661411837](C:\Users\lp\AppData\Roaming\Typora\typora-user-images\1548661411837.png)

##### 7、表单点击保存出现页面刷新的问题

解决方式：`e.preventDefault();`

##### 8、表单添加的样式不生效的问题

​	原因在<Form.Item>中添加了`layout="inline"`

