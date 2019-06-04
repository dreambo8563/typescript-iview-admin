<template>
  <error-content code="404" desc="Oh~~您的页面好像飞走了~" :src="src" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import error404 from "@/assets/images/error-page/error-404.svg";
import errorContent from "./error-content.vue";

@Component({
  components: {
    errorContent
  }
})
export default class Error404 extends Vue {
  name = "error_404";
  src = error404;
}
</script>
