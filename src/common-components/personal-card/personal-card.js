/**
 * @module personal-card
 * @description 个人名片组件
 * @property {Object}  data          名片信息， 包括名称name、是否官方isOfficial、职位posName、联系电话phone、标签数组label、公司名称company、头像avatar、是否能修改头像canEditAvatar
 * @property {boolean} hiddenComp    是否隐藏公司信息，默认为false    
 * @param {slot} dialBtn 提供电话按钮插槽
 * @param {slot} labelBtn 提供标签组插槽
 * @param {slot} bottomBox 提供底部区域插槽
 * @fires onTapAvatar  点击头像分发事件
 */

Component({

  options: {
    addGlobalClass: true,
    multipleSlots: true,
  },

  properties: {
    data: {
      type: {
        name: String, // 名称
        isOfficial: Boolean, // 是否官方
        posName: String, // 职位
        phone: String, // 联系电话
        label: Array, // 标签code
        company: String, // 公司名称
        avatar: String, //头像地址
        canEditAvatar: Boolean, // 是否能修改头像
      },
      value: {}
    },
    // 是否隐藏公司信息
    hiddenComp: {
      type: Boolean,
      value: false
    },
  },

  data: {},

  methods: {

    avatarTap() {
      this.triggerEvent('onTapAvatar', this.data.data);
    },
  }

});
