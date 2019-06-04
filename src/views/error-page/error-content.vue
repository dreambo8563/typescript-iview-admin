<template>
  <div class="error-page">
    <div class="content-con">
      <img :src="src" :alt="code" />
      <div class="text-con">
        <h4>{{ code }}</h4>
        <h5>{{ desc }}</h5>
      </div>
      <back-btn-group class="back-btn-group"></back-btn-group>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import backBtnGroup from "./back-btn-group.vue";
@Component({
  components: {
    backBtnGroup
  }
})
export default class ErrorContent extends Vue {
  @Prop(String) readonly code!: string | undefined;
  @Prop(String) readonly desc!: string | undefined;
  @Prop(String) readonly src!: string | undefined;

  name = "error_content";
}
</script>

<style lang="less">
@import "./error.less";
</style>
