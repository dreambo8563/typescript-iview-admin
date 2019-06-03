<template>
  <div :class="`${prefix}-move-trigger`">
    <div :class="`${prefix}-move-trigger-point`">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mixins } from "vue-class-component";

import Mixin from "./mixin";

@Component
export default class DragDrawerTrigger extends mixins(Mixin) {
  name = "DragDrawerTrigger";
}
</script>
<style></style>
