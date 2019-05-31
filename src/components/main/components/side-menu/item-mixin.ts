import { Vue, Component, Prop } from "vue-property-decorator";

@Component
export default class ItemMixin extends Vue {
  @Prop(String) readonly theme!: string | undefined;
  @Prop(Number) readonly iconSize!: number | undefined;
  @Prop({ default: () => {} }) readonly parentItem!: {
    name: string;
    children: any[];
  };

  get parentName() {
    return this.parentItem.name;
  }
  get children() {
    return this.parentItem.children;
  }
  get textColor() {
    return this.theme === "dark" ? "#fff" : "#495060";
  }
}
