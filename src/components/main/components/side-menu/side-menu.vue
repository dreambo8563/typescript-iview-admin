<template>
  <div class="side-menu-wrapper">
    <slot></slot>
    <Menu
      ref="menu"
      v-show="!collapsed"
      :active-name="activeName"
      :open-names="openedNames"
      :accordion="accordion"
      :theme="theme"
      width="auto"
      @on-select="handleSelect"
    >
      <template v-for="item in menuList">
        <template v-if="item.children && item.children.length === 1">
          <side-menu-item
            v-if="showChildren(item)"
            :key="`menu-${item.name}`"
            :parent-item="item"
          ></side-menu-item>
          <menu-item
            v-else
            :name="getNameOrHref(item, true)"
            :key="`menu-${item.children[0].name}`"
          >
            <common-icon :type="item.children[0].icon || ''" />
            <span>{{ showTitle(item.children[0]) }}</span>
          </menu-item>
        </template>
        <template v-else>
          <side-menu-item
            v-if="showChildren(item)"
            :key="`menu-${item.name}`"
            :parent-item="item"
          ></side-menu-item>
          <menu-item
            v-else
            :name="getNameOrHref(item)"
            :key="`menu-${item.name}`"
          >
            <common-icon :type="item.icon || ''" />
            <span>{{ showTitle(item) }}</span>
          </menu-item>
        </template>
      </template>
    </Menu>
    <div class="menu-collapsed" v-show="collapsed" :list="menuList">
      <template v-for="item in menuList">
        <collapsed-menu
          v-if="item.children && item.children.length > 1"
          @on-click="handleSelect"
          :hide-title="true"
          :root-icon-size="rootIconSize"
          :icon-size="iconSize"
          :theme="theme"
          :parent-item="item"
          :key="`drop-menu-${item.name}`"
        ></collapsed-menu>
        <Tooltip
          transfer
          v-else
          :content="
            showTitle(
              item.children && item.children[0] ? item.children[0] : item
            )
          "
          placement="right"
          :key="`drop-menu-${item.name}`"
        >
          <a
            @click="handleSelect(getNameOrHref(item, true))"
            class="drop-menu-a"
            :style="{ textAlign: 'center' }"
          >
            <common-icon
              :size="rootIconSize"
              :color="textColor"
              :type="item.icon || (item.children && item.children[0].icon)"
            />
          </a>
        </Tooltip>
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Emit, Prop, Watch } from "vue-property-decorator";
import { mixins } from "vue-class-component";
import { Menu } from "iview";

import SideMenuItem from "./side-menu-item.vue";
import CollapsedMenu from "./collapsed-menu.vue";
import { getUnion } from "@/libs/tools";
import mixin from "./mixin";

@Component({
  components: {
    SideMenuItem,
    CollapsedMenu
  }
})
export default class SideMenu extends mixins(mixin) {
  @Prop({ default: () => [] }) readonly menuList!: any[];
  @Prop(Boolean) readonly collapsed!: boolean | undefined;
  @Prop({ default: "dark" }) readonly theme!: string;
  @Prop({ default: 20 }) readonly rootIconSize!: number;
  @Prop({ default: 16 }) readonly iconSize!: number;
  @Prop(Boolean) readonly accordion!: boolean | undefined;
  @Prop({ default: "" }) readonly activeName!: string;
  @Prop({ default: () => [] }) readonly openNames!: any[];

  name = "SideMenu";

  openedNames: Array<string | undefined> = [];

  @Emit("on-select")
  handleSelect(name) {
    return name;
  }
  getOpenedNamesByActiveName(name: string): (string | undefined)[] {
    return this.$route.matched
      .map(item => item.name)
      .filter(item => item !== name);
  }
  updateOpenName(name) {
    if (name === this.$config.homeName) {
      this.openedNames = [];
    } else {
      this.openedNames = this.getOpenedNamesByActiveName(name);
    }
  }
  get textColor() {
    return this.theme === "dark" ? "#fff" : "#495060";
  }

  @Watch("activeName")
  onActiveNameChanged(val: string, oldVal: string) {
    if (this.accordion) {
      this.openedNames = this.getOpenedNamesByActiveName(name);
    } else {
      this.openedNames = getUnion(
        this.openedNames,
        this.getOpenedNamesByActiveName(name)
      );
    }
  }

  @Watch("openNames")
  onOpenNamesChanged(newNames: string[]) {
    this.openedNames = newNames;
  }

  @Watch("openedNames")
  onOpenedNamesChanged() {
    this.$nextTick(() => {
      (this.$refs.menu as Menu).updateOpened();
    });
  }

  mounted() {
    this.openedNames = getUnion(
      this.openedNames,
      this.getOpenedNamesByActiveName(name)
    );
  }
}
</script>

<style lang="less">
@import "./side-menu.less";
</style>
