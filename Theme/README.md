# 多主题

通过新加入css替换旧样式的方式来实现多主题

>theme.js是源码<br>theme.min.js是压缩后的文件，线上使用这个<br>
>[theme v1.0](https://1711680493.github.io) change in 2023-05-10

<br>

## 基本流程

1. 设置主题名称列表
2. 增加主题文件的css路径
3. 初始化主题

<br>

## 规则

css主题文件名以 `文件名-主题名.css` 命名，例如 `main-yejian.css`

<br>

## API

### theme.list

属性，代表当前主题名称列表，例如

```javascript
theme.list = ["theme1", "theme2"];
```

<br>

### theme.addPath(path)

增加主题文件的css路径

例如有主题名称 `yejian`，主题的css文件为 /css/main-yejian.css

那么，此函数使用方法如下

```javascript
theme.addPath("/css/main");
// 多个可以使用数组的方式
theme.addPath(["/css/main"]);
```

<br>

### theme.init(tName)

初始化当前主题（如果有）

此函数应在 `addPath` 和设置 `list` 后调用，且应直接编写至 `script` 最开始，以实现初始化主题的效果

其中 `tName` 参数可选，代表主题名称

* 如果指定，则以主题名称来进行初始化
* 不指定，则以最后一次切换主题的名称来初始化

<br>

**注：此函数只应用来第一次初始化，切换主题应使用 switchT**

<br>

### theme.switchT(tName)

切换主题，其中 `tName` 参数可选

* 如果指定，则以指定主题名称来切换，此主题名需要存在于 `theme.list` 中
* 不指定，则切换到 `theme.list` 的下一个主题，最后一个主题的下一个主题是第一个

<br>

<br>
