<template>
  <component
    :is="iconType"
    :type="iconName"
    :color="iconColor"
    :size="iconSize"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Icons from "_c/icons";

@Component({
  components: {
    Icons
  }
})
export default class CommonIcon extends Vue {
  @Prop({ type: String, required: true }) readonly type!: string;
  @Prop(String) readonly color!: string | undefined;
  @Prop(Number) readonly size!: number | undefined;

  name = "CommonIcon";

  get iconType() {
    return this.type.indexOf("_") === 0 ? "Icons" : "Icon";
  }

  get iconName() {
    return this.iconType === "Icons"
      ? this.getCustomIconName(this.type)
      : this.type;
  }

  get iconSize() {
    return this.size || (this.iconType === "Icons" ? 12 : undefined);
  }

  get iconColor() {
    return this.color || "";
  }

  getCustomIconName(iconName) {
    return iconName.slice(1);
  }
}
</script>
