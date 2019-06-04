<template>
  <div>
    <Row :gutter="10">
      <i-col span="6">
        <Card>
          <div class="i18n-card-box">
            <DatePicker type="date" placeholder="Select date"></DatePicker>
            <TimePicker
              type="timerange"
              placement="bottom-end"
              placeholder="Select time"
              style="display: block;margin-top: 10px;"
            ></TimePicker>
            <Button
              type="primary"
              @click="modalVisible = true"
              style="margin-top: 10px;"
              >{{ $t("buttonText") }}</Button
            >
            <Modal v-model="modalVisible" :title="$t('modalTitle')">
              <p>{{ content }}</p>
              <p>{{ content }}</p>
              <p>{{ content }}</p>
            </Modal>
            <i class="tip">{{ $t("i18n-tip") }}</i>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class I18nPage extends Vue {
  name = "i18n_page";

  //data
  modalVisible = false;

  get content() {
    return this.$t("content");
  }
}
</script>

<style lang="less">
.i18n-card-box {
  height: 200px;
  .tip {
    color: gray;
    display: block;
    margin-top: 20px;
  }
}
</style>
