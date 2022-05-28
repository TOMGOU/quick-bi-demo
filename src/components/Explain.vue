<template>
<div class="explain">
  <div class="explain-title">{{ title }}</div>
  <ul class="explain-list">
    <li v-for="(item, index) in list" :key="index">{{item}}</li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return [];
      },
    },
    title: {
      type: String,
      default: '说明:',
    },
  },
};
</script>

<style lang="less">
.explain {
  box-sizing: content-box;
  margin-bottom: 20px;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 25px;
  color: #999;
  line-height: 24px;
  background: #ebf8ff;
  border: solid 1px #a7d7f1;
  div {
    line-height: 28px;
  }
}
</style>
