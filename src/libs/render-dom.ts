import { Component, Vue } from "vue-property-decorator";
import { VNode } from "vue";

@Component({
  props: {
    render: Function
  }
})
export default class RenderDom extends Vue {
  name = "RenderDom";
  functional = true;

  render(h, ctx): VNode {
    return this.$props.render(h);
  }
}
