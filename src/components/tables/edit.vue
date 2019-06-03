<template>
  <div class="tables-edit-outer">
    <div v-if="!isEditting" class="tables-edit-con">
      <span class="value-con">{{ value }}</span>
      <Button
        v-if="editable"
        @click="startEdit"
        class="tables-edit-btn"
        style="padding: 2px 4px;"
        type="text"
      >
        <Icon type="md-create"></Icon>
      </Button>
    </div>
    <div v-else class="tables-editting-con">
      <Input :value="value" @input="handleInput" class="tables-edit-input" />
      <Button @click="saveEdit" style="padding: 6px 4px;" type="text">
        <Icon type="md-checkmark"></Icon>
      </Button>
      <Button @click="canceltEdit" style="padding: 6px 4px;" type="text">
        <Icon type="md-close"></Icon>
      </Button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class TablesEdit extends Vue {
  @Prop([String, Number]) readonly value!: string | number | undefined;
  @Prop(String) readonly edittingCellId!: string | undefined;
  @Prop(Object) readonly params!: { [key: string]: any } | undefined;
  @Prop(Boolean) readonly editable!: boolean | undefined;

  name = "TablesEdit";

  get isEditting() {
    return (
      this.edittingCellId ===
      `editting-${this.params && this.params!.index!}-${this.params &&
        this.params!.column!.key!}`
    );
  }

  handleInput(val) {
    this.$emit("input", val);
  }

  startEdit() {
    this.$emit("on-start-edit", this.params);
  }

  saveEdit() {
    this.$emit("on-save-edit", this.params);
  }

  canceltEdit() {
    this.$emit("on-cancel-edit", this.params);
  }
}
</script>

<style lang="less">
.tables-edit-outer {
  height: 100%;
  .tables-edit-con {
    position: relative;
    height: 100%;
    .value-con {
      vertical-align: middle;
    }
    .tables-edit-btn {
      position: absolute;
      right: 10px;
      top: 0;
      display: none;
    }
    &:hover {
      .tables-edit-btn {
        display: inline-block;
      }
    }
  }
  .tables-editting-con {
    .tables-edit-input {
      width: ~"calc(100% - 60px)";
    }
  }
}
</style>
