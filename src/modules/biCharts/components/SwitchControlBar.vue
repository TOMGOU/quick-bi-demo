<template>
  <div class="control-bar">
    <div class="control-bar__icon-box">
      <i class="lx-icon-arrow-left" @click="handleChangeSession(false)"></i>
    </div>
    <div class="control-bar__session-name">{{ title }}</div>
    <div class="control-bar__icon-box">
      <i class="lx-icon-arrow-right" @click="handleChangeSession(true)"></i>
    </div>
    <div class="control-bar__button" @click="handleTriggerAuto">
      <i v-if="!bool" class="lx-icon-ic_play control-bar__button--icon"></i>
      <i v-if="bool" class="lx-icon-ic_suspend control-bar__button--icon"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SwitchControlBar extends Vue {
  @Prop({default: '河南专场'}) readonly title: string
  @Prop({default: true}) readonly bool: boolean

  handleChangeSession(bool) {
    this.$emit('handleChangeSession', bool);
  }

  handleTriggerAuto() {
    this.$emit('handleTriggerAuto');
  }
}
</script>

<style lang="less">
.control-bar {
  z-index: 1;
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 150px;
  height: 24px;
  line-height: 24px;
  margin-top: 20px;
  background-color: #0a1934;
  border: solid 1px #0cf9ff;
  color: #fff;

  .lx-icon-arrow-left, .lx-icon-arrow-right {
    font-size: 12px;
    width: 20px;
    height: 24px;
    line-height: 20px;
    text-align: center;
    cursor: pointer;
  }

  &__store-name {
    max-width: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
  }

  &__session-name {
    box-shadow: inset 0px 0px 10px 0px rgba(12, 249, 255, 0.8);
    border-right: solid 1px #0cf9ff;
    border-left: solid 1px #0cf9ff;
    flex: 1;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__icon-box {
    width: 22px;
    height: 22px;
    box-shadow: inset 0px 0px 10px 0px rgba(12, 249, 255, 0.8);
  }

  &__button {
    position: absolute;
    top: -1px;
    right: -30px;
    width: 24px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    border: solid 1px #0cf9ff;
    background-color: #0a1934;
    box-shadow: inset 0px 0px 10px 0px rgba(12, 249, 255, 0.8);
    cursor: pointer;

    &--icon {
      font-size: 14px;
      vertical-align: middle;
      margin-top: -4px;
    }
  }
}
</style>
