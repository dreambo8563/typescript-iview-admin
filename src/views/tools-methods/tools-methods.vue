<template>
  <div>
    <Card shadow>
      <Row>
        <i-col span="4">
          <Button @click="createTagParams">添加一个标签</Button>
        </i-col>
        <i-col span="20">
          <p>动态路由，添加params</p>
        </i-col>
      </Row>
    </Card>
    <Card shadow style="margin-top: 10px;">
      <Row>
        <i-col span="4">
          <Button @click="createTagQuery">添加一个标签</Button>
        </i-col>
        <i-col span="20">
          <p>动态路由，添加query</p>
        </i-col>
      </Row>
    </Card>
    <Card shadow style="margin-top: 10px;">
      <Row>
        <i-col span="4">
          <Button @click="handleCloseTag">关闭工具方法页</Button>
        </i-col>
        <i-col span="20">
          <p>手动关闭页面</p>
        </i-col>
      </Row>
    </Card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import { Route } from "vue-router";

@Component
export default class ToolsMethodsPage extends Vue {
  name = "tools_methods_page";

  @Mutation closeTag;

  createTagParams() {
    const id = parseInt((Math.random() * 100000).toString());
    const route = {
      name: "params",
      params: {
        id
      },
      meta: {
        title: `动态路由-${id}`
      }
    };
    this.$router.push((route as unknown) as Route);
  }

  createTagQuery() {
    const id = parseInt((Math.random() * 100000).toString());
    const route = {
      name: "query",
      query: {
        id
      },
      meta: {
        title: `参数-${id}`
      }
    };
    this.$router.push((route as unknown) as Route);
  }

  handleCloseTag() {
    this.closeTag({
      name: "tools_methods_page"
    });
  }
}
</script>
