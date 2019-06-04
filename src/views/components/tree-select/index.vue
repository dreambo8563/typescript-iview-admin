<template>
  <div>
    <tree-select
      v-model="treeSelected"
      style="width: 300px;"
      check-strictly
      :expand-all="true"
      :load-data="loadData"
      @on-change="handleTreeSelectChange"
      @on-toggle-expand="handleTreeSelectExpand"
      @on-check-change="handleTreeSelectCheckChange"
      @on-select-change="handleTreeSelectClick"
      :data="treeData"
    ></tree-select>
    <Button @click="changeTreeSelectData">更新选中数据</Button>
    <Button @click="changeTreeData">更新树数据</Button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TreeSelect from "_c/tree-select";
import { newTreeData } from "@/mock/data/tree-select";
import { getTreeSelectData } from "@/api/data";

@Component({
  components: {
    TreeSelect
  }
})
export default class TreeSelectPage extends Vue {
  name = "tree_select_page";

  //data
  treeSelected = [112, 113];
  treeData = [];

  changeTreeSelectData() {
    this.treeSelected = [111, 114];
  }

  changeTreeData() {
    this.treeData = newTreeData;
    // this.treeSelected = [];
  }

  handleTreeSelectChange(list) {
    // console.log('=-========', list);
  }

  handleTreeSelectExpand(item) {
    // console.log('toggle expand', item);
  }

  handleTreeSelectCheckChange(selectedArray, item) {
    // console.log(selectedArray, item);
  }

  handleTreeSelectClick(selectArray, item) {
    // console.log(selectArray, item);
  }

  loadData(item, callback) {
    setTimeout(() => {
      let data = [
        {
          id: 111,
          title: "1-1-1"
        },
        {
          id: 112,
          title: "1-1-2"
        },
        {
          id: 113,
          title: "1-1-3"
        },
        {
          id: 114,
          title: "1-1-4"
        }
      ];
      callback(data);
    }, 1000);
  }

  mounted() {
    getTreeSelectData().then(res => {
      const { data } = res;
      this.treeData = data;
    });
  }
}
</script>
