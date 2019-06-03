<template>
  <Dropdown
    ref="dropdown"
    @on-click="handleClick"
    :class="hideTitle ? '' : 'collased-menu-dropdown'"
    :transfer="hideTitle"
    :placement="placement"
  >
    <a
      class="drop-menu-a"
      type="text"
      @mouseover="handleMousemove($event, children)"
      :style="{ textAlign: !hideTitle ? 'left' : '' }"
    >
      <common-icon
        :size="rootIconSize"
        :color="textColor"
        :type="parentItem.icon"
      />
      <span class="menu-title" v-if="!hideTitle">{{
        showTitle(parentItem)
      }}</span>
      <Icon
        style="float: right;"
        v-if="!hideTitle"
        type="ios-arrow-forward"
        :size="16"
      />
    </a>
    <DropdownMenu ref="dropdown" slot="list">
      <template v-for="child in children">
        <collapsed-menu
          v-if="showChildren(child)"
          :icon-size="iconSize"
          :parent-item="child"
          :key="`drop-${child.name}`"
        ></collapsed-menu>
        <DropdownItem v-else :key="`drop-${child.name}`" :name="child.name">
          <common-icon :size="iconSize" :type="child.icon" />
          <span class="menu-title">{{ showTitle(child) }}</span>
        </DropdownItem>
      </template>
    </DropdownMenu>
  </Dropdown>
</template>

<script lang="ts">
import { mixins } from "vue-class-component";
import { Component, Vue, Prop, Emit } from "vue-property-decorator";

import mixin from "./mixin";
import itemMixin from "./item-mixin";
import { findNodeUpperByClasses } from "@/libs/util";

@Component
export default class CollapsedMenu extends mixins(mixin, itemMixin) {
  @Prop({ default: false }) readonly hideTitle!: boolean;
  @Prop({ default: 16 }) readonly rootIconSize!: number;

  name = "CollapsedMenu";
  placement = "right-end";

  @Emit("on-click")
  handleClick(name) {
    return name;
  }

  handleMousemove(event, children) {
    const { pageY } = event;
    const height = children.length * 38;
    const isOverflow = pageY + height < window.innerHeight;
    this.placement = isOverflow ? "right-start" : "right-end";
  }

  mounted() {
    let dropdown = findNodeUpperByClasses((this.$refs.dropdown as Vue).$el, [
      "ivu-select-dropdown",
      "ivu-dropdown-transfer"
    ]);
    if (dropdown) dropdown.style.overflow = "visible";
  }
}
</script>
