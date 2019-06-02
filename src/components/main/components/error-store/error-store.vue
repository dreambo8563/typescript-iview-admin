<template>
  <div class="error-store">
    <Badge dot :count="countComputed">
      <Button type="text" @click="openErrorLoggerPage">
        <Icon :size="20" type="ios-bug" />
      </Button>
    </Badge>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class ErrorStore extends Vue {
  @Prop({ default: 0 }) readonly count!: number;
  @Prop({ default: false }) readonly hasRead!: boolean;

  name = "ErrorStore";

  get countComputed() {
    return this.hasRead ? 0 : this.count;
  }

  openErrorLoggerPage() {
    this.$router.push({
      name: "error_logger_page"
    });
  }
}
</script>

<style lang="less">
.error-store {
  margin-right: 12px;
  .ivu-badge-dot {
    top: 20px;
  }
  .ivu-btn.ivu-btn-text {
    padding: 5px 1px 6px;
  }
}
</style>
