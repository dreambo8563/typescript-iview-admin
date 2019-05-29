<template>
  <div class="side-menu-wrapper">
    <slot></slot>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SideMenu extends Vue {
  @Prop() private msg!: string;
}
</script>
