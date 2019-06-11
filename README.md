# xy-manual-tools

组件库的 demo 管理工具

## 安装

> `yarn add --dev xy-manual-tools`

## 使用配置

为了按需加载， 需要修改`package.json`里增加`sideEffects`字段:

```json
{
    "sideEffects": ["*.css", "*.scss"]
}
```

以`xy-button`为例子(实际根据自己组件修改), 修改`tsconfig.json`的`paths`字段:

```json
{
    "paths": {
        "xy-button": ["src/index.tsx"],
        "xy-button/*": ["src/*"]
    }
}
```

修改`README.md`, 确保有`## API` 表格(表格根据自己的 API 修改)这一段:

```markdown
| 属性 | 说明     | 类型    | 默认值 |
| ---- | -------- | ------- | ------ |
| show | 是否显示 | boolean | true   |
```

创建配置文件`xy-manual-tools.json`在根目录:

> 其中`name`字段需要与`examples`文件夹内的例子文件名对应, 才能找到 demo 文件

```json
[
    {
        "name": "Simple",
        "title": "顶部固定",
        "desc": "当窗口滚动过元素时， 将会启动固定。"
    }
]
```

## 开发

参数`-s`启用打包独立页面, 每个例子都单独会有一个 html

> `xy-manual-tools start -p 6006`

## 编译

参数`-s`启用打包独立页面, 每个例子都单独会有一个 html

> `xy-manual-tools build`
