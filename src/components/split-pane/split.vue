<template>
  <div ref="outerWrapper" :class="wrapperClasses">
    <div v-if="isHorizontal" :class="`${prefix}-horizontal`">
      <div
        :style="{ right: `${anotherOffset}%` }"
        :class="[`${prefix}-pane`, 'left-pane']"
      >
        <slot name="left" />
      </div>
      <div
        :class="`${prefix}-trigger-con`"
        :style="{ left: `${offset}%` }"
        @mousedown="handleMousedown"
      >
        <slot name="trigger">
          <trigger mode="vertical" />
        </slot>
      </div>
      <div
        :style="{ left: `${offset}%` }"
        :class="[`${prefix}-pane`, 'right-pane']"
      >
        <slot name="right" />
      </div>
    </div>
    <div v-else :class="`${prefix}-vertical`">
      <div
        :style="{ bottom: `${anotherOffset}%` }"
        :class="[`${prefix}-pane`, 'top-pane']"
      >
        <slot name="top" />
      </div>
      <div
        :class="`${prefix}-trigger-con`"
        :style="{ top: `${offset}%` }"
        @mousedown="handleMousedown"
      >
        <slot name="trigger">
          <trigger mode="horizontal" />
        </slot>
      </div>
      <div
        :style="{ top: `${offset}%` }"
        :class="[`${prefix}-pane`, 'bottom-pane']"
      >
        <slot name="bottom" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import { oneOf, on, off } from "@/libs/tools";
import Trigger from "./trigger.vue";

@Component({
  components: {
    Trigger
  }
})
export default class SplitPane extends Vue {
  @Prop({ default: 0.5 }) readonly value!: number | string;
  @Prop({
    validator(value) {
      return oneOf(value, ["horizontal", "vertical"]);
    },
    default: "horizontal"
  })
  readonly mode!: string;

  @Prop({ default: "40px" }) readonly min!: number | string;
  @Prop({ default: "40px" }) readonly max!: number | string;

  /**
   * Events
   * @on-move-start
   * @on-moving 返回值：事件对象，但是在事件对象中加入了两个参数：atMin(当前是否在最小值处), atMax(当前是否在最大值处)
   * @on-move-end
   */
  initOffset: number = 0;
  //data
  prefix = "ivu-split";
  offset: number = 0;
  oldOffset: number = 0;
  isMoving = false;

  get wrapperClasses() {
    return [`${this.prefix}-wrapper`, this.isMoving ? "no-select" : ""];
  }

  get isHorizontal() {
    return this.mode === "horizontal";
  }

  get anotherOffset() {
    return 100 - this.offset;
  }

  get valueIsPx() {
    return typeof this.value === "string";
  }

  get offsetSize() {
    return this.isHorizontal ? "offsetWidth" : "offsetHeight";
  }

  get computedMin() {
    return this.getComputedThresholdValue("min");
  }

  get computedMax() {
    return this.getComputedThresholdValue("max");
  }

  px2percent(numerator, denominator) {
    return parseFloat(numerator) / parseFloat(denominator);
  }

  getComputedThresholdValue(type) {
    let size = this.$refs.outerWrapper[this.offsetSize];
    if (this.valueIsPx)
      return typeof this[type] === "string" ? this[type] : size * this[type];
    else
      return typeof this[type] === "string"
        ? this.px2percent(this[type], size)
        : this[type];
  }

  getMin(value1, value2) {
    if (this.valueIsPx)
      return `${Math.min(parseFloat(value1), parseFloat(value2))}px`;
    else return Math.min(value1, value2);
  }

  getMax(value1, value2) {
    if (this.valueIsPx)
      return `${Math.max(parseFloat(value1), parseFloat(value2))}px`;
    else return Math.max(value1, value2);
  }

  getAnotherOffset(value) {
    let res: number | string = 0;
    if (this.valueIsPx)
      res = `${this.$refs.outerWrapper[this.offsetSize] - parseFloat(value)}px`;
    else res = 1 - value;
    return res;
  }

  handleMove(e) {
    let pageOffset = this.isHorizontal ? e.pageX : e.pageY;
    let offset = pageOffset - this.initOffset;
    let outerWidth = this.$refs.outerWrapper[this.offsetSize];
    let value = this.valueIsPx
      ? `${parseFloat(this.oldOffset.toString()) + offset}px`
      : this.px2percent(outerWidth * this.oldOffset + offset, outerWidth);
    let anotherValue = this.getAnotherOffset(value);
    if (parseFloat(value.toString()) <= parseFloat(this.computedMin))
      value = this.getMax(value, this.computedMin);
    if (parseFloat(anotherValue.toString()) <= parseFloat(this.computedMax))
      value = this.getAnotherOffset(
        this.getMax(anotherValue, this.computedMax)
      );
    e.atMin = this.value === this.computedMin;
    e.atMax = this.valueIsPx
      ? this.getAnotherOffset(this.value) === this.computedMax
      : (this.getAnotherOffset(this.value) as number).toFixed(5) ===
        this.computedMax.toFixed(5);
    this.$emit("input", value);
    this.$emit("on-moving", e);
  }

  handleUp() {
    this.isMoving = false;
    off(document, "mousemove", this.handleMove);
    off(document, "mouseup", this.handleUp);
    this.$emit("on-move-end");
  }

  handleMousedown(e) {
    this.initOffset = this.isHorizontal ? e.pageX : e.pageY;
    this.oldOffset = parseFloat(this.value.toString());
    this.isMoving = true;
    on(document, "mousemove", this.handleMove);
    on(document, "mouseup", this.handleUp);
    this.$emit("on-move-start");
  }

  @Watch("value")
  valueChanged() {
    let offset;
    if (this.valueIsPx) {
      offset = this.px2percent(
        this.value,
        this.$refs.outerWrapper[this.offsetSize]
      );
    } else {
      offset = this.value;
    }
    this.offset = (offset * 10000) / 100;
  }

  mounted() {
    this.$nextTick(() => {
      let offset;
      if (this.valueIsPx) {
        offset = this.px2percent(
          this.value,
          this.$refs.outerWrapper[this.offsetSize]
        );
      } else {
        offset = this.value;
      }
      this.offset = (offset * 10000) / 100;
    });
  }
}
</script>

<style lang="less">
@import "./index.less";
</style>
