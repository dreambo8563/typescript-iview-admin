<template>
  <div class="editor-wrapper">
    <div :id="editorId"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import Editor from "wangeditor";
import "wangeditor/release/wangEditor.min.css";
import { oneOf } from "@/libs/tools";

@Component
export default class EditorComponent extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({
    type: String,
    default: "html",
    validator: val => {
      return oneOf(val, ["html", "text"]);
    }
  })
  readonly valueType!: string;
  @Prop({ default: 200 }) readonly changeInterval!: number;
  @Prop({ default: true }) readonly cache!: boolean;

  editor: any = null;
  name = "Editor";

  get editorId() {
    return `editor${(this as any)._uid}`;
  }

  setHtml(val) {
    this.editor.txt.html(val);
  }

  mounted() {
    this.editor = new Editor(`#${this.editorId}`);
    this.editor.customConfig.onchange = html => {
      let text = this.editor.txt.text();
      if (this.cache) localStorage.editorCache = html;
      this.$emit("input", this.valueType === "html" ? html : text);
      this.$emit("on-change", html, text);
    };
    this.editor.customConfig.onchangeTimeout = this.changeInterval;
    // create这个方法一定要在所有配置项之后调用
    this.editor.create();
    // 如果本地有存储加载本地存储内容
    let html = this.value || localStorage.editorCache;
    if (html) this.editor.txt.html(html);
  }
}
</script>

<style lang="less">
.editor-wrapper * {
  z-index: 100 !important;
}
</style>
