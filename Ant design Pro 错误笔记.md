# Ant design Pro 错误笔记

##### 1、警告Warning: ``defaultValue is invalid for getFieldDecorator will set value, please use option.initialValue instead.`

原因：`getFieldDecorator`、`Select`、`Input`等组件中设置`defaultValue`；

解决：可以把`defaultValue`删掉或者改为`initialValue`

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
  const isPicture = file.type === 'image/jpeg' || 'image/png';
 // const isPNG = file.type === 'image/png';
  if (!isPicture) {
    message.error('图片格式只能为 JPG 或 PNG!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片大小不能超过 2MB!');
  }
  
  return isPicture && isLt2M ;
}


```

