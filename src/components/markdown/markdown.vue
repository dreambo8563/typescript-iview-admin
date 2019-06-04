<template>
  <div class="markdown-wrapper">
    <textarea ref="editor"></textarea>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Simplemde from "simplemde";
import "simplemde/dist/simplemde.min.css";

@Component
export default class MarkdownEditor extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({
    type: Object,
    default: () => {
      return {};
    }
  })
  readonly options!: object;

  @Prop({ default: true }) readonly localCache!: boolean;

  name = "MarkdownEditor";

  //data
  editor: Simplemde | null = null;

  addEvents() {
    this.editor!.codemirror.on("change", () => {
      let value = this.editor!.value();
      if (this.localCache) localStorage.markdownContent = value;
      this.$emit("input", value);
      this.$emit("on-change", value);
    });
    this.editor!.codemirror.on("focus", () => {
      this.$emit("on-focus", this.editor!.value());
    });
    this.editor!.codemirror.on("blur", () => {
      this.$emit("on-blur", this.editor!.value());
    });
  }

  mounted() {
    this.editor = new Simplemde(
      Object.assign(this.options, {
        element: this.$refs.editor
      })
    );
    /**
     * 事件列表为Codemirror编辑器的事件，更多事件类型，请参考：
     * https://codemirror.net/doc/manual.html#events
     */
    this.addEvents();
    let content = localStorage.markdownContent;
    if (content) this.editor!.value(content);
  }
}
</script>

<style lang="less">
.markdown-wrapper {
  .editor-toolbar.fullscreen {
    z-index: 9999;
  }
  .CodeMirror-fullscreen {
    z-index: 9999;
  }
  .CodeMirror-fullscreen ~ .editor-preview-side {
    z-index: 9999;
  }
}
</style>
