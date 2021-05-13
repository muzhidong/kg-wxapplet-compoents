// pages/cli/cli.js
Component({

  options: {
    addGlobalClass: true,
  },

  /**
   * 组件的初始数据
   */
  data: {
    cmds: [{
      cmd: 'config',
      desc: '配置模板项目、组件库项目的本地存放路径。使用add、del、up、select命令前必须指定。'
    }, {
      cmd: 'select',
      desc: '选择项目模板或组件，当传入选项-t时，则只操作项目模板，当传入选项-c时，则只操作组件。'
    }, {
      cmd: 'list | ls',
      desc: '显示项目模板或组件列表信息，当传入选项-t时，则只操作项目模板，当传入选项-c时，则只操作组件。'
    }, {
      cmd: 'add',
      desc: '添加项目模板或组件，当传入选项-t时，则只操作项目模板，当传入选项-c时，则只操作组件。'
    }, {
      cmd: 'delete | del',
      desc: '删除某一项目模板或组件，当传入选项-t时，则只操作项目模板，当传入选项-c时，则只操作组件。'
    }, {
      cmd: 'update ｜ up',
      desc: '更新项目模板或组件，当传入选项-t时，则只操作项目模板，当传入选项-c时，则只操作组件。'
    }, ],
    opts: [{
      opt: '--template | -t',
      desc: '表示仅操作项目模板',
    }, {
      opt: '--component | -c',
      desc: '表示仅操作组件',
    }, {
      opt: '--version | -V',
      desc: '查看版本信息',
    }, {
      opt: '--help | -h',
      desc: '显示帮助信息',
    }],
    terminals: [{
      shell: ['# 配置本地模板项目和组件库项目', '$ kg-cli config'],
    }, {
      shell: ['# 查看配置项目', '$ kg-cli config -l'],
    }, {
      shell: ['# 查看config命令帮助信息', '$ kg-cli config -h'],
    }, {
      shell: ['# 查看模板或组件', '$ kg-cli ls'],
    }, {
      shell: ['# 添加组件', '$ kg-cli add -c'],
    }, {
      shell: ['# 选择组件', '$ kg-cli select -c'],
    }, {
      shell: ['# 更新组件', '$ kg-cli update -c'],
    }, {
      shell: ['# 删除组件', '$ kg-cli del -c'],
    }, {
      shell: ['# 添加模板', '$ kg-cli add -t'],
    }, {
      shell: ['# 选择模板', '$ kg-cli select -t'],
    }, {
      shell: ['# 更新模板', '$ kg-cli update -t'],
    }, {
      shell: ['# 删除模板', '$ kg-cli del -t'],
    }, {
      shell: ['# 查看版本信息', '$ kg-cli -V'],
    }],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
