<template>
  <div>
    <Dropdown trigger="click" @on-click="selectLang">
      <a href="javascript:void(0)">
        {{ title }}
        <Icon :size="18" type="md-arrow-dropdown" />
      </a>
      <DropdownMenu slot="list">
        <DropdownItem
          v-for="(value, key) in localList"
          :name="key"
          :key="`lang-${key}`"
          >{{ value }}</DropdownItem
        >
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";

@Component
export default class Language extends Vue {
  @Prop({ default: "" }) readonly lang!: string;

  name = "Language";

  langList = {
    "zh-CN": "语言",
    "zh-TW": "語言",
    "en-US": "Lang"
  };

  localList = {
    "zh-CN": "中文简体",
    "zh-TW": "中文繁体",
    "en-US": "English"
  };

  get title() {
    return this.langList[this.lang];
  }

  selectLang(name) {
    this.$emit("on-lang-change", name);
  }

  @Watch("lang")
  onLangChanged(lang: string) {
    this.$i18n.locale = lang;
  }
}
</script>
