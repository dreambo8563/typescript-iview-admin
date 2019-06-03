<template>
  <div>
    <div
      v-if="searchable && searchPlace === 'top'"
      class="search-con search-con-top"
    >
      <Select v-model="searchKey" class="search-col">
        <Option
          v-for="item in shownColumns"
          :value="item.key"
          :key="`search-col-${item.key}`"
          >{{ item.title }}</Option
        >
      </Select>
      <Input
        @on-change="handleClear"
        clearable
        placeholder="输入关键字搜索"
        class="search-input"
        v-model="searchValue"
      />
      <Button @click="handleSearch" class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button>
    </div>
    <Table
      ref="tablesMain"
      :data="insideTableData"
      :columns="insideColumns"
      :stripe="stripe"
      :border="border"
      :show-header="showHeader"
      :width="width"
      :height="height"
      :loading="loading"
      :disabled-hover="disabledHover"
      :highlight-row="highlightRow"
      :row-class-name="rowClassName"
      :size="size"
      :no-data-text="noDataText"
      :no-filtered-data-text="noFilteredDataText"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-cancel="onSelectCancel"
      @on-select-all="onSelectAll"
      @on-selection-change="onSelectionChange"
      @on-sort-change="onSortChange"
      @on-filter-change="onFilterChange"
      @on-row-click="onRowClick"
      @on-row-dblclick="onRowDblclick"
      @on-expand="onExpand"
    >
      <slot name="header" slot="header"></slot>
      <slot name="footer" slot="footer"></slot>
      <slot name="loading" slot="loading"></slot>
    </Table>
    <div
      v-if="searchable && searchPlace === 'bottom'"
      class="search-con search-con-top"
    >
      <Select v-model="searchKey" class="search-col">
        <Option
          v-for="item in shownColumns"
          :value="item.key"
          :key="`search-col-${item.key}`"
          >{{ item.title }}</Option
        >
      </Select>
      <Input
        placeholder="输入关键字搜索"
        class="search-input"
        v-model="searchValue"
      />
      <Button class="search-btn" type="primary">
        <Icon type="search" />&nbsp;&nbsp;搜索
      </Button>
    </div>
    <a id="hrefToExportTable" style="display: none;width: 0px;height: 0px;"></a>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import TablesEdit from "./edit.vue";
import handleBtns from "./handle-btns";
import { Table } from "iview";

@Component
export default class Tables extends Vue {
  @Prop({ default: () => [] }) readonly value!: any[];
  @Prop({ default: () => [] }) readonly columns!: any[];
  @Prop(String) readonly size!: string | undefined;
  @Prop([Number, String]) readonly width!: Number | String | undefined;
  @Prop([Number, String]) readonly height!: Number | String | undefined;
  @Prop({ default: false }) readonly stripe!: boolean;
  @Prop({ default: false }) readonly border!: boolean;
  @Prop({ default: true }) readonly showHeader!: boolean;
  @Prop({ default: false }) readonly highlightRow!: boolean;
  @Prop({ type: Function, default: () => "" }) readonly rowClassName!: Function;
  @Prop(Object) readonly context!: object | undefined;
  @Prop(String) readonly noDataText!: string | undefined;
  @Prop(String) readonly noFilteredDataText!: string | undefined;
  @Prop(Boolean) readonly disabledHover!: boolean | undefined;
  @Prop({ default: false }) readonly loading!: boolean;
  @Prop({ default: false }) readonly editable!: boolean;
  @Prop({ default: false }) readonly searchable!: boolean;
  @Prop({ default: "top" }) readonly searchPlace!: string;

  name = "Tables";

  //data
  insideColumns = [];
  insideTableData: any[] = [];
  edittingCellId = "";
  edittingText = "";
  searchValue = "";
  searchKey = "";

  suportEdit(item, index) {
    item.render = (h, params) => {
      return h(TablesEdit, {
        props: {
          params: params,
          value: this.insideTableData[params.index][params.column.key],
          edittingCellId: this.edittingCellId,
          editable: this.editable
        },
        on: {
          input: val => {
            this.edittingText = val;
          },
          "on-start-edit": params => {
            this.edittingCellId = `editting-${params.index}-${
              params.column.key
            }`;
            this.$emit("on-start-edit", params);
          },
          "on-cancel-edit": params => {
            this.edittingCellId = "";
            this.$emit("on-cancel-edit", params);
          },
          "on-save-edit": params => {
            this.value[params.row.initRowIndex][
              params.column.key
            ] = this.edittingText;
            this.$emit("input", this.value);
            this.$emit(
              "on-save-edit",
              Object.assign(params, { value: this.edittingText })
            );
            this.edittingCellId = "";
          }
        }
      });
    };
    return item;
  }

  surportHandle(item) {
    let options = item.options || [];
    let insideBtns: any[] = [];
    options.forEach(item => {
      if (handleBtns[item]) insideBtns.push(handleBtns[item]);
    });
    let btns = item.button ? insideBtns.concat(item.button) : insideBtns;
    item.render = (h, params) => {
      params.tableData = this.value;
      return h("div", btns.map(item => item(h, params, this)));
    };
    return item;
  }

  handleColumns(columns) {
    this.insideColumns = columns.map((item, index) => {
      let res = item;
      if (res.editable) res = this.suportEdit(res, index);
      if (res.key === "handle") res = this.surportHandle(res);
      return res;
    });
  }

  setDefaultSearchKey() {
    this.searchKey =
      this.columns[0].key !== "handle"
        ? this.columns[0].key
        : this.columns.length > 1
        ? this.columns[1].key
        : "";
  }

  handleClear(e) {
    if (e.target.value === "") this.insideTableData = this.value;
  }

  handleSearch() {
    this.insideTableData = this.value.filter(
      item => item[this.searchKey].indexOf(this.searchValue) > -1
    );
  }

  handleTableData() {
    this.insideTableData = this.value.map((item, index) => {
      let res = item;
      res.initRowIndex = index;
      return res;
    });
  }

  exportCsv(params) {
    (this.$refs.tablesMain as Table).exportCsv(params);
  }

  clearCurrentRow() {
    (this.$refs.talbesMain as Table).clearCurrentRow();
  }

  onCurrentChange(currentRow, oldCurrentRow) {
    this.$emit("on-current-change", currentRow, oldCurrentRow);
  }

  onSelect(selection, row) {
    this.$emit("on-select", selection, row);
  }

  onSelectCancel(selection, row) {
    this.$emit("on-select-cancel", selection, row);
  }

  onSelectAll(selection) {
    this.$emit("on-select-all", selection);
  }

  onSelectionChange(selection) {
    this.$emit("on-selection-change", selection);
  }

  onSortChange(column, key, order) {
    this.$emit("on-sort-change", column, key, order);
  }

  onFilterChange(row) {
    this.$emit("on-filter-change", row);
  }

  onRowClick(row, index) {
    this.$emit("on-row-click", row, index);
  }

  onRowDblclick(row, index) {
    this.$emit("on-row-dblclick", row, index);
  }

  onExpand(row, status) {
    this.$emit("on-expand", row, status);
  }
  get shownColumns() {
    return this.columns.filter(c => c.key !== "handle");
  }
  @Watch("columns")
  columnsChanged(columns) {
    this.handleColumns(columns);
    this.setDefaultSearchKey();
  }

  @Watch("value")
  valueChanged(val) {
    this.handleTableData();
    if (this.searchable) this.handleSearch();
  }

  mounted() {
    this.handleColumns(this.columns);
    this.setDefaultSearchKey();
    this.handleTableData();
  }
}
</script>
<style lang="less">
@import "./index.less";
</style>
