<template>
  <i :class="`iconfont icon-${type}`" :style="styles"></i>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Icons extends Vue {
  @Prop({ type: String, required: true }) readonly type!: string;
  @Prop({ type: String, default: "#5c6b77" }) readonly color!: string;
  @Prop({ default: 16 }) readonly size!: number;

  name = "Icons";

  get styles() {
    return {
      fontSize: `${this.size}px`,
      color: this.color
    };
  }
}
</script>
