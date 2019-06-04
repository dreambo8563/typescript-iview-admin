<template>
  <div
    ref="dragWrapper"
    class="org-tree-drag-wrapper"
    @mousedown="mousedownView"
    @contextmenu="handleDocumentContextmenu"
  >
    <div class="org-tree-wrapper" :style="orgTreeStyle">
      <v-org-tree
        v-if="data"
        :data="data"
        :node-render="nodeRender"
        :expand-all="true"
        @on-node-click="handleNodeClick"
        collapsable
      ></v-org-tree>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { on, off } from "@/libs/tools";
const menuList = [
  {
    key: "edit",
    label: "编辑部门"
  },
  {
    key: "detail",
    label: "查看部门"
  },
  {
    key: "new",
    label: "新增子部门"
  },
  {
    key: "delete",
    label: "删除部门"
  }
];

@Component
export default class OrgView extends Vue {
  @Prop({ default: 1 }) readonly zoomHandled!: number;
  @Prop(Object) readonly data!: object | undefined;

  name = "OrgView";

  //data
  currentContextMenuId = "";
  orgTreeOffsetLeft = 0;
  orgTreeOffsetTop = 0;
  initPageX = 0;
  initPageY = 0;
  oldMarginLeft = 0;
  oldMarginTop = 0;
  canMove = false;

  get orgTreeStyle() {
    return {
      transform: `translate(-50%, -50%) scale(${this.zoomHandled}, ${
        this.zoomHandled
      })`,
      marginLeft: `${this.orgTreeOffsetLeft}px`,
      marginTop: `${this.orgTreeOffsetTop}px`
    };
  }

  handleNodeClick(e, data, expand) {
    expand();
  }

  closeMenu() {
    this.currentContextMenuId = "";
  }

  getBgColor(data) {
    return this.currentContextMenuId === data.id
      ? data.isRoot
        ? "#0d7fe8"
        : "#5d6c7b"
      : "";
  }

  nodeRender(h, data) {
    return h(
      "div",
      {
        class: {
          "custom-org-node": true,
          "has-children-label": data.children && data.children.length
        },
        on: {
          mousedown: event => event.stopPropagation(),
          contextmenu: this.contextmenu.bind(this, data)
        }
      },
      data.label,
      [
        h(
          "dropdown",
          {
            props: {
              trigger: "custom",
              visible: this.currentContextMenuId === data.id
            },
            on: {
              click: this.handleContextMenuClick.bind(this, data)
            },
            nativeOn: {
              click: this.handleDropdownClick
            },
            class: {
              "context-menu": true
            },
            style: {
              transform: `scale(${1 / this.zoomHandled}, ${1 /
                this.zoomHandled})`
            },
            directives: [
              {
                name: "v-click-outside",
                expression: "this.closeMenu"
              }
            ]
          },
          [
            h(
              "dropdown-menu",
              {
                slot: "list"
              },
              menuList.map(item => {
                return h(
                  "dropdown-item",
                  {
                    props: {
                      name: item.key
                    }
                  },
                  item.label
                );
              })
            )
          ]
        )
      ]
    );
  }

  contextmenu(data, $event) {
    let event = $event || window.event;
    event.preventDefault ? event.preventDefault() : (event.returnValue = false);
    this.currentContextMenuId = data.id;
  }

  setDepartmentData(data) {
    data.isRoot = true;
    // this.departmentData = data;
  }

  mousedownView(event) {
    this.canMove = true;
    this.initPageX = event.pageX;
    this.initPageY = event.pageY;
    this.oldMarginLeft = this.orgTreeOffsetLeft;
    this.oldMarginTop = this.orgTreeOffsetTop;
    on(document, "mousemove", this.mousemoveView);
    on(document, "mouseup", this.mouseupView);
  }

  mousemoveView(event) {
    if (!this.canMove) return;
    const { pageX, pageY } = event;
    this.orgTreeOffsetLeft = this.oldMarginLeft + pageX - this.initPageX;
    this.orgTreeOffsetTop = this.oldMarginTop + pageY - this.initPageY;
  }

  mouseupView() {
    this.canMove = false;
    off(document, "mousemove", this.mousemoveView);
    off(document, "mouseup", this.mouseupView);
  }

  handleDropdownClick(event) {
    event.stopPropagation();
  }

  handleDocumentContextmenu() {
    this.canMove = false;
  }

  handleContextMenuClick(data, key) {
    this.$emit("on-menu-click", { data, key });
  }

  mounted() {
    on(document, "contextmenu", this.handleDocumentContextmenu);
  }

  beforeDestroy() {
    off(document, "contextmenu", this.handleDocumentContextmenu);
  }
}
</script>
