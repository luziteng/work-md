# react笔记

[定时器详解](https://blog.csdn.net/yunzhonmghe/article/details/77833404)

### 1、react中使用定时器：

页面初始化使用定时器：在componentDidMount方法中设置定时执行的方法。

销毁定时器：在componentWillUnmount方法中要对定时器进行销毁

使用定时器需要注意的两个问题：1传参，2this指向问题

！**这里遇到一个小问题**

在componentDidMount中以下写法可正常执行

`this.timer =  setInterval(()=>{this.getUpdata(1,1)}, 30000);`

在其他函数中参照以上写法，函数却无法执行，最后只能用一层函数再进行嵌套

 `this.timeTabs = setInterval(this.getUpdataTabs, 30000);`

```
getUpdataTabs =()=>{
  const {tabsKey} = this.state;
  this.getUpdata(tabsKey,1);
}
```

**使用延时函数**

```
  handleSearch = (value) => {
    let timeout;
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
    const {dispatch} = this.props;
    function fake() {
      dispatch({
        type:'organization/fuzzysearch',
        payload: {
          searchName:value,
          size:20, 
        },
     })
    }
 timeout = setTimeout(fake, 500);
}
```

