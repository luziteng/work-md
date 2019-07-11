# Ant Design Pro@4.0版本

[Ant Design Pro@4.0版本简介](<https://segmentfault.com/a/1190000019349094?utm_source=tag-newest>)

# 遇到的问题

### 1、git提交代码上传失败，报css语法错误

原因：ant design Pro4.0版本可能引入了[CSS代码检查工具stylelint](https://www.cnblogs.com/xiaohuochai/p/9078154.html)

解决方式：一开始想卸载stylelint安装包，可是卸载之后任然不能上传；最后在相应的css文件添加注释代码`*/\* stylelint-disable \*/*`这个方式只是片段的禁用规则。具体有效的方式暂未知晓。

[stylelint简介](<https://blog.csdn.net/weixin_33951761/article/details/88022518>)

