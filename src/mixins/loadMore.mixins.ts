import Vue from 'vue';
import { Component } from 'vue-property-decorator';

@Component({
  directives: {
    'load-more': {
      bind: (el, binding) => {
        // 如滚动区域是绑定指令的元素内部的元素，可通过给指令传递参数（参数为滚动区域元素的 class）指定滚动区域元素
        // 默认滚动区域为绑定指令的元素
        const selectWrap = binding.arg ? el.querySelector(`.${binding.arg}`) : el;
        (selectWrap as any).addEventListener('scroll', function () {
          if (Math.floor(this.scrollHeight - this.scrollTop) <= this.clientHeight) {
            binding.value();
          }
        });
      },
    },
  },
})
export default class LoadMoreMixin extends Vue {}
