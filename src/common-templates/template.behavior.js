/**
 * @module [T]kg-text
 * @description 【模板】文本框
 * @property {string}  label  标签名
 * @property {string}  value  文本值
 * @property {string}  name  字段名称
 * @property {boolean} hiddenUnderLine  是否隐藏底部横线
 * @property {string}  tip              提示内容
 * @property {boolean} tl     是否左对齐，默认为false
 * @property {boolean} redDot 是否显示红点，默认为false，左对齐方式下有效
 * @property {string}  bgCol  设置背景色，常用于置灰，左对齐方式下有效
 * @property {string}  placeholder    提示文字，一般与rightBtnEvtName一起使用，左对齐方式下有效
 * @property {string}  rightBtnEvtName  绑定右箭头图标点击事件名，左对齐方式下有效
 * @property {boolean} disabled     是否禁用，默认为false，左对齐方式下有效
 * @property {boolean} invalid     是否无效，默认为false，左对齐方式下有效    
 */
/**
 * @module [T]kg-input
 * @description 【模板】输入框
 * @property {string}  label  标签名
 * @property {string}  value  输入值
 * @property {string}  name   字段名称
 * @property {boolean} hiddenUnderLine  是否隐藏底部横线
 * @property {string}  placeholder    提示文字
 * @property {string}  type           输入类型，默认为text 
 * @property {number}  maxlength      输入最大长度，默认为-1
 * @property {number}  index          索引标识，与kg-expandable-text、kg-expandable-picker配合使用时有用
 * @property {boolean} redDot         是否显示红点，默认为false
 * @property {boolean} invalid        是否无效，默认为false 
 * @property {boolean} tl             是否左对齐，默认为false
 * @property {boolean} disabled     是否禁用，默认为false，左对齐方式下有效
 * @property {string}  rightBtnEvtName  绑定右箭头图标点击事件名，左对齐方式下有效
 */
/**
 * @module [T]kg-picker
 * @description 【模板】选择器
 * @property {string}  mode   选择器模式，可取值，selector\date\region
 * @property {string}  label  标签名
 * @property {string}  value  值
 * @property {string}  name   字段名称
 * @property {number}  index  索引标识，与kg-expandable-text、kg-expandable-picker配合使用时有用
 * @property {string}  placeholder      提示文字
 * @property {boolean} invalid          是否无效，默认为false 
 * @property {boolean} hiddenUnderLine  是否隐藏底部横线
 * @property {string}  tip              提示内容
 * @property {Array}   range  范围，mode值为selector有效
 * @property {boolean} redDot 是否显示红点，默认为false，mode值为selector有效 或 mode值为region且tl为true有效
 * @property {boolean} tl     是否左对齐，默认为false，mode值为selector有效
 * @property {string}  bgCol  设置背景色，常用于置灰，mode值为selector且左对齐方式下有效
 */
/**
 * @module [T]kg-switch
 * @description 【模板】开关
 * @property {string}  label  标签名
 * @property {string}  name   字段名称
 * @property {number}  index  索引标识，与kg-expandable-text、kg-expandable-picker配合使用时有用
 * @property {boolean} invalid          是否无效，默认为false 
 * @property {boolean} hiddenUnderLine  是否隐藏底部横线
 * @property {string}  checked  选中文本
 * @property {Array}   option   选项文本数组
 * @property {boolean} hiddenInput   隐藏其他填写栏，默认不显示。该项基本很少被外部使用
 * @property {string}  inputValue    填写栏输入值。该项基本很少被外部使用
 * @property {string}  placeholder   填写栏提示文字
 * @property {string}  type          填写栏输入类型，默认为text 
 * @property {number}  maxlength     填写栏输入最大长度，默认为-1
 */
/**
 * @module [T]kg-expandable-text
 * @description 【模板】可展开的文本
 * @property {string}   name     字段名
 * @property {boolean}  isExpand  默认是否展开，默认为false
 * @property {string}   label     标签名
 * @property {string}   value     文本
 * @property {boolean}  invalid   是否无效，默认为false 
 * @property {Array}    items    展开项，结构如[{template:模板名称,...该模板必要参数}] 
 */
/**
 * @module [T]kg-expandable-picker
 * @description 【模板】可展开的选择器
 * @property {string}   name     字段名
 * @property {boolean}  isExpand  默认是否展开，默认为false
 * @property {Object}   picker    选择器参数，具体见kg-picker
 * @property {Array}    items     展开项，结构如[{template:模板名称,...该模板必要参数}] 
 */
/**
 * @module [T]kg-search-input
 * @description 【模板】搜索输入框
 * @property {string}  label  标签名
 * @property {string}  name   字段名称
 * @property {string}  value  输入值
 * @property {string}  placeholder    输入提示文字
 * @property {string}  type           输入类型，默认为text 
 * @property {number}  maxlength      输入最大长度，默认为-1
 * @property {boolean} disabled       是否禁用，默认为false
 * @property {boolean} invalid        是否无效，默认为false 
 * @property {boolean} redDot         是否显示红点，默认为false
 * @property {boolean} hiddenUnderLine  是否隐藏底部横线
 * @property {string} searchListDataGotMethodName  搜索列表数据获取的方法名称
 * @property {string} picEvtName        要显示的图标点击事件名称
 * @property {string} picUrl            要显示的图标地址
 * @property {string} rightBtnEvtName   右箭头点击事件名称
 * @property {number}  index            模板在数据数组中的索引标识
 * @property {string} subField          模板在混合模板数据数组中的子字段名
 */

/*
 * 常用模板内部事件监听。现有模板：
    
    标签文本模板：支持左、右对齐，默认右对齐
    
    标签输入模板：支持左、右对齐模式，默认右对齐（FIXME:支持数组形式模板）
    
    标签选择器模板，又分单项选择器、日期选择器、地区选择器，除日期暂只支持右对齐，其余均支持左、右对齐模式，默认右对齐（FIXME:日期需支持左对齐，且均支持数组形式模板）
    
    标签输入开关模板：只有右对齐模式（FIXME:支持数组形式模板）
    
    支持搜索的标签输入模板：只有左对齐模式（FIXME:支持被可扩展模板嵌套）
    
    标签可扩展文本模板：除搜索的标签输入模板外，支持其他模板嵌套（FIXME:可扩展模板支持互嵌）
    
    标签可扩展选择器模板：除搜索的标签输入模板外，支持其他模板嵌套（FIXME:可扩展模板支持互嵌）

 */

export const template = Behavior({

  methods: {
    //  标签可扩展文本模板 - 展开或收缩
    _toggleTextExpand(e) {

      // console.log('_toggleTextExpand', e);

      // field表示该字段的名称
      const field = e.currentTarget.dataset.field;

      // isExpand表示是否展开，unvalid表示该字段是否无效
      this.setData({
        [field + '.isExpand']: !this.data[field].isExpand,
        [field + '.invalid']: false,
      })
    },

    // 输入聚焦处理
    _onInputFocus(e) {

      // console.log('_onInputFocus', e);

      const {
        currentTarget: {
          dataset: {
            field,
            index = -1,
          }
        },
      } = e;

      // index表示该字段在数据的items数组的索引
      // if (index !== -1) {
      //   this.setData({
      //     [field + '.items[' + index + '].invalid']: false,
      //   });
      // } else {
      //   this.setData({
      //     [field + '.invalid']: false,
      //   });
      // }
      this.setData({
        [`${field}${index > -1 ?`.items[${index}]`:''}.invalid`]: false,
      });

    },

    // 标签选择器模板 - 监听选择变化
    _onPickerChange(e) {

      console.log('_onPickerChange', e);

      const {
        currentTarget: {
          dataset: {
            field,
            index = -1,
            mode,
          }
        },
        detail: {
          value,
        }
      } = e;

      let lastValue;
      switch (mode) {
        case 'selector':
        case 'date':
          if (index !== -1) {
            lastValue = this.data[field].items[index].value;
            lastValue != value && this.setData({
              [field + '.items[' + index + '].invalid']: false,
              [field + '.items[' + index + '].value']: value,
            })
          } else {
            let hasPickerField = !!this.data[field].picker;
            lastValue = hasPickerField ? this.data[field].picker.value : this.data[field].value;
            lastValue != value && this.setData({
              [`${field}${hasPickerField ? '.picker' :''}.invalid`]: false,
              [`${field}${hasPickerField ? '.picker' :''}.value`]: value,
            }, () => {
              if (mode === 'selector') {
                // 对于可扩展的选择器模板 - 需要根据值去判断是否展开，涉及业务抛出处理
                this.togglePickerExpand && this.togglePickerExpand(field, value);
              }
            })
          }
          break;
        case 'region':
          this.setData({
            [`${field}${index > -1 ?`.items[${index}]`:''}.value`]: value,
            [`${field}${index > -1 ?`.items[${index}]`:''}.invalid`]: false,
            [`${field}${index > -1 ?`.items[${index}]`:''}.cancel`]: false,
          })
          break;
        default:
          break;
      }

    },

    // 标签选择器模板 - 监听点击取消，处理地区选择器打开时默认初始化
    _onPickerClose(e) {

      console.log('_onPickerClose', e);

      const {
        currentTarget: {
          dataset: {
            field = '',
            index = -1,
            mode = '',
          }
        },
        detail: {
          value = '',
        }
      } = e;

      // 无值下，标识点击了取消操作
      if (index > -1) {
        if (!this.data[field].items[index].value) {
          this.setData({
            [`${field}.items[${index}].cancel`]: true,
          })
        }
      } else {
        if (!this.data[field].value) {
          this.setData({
            [`${field}.cancel`]: true,
          })
        }
      }

    },

    // 标签输入开关模板 - 监听开关变化
    _onSwitchChange(e) {

      console.log('_onSwitchChange', e);

      const {
        currentTarget: {
          dataset: {
            field,
            index,
          }
        },
        detail: {
          value,
        }
      } = e;

      // hiddenInput表示是否隐藏输入框
      // inputValue表示输入框的值
      // checked表示当前开关选中值
      // this.setData({
      //   [field + '.items[' + index + '].hiddenInput']: value === '',
      //   [field + '.items[' + index + '].inputValue']: '',
      //   [field + '.items[' + index + '].checked']: value,
      // })
      this.setData({
        [`${field}${index > -1 ?`.items[${index}]`:''}.hiddenInput`]: value === '',
        [`${field}${index > -1 ?`.items[${index}]`:''}.inputValue`]: '',
        [`${field}${index > -1 ?`.items[${index}]`:''}.checked`]: value,
      })
    },

    // 支持搜索的标签输入模板内部方法 start
    // 模糊查询
    _fuzzyQuery: debounce(async function(e) {

      console.log('_fuzzyQuery', e);

      let {
        detail: {
          value,
        },
        currentTarget: {
          dataset: {
            index = -1,
            field = '',
            method = '',
          }
        }
      } = e;

      if (value === '') {
        this.setData({
          [`${field}${index > -1?`[${index}]`:''}.queryResult`]: null,
        })
        return;
      }

      // 根据外部传入的方法名去调用获取搜索的数据列表
      let dataList = (await (method && this[method](e))) || [];
      // console.log(dataList);

      // 获取数组中包含指定关键字的元素
      let list = dataList.slice(0, 10);

      let data = {
        [`${field}${index > -1?`[${index}]`:''}.queryResult`]: list,
        [`${field}${index > -1?`[${index}]`:''}.isEmpty`]: list.length == 0,
      };
      if (list.length === 0) {
        data[`${field}${index > -1?`[${index}]`:''}.value`] = value;
      }
      this.setData(data);

    }, 800),

    // 选择搜索列表某个值
    _onSelected(e) {

      console.log('_onSelected', e);

      let {
        selectedidx = '',
          field = '',
          idx = -1,
      } = e.currentTarget.dataset;

      let val = idx > -1 ? this.data[field][idx].queryResult[selectedidx] : this.data[field].queryResult[selectedidx];

      this.setData({
        [`${field}${idx > -1?`[${idx}]`:''}._value`]: val,
        // 解决点击选中的item后会触发blur事件，导致值无法带入问题
        [`${field}${idx > -1?`[${idx}]`:''}._selected`]: true,
        [`${field}${idx > -1?`[${idx}]`:''}.queryResult`]: null,
        [`${field}${idx > -1?`[${idx}]`:''}.hiddenSearchList`]: true,
      }, () => {
        this.onSelectedCallback && this.onSelectedCallback(e);
      })

    },

    // 失焦聚焦处理
    _onFocusOrBlur(e) {

      console.log('_onFocusOrBlur', e);

      let {
        target: {
          dataset: {
            field = '',
            index = -1,
          }
        },
        type,
        detail: {
          value = '',
        }
      } = e;

      let data = {};

      if (index > -1) {
        if (!this.data[field][index]._selected) {
          data[`${field}[${index}].value`] = value;
        }
      } else {
        if (!this.data[field]._selected) {
          data[`${field}.value`] = value;
        }
      }

      if (type === 'focus') {
        data[`${field}${index > -1 ?`[${index}]`: ''}.invalid`] = false;
        data[`${field}${index > -1 ?`[${index}]`: ''}.hiddenSearchList`] = false;
      }

      this.setData(data, () => {
        this.onFocusOrBlurCallback && this.onFocusOrBlurCallback(e);
      });

    },
    // 支持搜索的标签输入模板内部方法 end

    // 新增购方单位事件监听
    toAdd(e) {
      let {
        currentTarget: {
          dataset: {
            field,
            index,
          }
        }
      } = e;
      this.setData({
        [`${field}${index > -1?`[${index}]`:''}.hiddenSearchList`]: true,
      }, () => {
        this.toEditAcquiringCompany && this.toEditAcquiringCompany(e);
      })
    },

  },
})


/*
 * @desc 函数防抖
 * @param func 函数
 * @param time 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
function debounce(func, time, immediate) {
  let timeout;
  time = time || 300;

  return function() {
    let context = this;
    let args = arguments;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      if (callNow) {
        func.apply(context, args);
        timeout = setTimeout(function() {
          timeout = null;
        }, time);
      } else {
        timeout = setTimeout(function() {
          func.apply(context, args);
        }, time);
      }
    } else {
      timeout = setTimeout(function() {
        func.apply(context, args)
      }, time);
    }
  }
}
