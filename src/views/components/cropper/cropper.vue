<template>
  <div>
    <Row>
      <i-col span="12">
        <Card>
          <div class="cropper-example cropper-first">
            <cropper
              :src="exampleImageSrc"
              crop-button-text="确认提交"
              @on-crop="handleCroped"
            ></cropper>
          </div>
        </Card>
      </i-col>
    </Row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Cropper from "@/components/cropper";
import { uploadImg } from "@/api/data";

@Component({
  components: {
    Cropper
  }
})
export default class CropperPage extends Vue {
  name = "cropper_page";

  //data
  exampleImageSrc = "";

  handleCroped(blob) {
    const formData = new FormData();
    formData.append("croppedImg", blob);
    uploadImg(formData).then(() => {
      this.$Message.success("Upload success~");
    });
  }
}
</script>

<style lang="less">
.cropper-example {
  height: 400px;
}
</style>
