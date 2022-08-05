---
theme: juejin
---

## 前言

授人以渔，不如授人以鱼。

我把最近开发大屏的项目，抽象为一个最简版的demo，放到 github 上。保证拿来即用，可以帮助大家省去一些调研的时间。

半成品demo的github地址如下：

https://github.com/xionglongxiang/data-view-nextjs.git


本文介绍一下大屏常见问题，和解决方法，应对策略等。

## 可视化大屏常见问题

### 1，购买成熟的大屏，还是自研？

主要考虑的因素：

* 工期

一般来说，自研的开发效率肯定慢，购买的大屏，直接套模板，可能更快

* 成本

购买的大屏，公司之前购买的，是一年n万块钱，m个大屏。一年内超过数量，还得额外交钱。所以成本和大屏个数相关。

自己研发的话，那就是开发人员的成本了。


* 效率

购买的话，拖拖拽拽估计至少1-2天一个吧。可以脱离开发人员进行。

如果是自己开发，本人自己评估，框架搭建完以后，2天一个大屏的速度，如果大屏的数据需要调试接口，那么还会增加时间。

* 效果

购买的屏幕，更丰富，很多图标在开源框架找不到的。如果不在乎钱，那么推荐直接购买算了。

自己开发的效果肯定要打折一些。


* 适应性

如果设计稿玩的花样多，那么还是自研可靠点。

购买的大屏，样式偏向于固定。



| 对比 |  工期|成本|效果|适应性|
| --- | --- |--- |--- |--- |
| 自研 |  略慢 | 大概率低|单调| 强|
| 购买 | 快 | 高 | 丰富| 中|

### 2，设计师给的图形怪异，怎么办？

原则上，可以在库里面找到的图，优先用库里面的。如果不能找到十分接近的，先找一个相似的，和设计师沟通后使用。不到迫不得已，不自己开发单独的图。

### 3，如何适配不同屏幕大小？

vh，vw，rem，宽高百分比，媒体查询，scale/zoom等。都是可选方案。

比如，想让div横向铺满屏幕，就用100vw，或者100%。

或者用@media 媒体查询。根据不同屏幕，给容器或者item 设置不同的样式。


但是有没有发现，这些方案最大的问题，就是每个item可能要定不同的宽度or高度。这样工作量直接翻倍。

调研发现有些成熟大屏商，是将整个大屏内容，等比例的适应到屏幕展示区的。效果如下：

* 宽屏幕效果（左右黑色是屏幕空余区）


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/080638dc058c4ca9964e61ffc6fcc6e9~tplv-k3u1fbpfcp-watermark.image?)

* 窄屏幕效果（上下黑色是屏幕空余区）


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f32762dbec97446e80b5c74b08643c33~tplv-k3u1fbpfcp-watermark.image?)

如此一来，我们只需要专心按照设计稿给定的尺寸开发就行，无需rem，无需vh等等。我们把这个容器整体缩放到屏幕上即可。

### 4，推荐使用的开源库

* echarts 由百度开始维护，后来给apache基金会了。使用非常广泛的库。
* highcharts 3d饼图，我用的是这里的。在echarts里找不到的，可以到这里找找。
* 其他 antv的，引入后，在本地跑可以，发到服务器出现了未知bug。导致图像无法展示，所以放弃使用了。


### 5，是否用服务端渲染框架？

我使用了nextjs 作为基础项目，服务端渲染的优点，他都有。


## 简版demo简介

具体代码，看文末的github项目吧。

### 整体适配方案。



#### 1，flex布局，实现上下左右居中

关键代码展示：

* body

html,body {
  height: 100%;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}


#__next {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

主要是通过 body 的 flex布局，把 __next 容器做成水平垂直居中。

#### 2，通过resize，缩放容器的尺寸，刚好不溢出屏幕。

在文件 utils/useFixScreenSize.js

```
import { useEffect } from 'react'

export function useFixScreenSize () {
  return useEffect(() => {
    refresh()
    function refresh () {
      const wh = window.innerHeight
      const ww = window.innerWidth

      const designHeight = 1443
      const designWidth = 2561

      console.log(ww, wh)
      console.log(designWidth, designHeight)
      console.log(ww / designWidth, wh / designHeight)

      const scaleH = wh / designHeight
      const scaleW = ww / designWidth

      const scale = Math.min(scaleH, scaleW).toFixed(6)

      console.log('scale', scale)
      document.getElementById('__next').style.transform = `scale(${scale})`
      document.getElementById('__next').style.transformOrigin = `50% center`
    }
    window.addEventListener('resize', refresh)
    return () => {
      window.removeEventListener('resize', refresh)
    }
  }, [])
}

```

### demo 大屏

在pages文件夹下，有一个demo文件夹，这个文件夹里，做了以下事情：

* 配置了上下左右的div结构 ，间距等，在config.scss文件里配置了一些样式属性。


* 引用了useFixScreenSize.js 来适应屏幕。


复制demo文件夹，即可新建一块大屏。

### components 

里面写了2个样例

1个echarts引入和使用方式。


1个highcharts图的引入和使用方式。

## nextjs 

在nextjs 中 pages下每一个js文件都会编译成一个html文件。

对nextjs不熟悉的同学可以去官网看看，学习一下。

https://www.nextjs.cn/

## echarts 

要进行可视化大屏的开发，这个必须要熟悉。主要就是chart的配置文件。

1 图例

2 轴线

3 标签

等特别多细节，去看官方配置文档即可：

https://echarts.apache.org/zh/option.html


## 项目待改进


很抱歉，各位，最近加班特别多，细节来不及休整了。项目还有些细节问题：


* 没有配置 文件路径对应的 alias

* 引入的echarts和highcharts，使用的是id来寻找div。如果重复id，多个图干扰。建议使用useRef 来定位chart容器。

*  其他未发现的问题


尽管时间很仓库，但是特别想记录一下大屏的一些工作。但是细节来不及改了，后续有时间我再修改。

如果有小伙伴能愿意帮忙改进的更好。大家一起学习。

## 可用网址链接汇总

觉得对有用的小伙伴，麻烦点个收藏和点赞。一起相互学习。



本文demo：顺便在线乞讨一下github的star (- _ -)
https://github.com/xionglongxiang/data-view-nextjs.git

echarts配置项文档：
https://echarts.apache.org/zh/option.html

echarts常见图的案例：
https://echarts.apache.org/examples/zh/index.html

echarts 社区的 更多案例：（我之前还不知道，同学发给我的）
https://www.makeapie.cn/echarts

highcharts：
https://www.highcharts.com.cn/

蚂蚁的：
https://charts.ant.design/en/examples/gallery


