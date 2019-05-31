<template>
  <div class="custom-bread-crumb">
    <Breadcrumb :style="{ fontSize: `${fontSize}px` }">
      <BreadcrumbItem
        v-for="item in list"
        :to="item.to"
        :key="`bread-crumb-${item.name}`"
      >
        <common-icon style="margin-right: 4px;" :type="item.icon || ''" />
        {{ showTitle(item) }}
      </BreadcrumbItem>
    </Breadcrumb>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import { showTitle } from "@/libs/util";
import CommonIcon from "_c/common-icon";

@Component({
  components: {
    CommonIcon
  }
})
export default class CustomBreadCrumb extends Vue {
  @Prop({ default: () => [] }) readonly list!: any[];
  @Prop({ default: 14 }) readonly fontSize!: number;
  @Prop({ default: false }) readonly showIcon!: boolean;

  name = "customBreadCrumb";

  showTitle(item) {
    return showTitle(item, this);
  }
  isCustomIcon(iconName) {
    return iconName.indexOf("_") === 0;
  }
  getCustomIconName(iconName) {
    return iconName.slice(1);
  }
}
</script>

<style lang="less">
@import "./custom-bread-crumb.less";
</style>
