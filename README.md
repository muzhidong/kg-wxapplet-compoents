# 公瑾组件库项目

## 项目结构
```
|-- docs                   小程序组件库文档
|-- gulpfile.js            gulp脚本，主要用于自动化配置页面路径
|-- src                    小程序组件库源码
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
- 目前的组件不是都能充分利用，希望开发者能后期维护，抽象成更适合公司业务的组件。
- 复杂表单目前采用模板开发，代码些许引入了业务代码，后期改造为组件方式，借助微信小程序内置的behaviors。
