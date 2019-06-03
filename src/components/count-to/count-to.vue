<template>
  <div class="count-to-wrapper">
    <slot name="left" />
    <p class="content-outer">
      <span :class="['count-to-count-text', countClass]" :id="counterId">
        {{ init }}
      </span>
      <i :class="['count-to-unit-text', unitClass]">{{ unitText }}</i>
    </p>
    <slot name="right" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

import CountUp from "countup";

@Component
export default class CountTo extends Vue {
  @Prop({ default: 0 }) readonly init!: number;
  @Prop({ default: 0 }) readonly startVal!: number; //起始值，即动画开始前显示的数值
  @Prop({ default: 0 }) readonly end!: number; // 结束值，即动画结束后显示的数值
  @Prop({ default: 0 }) readonly decimals!: number; // 保留几位小数
  @Prop({ default: "" }) readonly decimal!: string; // 分隔整数和小数的符号，默认是小数点
  @Prop({ default: 2 }) readonly duration!: number; // 动画持续的时间，单位是秒
  @Prop({ default: 2 }) readonly delay!: number; // 动画延迟开始的时间，单位是秒
  @Prop({ default: false }) readonly uneasing!: boolean; // 是否禁用easing动画效果
  @Prop({ default: false }) readonly useGroup!: boolean; // 是否使用分组，分组后每三位会用一个符号分隔
  @Prop({ default: "," }) readonly separator!: string; // 用于分组(usegroup)的符号
  @Prop({ default: false }) readonly simplify!: boolean; // 是否简化显示，设为true后会使用unit单位来做相关省略
  @Prop({ default: () => [[3, "K+"], [6, "M+"], [9, "B+"]] })
  readonly unit!: Array<[number, string]>; //自定义单位，如[3, 'K+'], [6, 'M+']即大于3位数小于6位数的用k+来做省略1000即显示为1K+
  @Prop({ default: "," }) readonly countClass!: string;
  @Prop({ default: "," }) readonly unitClass!: string;

  name = "CountTo";

  //data
  counter: any = null;
  unitText = "";
  _uid;

  get counterId() {
    return `count_to_${this._uid}`;
  }

  getHandleVal(val, len) {
    return {
      endVal: parseInt((val / Math.pow(10, this.unit[len - 1][0])).toString()),
      unitText: this.unit[len - 1][1]
    };
  }

  transformValue(val) {
    let len = this.unit.length;
    let res = {
      endVal: 0,
      unitText: ""
    };
    if (val < Math.pow(10, this.unit[0][0])) res.endVal = val;
    else {
      for (let i = 1; i < len; i++) {
        if (
          val >= Math.pow(10, this.unit[i - 1][0]) &&
          val < Math.pow(10, this.unit[i][0])
        )
          res = this.getHandleVal(val, i);
      }
    }
    if (val > Math.pow(10, this.unit[len - 1][0]))
      res = this.getHandleVal(val, len);
    return res;
  }

  getValue(val) {
    let res = 0;
    if (this.simplify) {
      let { endVal, unitText } = this.transformValue(val);
      this.unitText = unitText;
      res = endVal;
    } else {
      res = val;
    }
    return res;
  }

  @Watch("end")
  endChanged(newVal) {
    let endVal = this.getValue(newVal);
    this.counter.update(endVal);
  }

  mounted() {
    this.$nextTick(() => {
      let endVal = this.getValue(this.end);
      this.counter = new CountUp(
        this.counterId,
        this.startVal,
        endVal,
        this.decimals,
        this.duration,
        {
          useEasing: !this.uneasing,
          useGrouping: this.useGroup,
          separator: this.separator,
          decimal: this.decimal
        }
      );
      setTimeout(() => {
        if (!this.counter.error) this.counter.start();
      }, this.delay);
    });
  }
}
</script>
<style lang="less">
@import "./index.less";
</style>
