<template>
  <div v-if="showFullScreenBtn" class="full-screen-btn-con">
    <Tooltip :content="value ? '退出全屏' : '全屏'" placement="bottom">
      <Icon
        @click.native="handleChange"
        :type="value ? 'md-contract' : 'md-expand'"
        :size="23"
      ></Icon>
    </Tooltip>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Fullscreen extends Vue {
  @Prop({ default: false }) readonly value!: boolean;

  name = "Fullscreen";

  get showFullScreenBtn() {
    return window.navigator.userAgent.indexOf("MSIE") < 0;
  }

  handleFullscreen() {
    let main: any = document.body;
    if (this.value) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if ((document as any).mozCancelFullScreen) {
        (document as any).mozCancelFullScreen();
      } else if ((document as any).webkitCancelFullScreen) {
        (document as any).webkitCancelFullScreen();
      } else if ((document as any).msExitFullscreen) {
        (document as any).msExitFullscreen();
      }
    } else {
      if (main.requestFullscreen) {
        main.requestFullscreen();
      } else if (main.mozRequestFullScreen) {
        main.mozRequestFullScreen();
      } else if (main.webkitRequestFullScreen) {
        main.webkitRequestFullScreen();
      } else if (main.msRequestFullscreen) {
        main.msRequestFullscreen();
      }
    }
  }

  handleChange() {
    this.handleFullscreen();
  }

  mounted() {
    let isFullscreen =
      document.fullscreenElement ||
      (document as any).mozFullScreenElement ||
      (document as any).webkitFullscreenElement ||
      (document as any).fullScreen ||
      (document as any).mozFullScreen ||
      (document as any).webkitIsFullScreen;
    isFullscreen = !!isFullscreen;
    document.addEventListener("fullscreenchange", () => {
      this.$emit("input", !this.value);
      this.$emit("on-change", !this.value);
    });
    document.addEventListener("mozfullscreenchange", () => {
      this.$emit("input", !this.value);
      this.$emit("on-change", !this.value);
    });
    document.addEventListener("webkitfullscreenchange", () => {
      this.$emit("input", !this.value);
      this.$emit("on-change", !this.value);
    });
    document.addEventListener("msfullscreenchange", () => {
      this.$emit("input", !this.value);
      this.$emit("on-change", !this.value);
    });
    this.$emit("input", isFullscreen);
  }
}
</script>

<style lang="less">
.full-screen-btn-con .ivu-tooltip-rel {
  height: 64px;
  line-height: 56px;
  i {
    cursor: pointer;
  }
}
</style>
