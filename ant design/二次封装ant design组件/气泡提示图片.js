import React from 'react';
import { Popover } from 'antd';

export default function TooltipImg(props) {
  const {
    placement,// 气泡框位置
    trigger,// 触发方式
    url,// 图片路径
    mouseEnterDelay,// 鼠标移入后延时多少才显示 Tooltip，单位：秒number
    mouseLeaveDelay,// 鼠标移出后延时多少才隐藏 Tooltip，单位：秒
    contentImgStyle, // 气泡中图片样式
    imgStyle, //  内容样式
  }= props;

  return(
    <Popover
      mouseEnterDelay={mouseEnterDelay}
      mouseLeaveDelay={mouseLeaveDelay}
      placement={placement}
      trigger={trigger}
      content={<img style={contentImgStyle} alt="" src={url} />}
    >
      <img style={imgStyle} src={url} alt="" />
    </Popover>
  )
}
