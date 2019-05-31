<template>
  <a
    @click="handleChange"
    type="text"
    :class="['sider-trigger-a', collapsed ? 'collapsed' : '']"
  >
    <Icon :type="icon" :size="size" />
  </a>
</template>
<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class SiderTrigger extends Vue {
  @Prop({ default: "navicon-round" }) readonly icon!: string;
  @Prop(Boolean) readonly collapsed!: boolean | undefined;
  @Prop({ default: 26 }) readonly size!: number;

  name = "siderTrigger";

  @Emit("on-change")
  handleChange() {
    return !this.collapsed;
  }
}
</script>

<style lang="less">
@import "./sider-trigger.less";
</style>
