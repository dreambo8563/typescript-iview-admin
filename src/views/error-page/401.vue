<template>
  <error-content code="401" desc="Oh~~您没有浏览这个页面的权限~" :src="src" />
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import error401 from "@/assets/images/error-page/error-401.svg";
import errorContent from "./error-content.vue";

@Component({
  components: {
    errorContent
  }
})
export default class Error401 extends Vue {
  name = "error_401";
  src = error401;
}
</script>
