<template>
  <div>
    <editor ref="editor" :value="content" @on-change="handleChange" />
    <Button @click="changeContent">修改编辑器内容</Button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Editor from "_c/editor";

@Component({
  components: {
    Editor
  }
})
export default class EditorPage extends Vue {
  name = "editor_page";

  //data
  content = "12312323";

  handleChange(html, text) {
    console.log(html, text);
  }

  changeContent() {
    ((this.$refs as unknown) as Editor).editor.setHtml(
      "<p>powered by wangeditor</p>"
    );
  }
}
</script>
