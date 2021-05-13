/**
 * @module recommend-list
 * @description 推荐列表
 * @property {Array}  list     推荐列表数据，每个条目包含标题title、副标题subtitle、图片资源地址thumb     
 * @fires onTapItem   点击条目分发事件
 */
Component({

  options: {
    addGlobalClass: true,
  },

  properties: {
    list: {
      type: Array,
      value: [],
    },
  },

  data: {

  },

  methods: {

    onTapItem(e) {
      this.triggerEvent("onTapItem", {
        index: e.currentTarget.dataset.index,
      });
    },

  },

})
