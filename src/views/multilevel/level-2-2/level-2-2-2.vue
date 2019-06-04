<template>
  <div>
    <h3>多级菜单 -> 二级-2 -> 3级2</h3>
    <Input v-model="val" style="width: 200px"></Input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Level_2_2_2 extends Vue {
  name = "level_2_2_2";
  //data
  val = "";
}
</script>
