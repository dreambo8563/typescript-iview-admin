<template>
  <div :class="classes">
    <div :class="barConClasses">
      <i
        :class="`${prefix}-bar`"
        v-once
        v-for="i in 8"
        :key="`trigger-${i}`"
      ></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Trigger extends Vue {
  @Prop(String) readonly mode!: string | undefined;

  name = "Trigger";

  //data
  prefix = "ivu-split-trigger";
  initOffset = 0;

  get isVertical() {
    return this.mode === "vertical";
  }

  get classes() {
    return [
      this.prefix,
      this.isVertical ? `${this.prefix}-vertical` : `${this.prefix}-horizontal`
    ];
  }

  get barConClasses() {
    return [
      `${this.prefix}-bar-con`,
      this.isVertical ? "vertical" : "horizontal"
    ];
  }
}
</script>

<style lang="less">
@import "./index.less";
</style>
