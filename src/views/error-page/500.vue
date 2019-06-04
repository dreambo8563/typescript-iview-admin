<template>
  <error-content code="500" desc="Oh~~鬼知道服务器经历了什么~" :src="src" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import error500 from "@/assets/images/error-page/error-500.svg";
import errorContent from "./error-content.vue";

@Component({
  components: {
    errorContent
  }
})
export default class Error500 extends Vue {
  name = "error_500";
  src = error500;
}
</script>
