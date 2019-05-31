<template>
  <div class="header-bar">
    <sider-trigger
      :collapsed="collapsed"
      icon="md-menu"
      @on-change="handleCollpasedChange"
    ></sider-trigger>
    <custom-bread-crumb
      show-icon
      style="margin-left: 30px;"
      :list="breadCrumbList"
    ></custom-bread-crumb>
    <div class="custom-content-con">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from "vue-property-decorator";
import { State, namespace } from "vuex-class";

import siderTrigger from "./sider-trigger";
import customBreadCrumb from "./custom-bread-crumb";
// const someModule = namespace("app");
@Component({
  components: {
    siderTrigger,
    customBreadCrumb
  }
})
export default class HeaderBar extends Vue {
  @State(state => state.app.breadCrumbList) breadCrumbList;
  @Prop(Boolean) readonly collapsed!: boolean | undefined;

  name = "HeaderBar";

  @Emit("on-coll-change")
  handleCollpasedChange(state) {
    return state;
  }
}
</script>

<style lang="less">
@import "./header-bar.less";
</style>
