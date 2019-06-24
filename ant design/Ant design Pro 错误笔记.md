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

