<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
          <p class="login-tip">输入任意用户名和密码即可</p>
        </div>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State, Getter, Action, Mutation, namespace } from "vuex-class";
import LoginForm from "_c/login-form";

// import specific namespace
const userModule = namespace("user");

@Component({
  components: {
    LoginForm
  }
})
export default class Login extends Vue {
  // import action with namespace
  @userModule.Action handleLogin;
  @userModule.Action getUserInfo;

  handleSubmit({ userName, password }: { userName: string; password: string }) {
    this.handleLogin({ userName, password }).then(res => {
      this.getUserInfo().then(res => {
        this.$router.push({
          name: this.$config.homeName
        });
      });
    });
  }
}
</script>

<style lang="less">
@import "./login.less";
</style>
