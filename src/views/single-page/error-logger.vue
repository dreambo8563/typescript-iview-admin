<template>
  <div>
    <Button @click="exportData" type="primary" style="margin: 0 10px 10px 0;"
      >导出日志记录</Button
    >
    <b
      >注：这里只会显示成功保存到服务端的错误日志，而且页面错误日志不会在浏览器持久化存储，刷新页面即会丢失</b
    >
    <Table ref="table" :columns="columns" :data="errorList"></Table>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Mutation } from "vuex-class";
import { Table } from "iview";

import dayjs from "dayjs";

@Component
export default class ErrorLoggerPage extends Vue {
  @State(state => state.app.errorList) errorList;
  @Mutation setHasReadErrorLoggerStatus;

  name = "error_logger_page";

  //data
  columns = [
    {
      type: "index",
      title: "序号",
      width: 100
    },
    {
      key: "type",
      title: "类型",
      width: 100,
      render: (h, { row }) => {
        return h("div", [
          h("icon", {
            props: {
              size: 16,
              type: row.type === "ajax" ? "md-link" : "md-code-working"
            }
          })
        ]);
      }
    },
    {
      key: "code",
      title: "编码",
      render: (h, { row }) => {
        return h("span", row.code === 0 ? "-" : row.code);
      }
    },
    {
      key: "mes",
      title: "信息"
    },
    {
      key: "url",
      title: "URL"
    },
    {
      key: "time",
      title: "时间",
      render: (h, { row }) => {
        return h("span", dayjs(row.time).format("YYYY-MM-DD HH:mm:ss"));
      },
      sortable: true,
      sortType: "desc"
    }
  ];

  exportData() {
    (this.$refs.table as Table).exportCsv({
      filename: "错误日志.csv"
    });
  }

  activated() {
    this.setHasReadErrorLoggerStatus();
  }

  mounted() {
    this.setHasReadErrorLoggerStatus();
  }
}
</script>
