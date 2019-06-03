<template>
  <Card shadow style="height: 100%;width: 100%;overflow:hidden">
    <div class="department-outer">
      <div class="tip-box">
        <b style="margin-right: 20px;">
          powered by
          <a target="blank" href="https://github.com/lison16">Lison</a>
        </b>
        <a
          target="blank"
          href="https://github.com/lison16/v-org-tree"
          style="margin-right: 10px;"
          >v-org-tree文档</a
        >
      </div>
      <div class="zoom-box">
        <zoom-controller v-model="zoom" :min="20" :max="200"></zoom-controller>
      </div>
      <div class="view-box">
        <org-view
          v-if="data"
          :data="data"
          :zoom-handled="zoomHandled"
          @on-menu-click="handleMenuClick"
        ></org-view>
      </div>
    </div>
  </Card>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OrgView from "./components/org-view.vue";
import ZoomController from "./components/zoom-controller.vue";
import { getOrgData } from "@/api/data";

const menuDic = {
  edit: "编辑部门",
  detail: "查看部门",
  new: "新增子部门",
  delete: "删除部门"
};

@Component({
  components: {
    OrgView,
    ZoomController
  }
})
export default class OrgTree extends Vue {
  name = "org_tree_page";
  //data
  data = null;
  zoom = 100;

  get zoomHandled() {
    return this.zoom / 100;
  }

  setDepartmentData(data) {
    data.isRoot = true;
    return data;
  }

  handleMenuClick({ data, key }) {
    this.$Message.success({
      duration: 5,
      content: `点击了《${data.label}》节点的'${menuDic[key]}'菜单`
    });
  }

  getDepartmentData() {
    getOrgData().then(res => {
      const { data } = res;
      this.data = data;
    });
  }

  mounted() {
    this.getDepartmentData();
  }
}
</script>
<style lang="less">
@import "./index.less";
</style>
