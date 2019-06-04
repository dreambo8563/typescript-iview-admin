<template>
  <div>
    <markdown-editor v-model="content" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MarkdownEditor from "_c/markdown";

@Component({
  components: {
    MarkdownEditor
  }
})
export default class MarkdownPage extends Vue {
  name = "markdown_page";

  //data
  content = "";
}
</script>
