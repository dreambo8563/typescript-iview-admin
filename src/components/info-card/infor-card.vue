<template>
  <Card :shadow="shadow" class="info-card-wrapper" :padding="0">
    <div class="content-con">
      <div class="left-area" :style="{ background: color, width: leftWidth }">
        <common-icon class="icon" :type="icon" :size="iconSize" color="#fff" />
      </div>
      <div class="right-area" :style="{ width: rightWidth }">
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import CommonIcon from "_c/common-icon";

@Component({
  components: {
    CommonIcon
  }
})
export default class InforCard extends Vue {
  @Prop({ default: 36 }) readonly left!: number;
  @Prop({ default: "#2d8cf0" }) readonly color!: string;
  @Prop({ default: "" }) readonly icon!: string;
  @Prop({ default: 20 }) readonly iconSize!: number;
  @Prop({ default: false }) readonly shadow!: boolean;

  get leftWidth() {
    return `${this.left}%`;
  }

  get rightWidth() {
    return `${100 - this.left}%`;
  }
}
</script>

<style lang="less">
.common {
  float: left;
  height: 100%;
  display: table;
  text-align: center;
}
.size {
  width: 100%;
  height: 100%;
}
.middle-center {
  display: table-cell;
  vertical-align: middle;
}
.info-card-wrapper {
  .size;
  overflow: hidden;
  .ivu-card-body {
    .size;
  }
  .content-con {
    .size;
    position: relative;
    .left-area {
      .common;
      & > .icon {
        .middle-center;
      }
    }
    .right-area {
      .common;
      & > div {
        .middle-center;
      }
    }
  }
}
</style>
