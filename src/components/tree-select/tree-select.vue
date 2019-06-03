<template>
  <Select
    ref="select"
    class="tree-select"
    v-bind="$attrs"
    @on-change="handleChange"
    multiple
  >
    <tree-select-tree-item
      :selectedArray="value"
      :data="data"
      @on-clear="handleClear"
      :load-data="loadData"
      @on-check="handleTreeCheck"
    ></tree-select-tree-item>
  </Select>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import TreeSelectTreeItem from "./tree-select-tree.vue";
import { Select } from "iview";

@Component({
  components: {
    TreeSelectTreeItem
  },
  provide() {
    return {
      parent: this
    };
  }
})
export default class TreeSelect extends Vue {
  @Prop({ default: () => [] }) readonly value!: any[];
  @Prop({ default: () => [] }) readonly data!: any[];
  @Prop(Function) readonly loadData!: Function | undefined;

  name = "TreeSelect";

  //data
  isChangedByTree = true;
  isInit = true;

  handleChange(selected) {
    if (!this.isChangedByTree) this.$emit("input", selected);
    this.isChangedByTree = false;
  }

  handleTreeCheck(selectedArray) {
    this.isChangedByTree = true;
    this.$emit("input", selectedArray.map(item => item.id));
  }

  handleClear() {
    (this.$refs.select as any).reset();
  }
}
</script>

<style lang="less">
.tree-select {
  .ivu-select-dropdown {
    padding: 0 6px;
  }
}
</style>
