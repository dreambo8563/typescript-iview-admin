<template>
  <keep-alive :include="cacheList" :exclude="notCacheName">
    <router-view ref="child" />
  </keep-alive>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";

@Component
export default class ParentView extends Vue {
  @State(state => state.app.tagNavList) tagNavList;

  name = "ParentView";

  get notCacheName() {
    return [
      this.$route.meta && this.$route.meta.notCache ? this.$route.name : ""
    ];
  }

  get cacheList() {
    return [
      "ParentView",
      ...(this.tagNavList.length
        ? this.tagNavList
            .filter(item => !(item.meta && item.meta.notCache))
            .map(item => item.name)
        : [])
    ];
  }
}
</script>
