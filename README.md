# 组件库项目

## 项目结构
```
|-- docs                   小程序组件文档
|-- gulpfile.js            gulp脚本，主要用于自动化配置页面路径
|-- src                    小程序组件源码
|-- .editorconfig          编辑器配置
|-- jsdoc.config.json      jsdoc配置
|-- package.json           包配置
|-- README.md              README
```

> 注：一些组件依赖全局样式。

## 命令
```bash
# 每当有新的页面时，执行该脚本，会自动配置到app.json和constant/PATH.js，支持分包
npm run generatePath
# 自动生成文档
npm run docs
# 运行文档网站
npm run start
```

## 后续维护
- 项目结构待优化，源码与示例分离。
- 当前组件尚不通用，需进一步优化。
- 复杂表单采用模板开发，部分代码会植入业务代码，后续优化。改造为组件方式，并借助微信小程序behaviors。
