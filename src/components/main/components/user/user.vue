<template>
  <div class="user-avatar-dropdown">
    <Dropdown @on-click="handleClick">
      <Badge :dot="!!messageUnreadCount">
        <Avatar :src="userAvatar" />
      </Badge>
      <Icon :size="18" type="md-arrow-dropdown"></Icon>
      <DropdownMenu slot="list">
        <DropdownItem name="message">
          消息中心
          <Badge style="margin-left: 10px" :count="messageUnreadCount"></Badge>
        </DropdownItem>
        <DropdownItem name="logout">退出登录</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import { Action, namespace } from "vuex-class";
const userModule = namespace("user");

@Component
export default class MainUser extends Vue {
  @userModule.Action handleLogOut;

  @Prop({ default: "" }) readonly userAvatar!: string;
  @Prop({ default: 0 }) readonly messageUnreadCount!: number;

  name = "User";

  message() {
    this.$router.push({
      name: "message_page"
    });
  }

  handleClick(name: string) {
    switch (name) {
      case "logout":
        this.logout();
        break;
      case "message":
        this.message();
        break;
      default:
        break;
    }
  }

  logout() {
    this.handleLogOut().then(() => {
      this.$router.push({
        name: "login"
      });
    });
  }
}
</script>

<style lang="less">
@import "./user.less";
</style>
