import CommonIcon from "_c/common-icon";
import { showTitle } from "@/libs/util";

import { Vue, Component } from "vue-property-decorator";

@Component({
  components: {
    CommonIcon
  }
})
export default class Mixin extends Vue {
  showTitle(item) {
    return showTitle(item, this);
  }
  showChildren(item) {
    return (
      item.children &&
      (item.children.length > 1 || (item.meta && item.meta.showAlways))
    );
  }
  getNameOrHref(item, children0) {
    return item.href
      ? `isTurnByHref_${item.href}`
      : children0
      ? item.children[0].name
      : item.name;
  }
}
