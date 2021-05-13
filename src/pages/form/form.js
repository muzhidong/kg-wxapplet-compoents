/*
 * @Author: Liu Xiaodong
 * @Date: 2021-04-07 23:29:10
 * @LastEditTime: 2021-04-16 17:38:41
 * @Description: file content
 */
// pages/form/form.js
import {
  template,
} from "../../module";

Component({

  behaviors: [template],

  /**
   * 组件的初始数据
   */
  data: {
    data1: {
      name: 'data1',
      label: '姓名',
      value: '小慧客服'
    },
    data2: {
      name: 'data2',
      label: '姓名',
      value: '小慧客服',
      tip: '请记住我的名字哦',
    },
    data3: {
      name: 'data3',
      label: '姓名',
      value: '小慧客服',
      tl: true,
      redDot: true,
      invalid: true,
    },
    data4: {
      name: 'data4',
      label: '姓名',
      value: '小慧客服',
      tl: true,
    },
    data5: {
      name: 'data5',
      label: '姓名',
      value: '小慧客服',
      tl: true,
      tip: '请记住我的名字哦',
    },
    data6: {
      name: 'data6',
      label: '姓名',
      value: '小慧客服',
      tl: true,
      bgCol: '#999999'
    },
    data7: {
      name: 'data7',
      label: '姓名',
      placeholder: '请输入姓名',
    },
    data8: {
      name: 'data8',
      label: '姓名',
      placeholder: '请输入姓名',
      redDot: true,
    },
    data9: {
      name: 'data9',
      label: '姓名',
      placeholder: '请输入姓名',
      value: '666',
      redDot: true,
      invalid: true,
    },
    data10: {
      name: 'data10',
      label: '电话',
      tl: true,
      placeholder: "请输入手机号码",
      type: 'number',
      maxlength: '13',
    },
    data11: {
      name: 'data11',
      label: '职位',
      tl: true,
      type: 'text',
      placeholder: "请填写职位",
      rightBtnEvtName: 'onTodo',
    },
    data12: {
      name: 'data12',
      mode: 'selector',
      label: '是否缴纳五险一金',
      range: ['是', '否'],
      placeholder: '请选择',
    },
    data13: {
      name: 'data13',
      mode: 'selector',
      label: '是否缴纳五险一金',
      range: ['是', '否'],
      placeholder: '请选择',
      redDot: true,
    },
    data14: {
      name: 'data14',
      mode: 'selector',
      label: '是否缴纳五险一金',
      range: ['是', '否'],
      placeholder: '请选择',
      redDot: true,
      invalid: true,
    },
    data15: {
      name: 'data15',
      mode: 'selector',
      label: '是否缴纳五险一金',
      placeholder: '请选择',
      range: ['是', '否'],
      tl: true,
    },
    data16: {
      name: 'data16',
      mode: 'selector',
      label: '是否续期',
      range: ['是', '否'],
      tl: true,
      redDot: true,
      placeholder: '请选择',
    },
    data17: {
      name: 'data17',
      mode: 'selector',
      label: '是否续期',
      placeholder: '请选择',
      range: ['是', '否'],
      tl: true,
      redDot: true,
      invalid: true,
    },
    data18: {
      name: 'data18',
      mode: 'selector',
      label: '是否续期',
      range: ['是', '否'],
      placeholder: '请选择',
      tl: true,
      bgCol: '#999999',
    },
    data19: {
      name: 'data19',
      mode: 'date',
      label: '入职日期',
      placeholder: '请选择日期',
      fields: 'day'
    },
    data20: {
      name: 'data20',
      mode: 'date',
      label: '入职日期',
      placeholder: '请选择日期',
      value: '2021-01-01',
      fields: 'day',
      invalid: true,
    },
    data21: {
      name: 'data21',
      mode: 'region',
      label: '所属地',
      placeholder: '请选择',
    },
    data22: {
      name: 'data22',
      mode: 'region',
      label: '所属地',
      placeholder: '请选择',
      invalid: true,
      value: ['广东省', '广州市', '天河区'],
    },
    data23: {
      name: 'data23',
      mode: 'region',
      tl: true,
      label: '所属地',
      placeholder: '请选择',
    },
    data24: {
      name: 'data24',
      mode: 'region',
      tl: true,
      label: '所属地',
      placeholder: '请选择',
      invalid: true,
      value: ['广东省', '广州市', '天河区'],
    },
    data25: {
      name: 'data25',
      mode: 'region',
      tl: true,
      label: '所属地',
      placeholder: '请选择',
      redDot: true,
      value: ['广东省', '广州市', '天河区'],
      tip: '这是提示',
    },
    data26: {
      name: 'data26',
      label: '缴纳基数',
      option: ['最低', '其他', ],
      placeholder: '请选择',
      type: 'number',
      checked: '最低',
    },
    data27: {
      name: 'data27',
      label: '缴纳基数',
      option: ['最低', '其他', ],
      placeholder: '请选择',
      type: 'number',
      checked: '最低',
      invalid: true,
    },
    data28: {
      name: 'data28',
      label: '商品名称',
      placeholder: '请输入商品名称',
      redDot: true,
      searchListDataGotMethodName: '_getMchList',
    },
    data29: {
      name: 'data29',
      label: '商品名称',
      placeholder: '请输入商品名称',
      searchListDataGotMethodName: '_getMchList',
      picEvtName: 'onTodo',
      picUrl: '',
      rightBtnEvtName: 'onTodo',
      redDot: true,
      invalid: true,
    },
    data30: {
      name: 'data30',
      isExpand: true,
      label: '个人简介',
      value: '',
      items: [{
        template: 'kg-text',
        name: 'data30',
        label: '姓名',
        value: '小慧',
        tl: true,
        showTip: true,
        tip: '请记住我的名字哦',
      }, {
        template: 'kg-input',
        name: 'data30',
        label: '电话',
        placeholder: "请输入手机号码",
        type: 'number',
        maxlength: '13',
      }, {
        template: 'kg-picker',
        name: 'data30',
        mode: 'date',
        label: '入职日期',
        placeholder: '请选择日期',
        fields: 'day'
      }, {
        template: 'kg-switch',
        name: 'data30',
        label: '缴纳基数',
        option: ['最低', '其他', ],
        placeholder: '请选择',
        type: 'number',
        checked: '最低',
      }],
    },
    data31: {
      name: 'data31',
      isExpand: false,
      picker: {
        name: 'data31',
        mode: 'selector',
        label: '内部员工',
        value: 0,
        range: ['否', '是'],
      },
      items: [{
        template: 'kg-text',
        name: 'data31',
        label: '姓名',
        value: '小慧',
        tl: true,
        showTip: true,
        tip: '请记住我的名字哦',
      }, {
        template: 'kg-input',
        name: 'data31',
        label: '电话',
        placeholder: "请输入手机号码",
        type: 'number',
        maxlength: '13',
      }, {
        template: 'kg-picker',
        name: 'data31',
        mode: 'date',
        label: '入职日期',
        placeholder: '请选择日期',
        fields: 'day'
      }, {
        template: 'kg-switch',
        name: 'data31',
        label: '缴纳基数',
        option: ['最低', '其他', ],
        placeholder: '请选择',
        type: 'number',
        checked: '最低',
      }],
    },

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onLoad(options) {
      let kind = options.kind;
      this.setData({
        kind,
      })
    },

    onTodo() {
      wx.showToast({
        title: '点了我一下',
        icon: 'none',
      });
    },

    togglePickerExpand(field, value) {
      console.log(field, value);
      this.setData({
        [`${field}.isExpand`]: value == 1,
      })
    },

    _getMchList() {
      return ['可乐', '雪碧', '橙汁'];
    },

    onSelectedCallback(e) {
      let {
        selectedidx = '',
          field = '',
          idx = -1,
      } = e.currentTarget.dataset;
      this.setData({
        [`${field}.value`]: (this._getMchList())[selectedidx],
      })
    }
  }
})
