<template>
  <Form
    ref="loginForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
    <FormItem prop="userName">
      <Input v-model="form.userName" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script lang="ts">
import { Vue, Component, Prop, Emit } from "vue-property-decorator";
import { Form } from "iview";

@Component
export default class LoginForm extends Vue {
  @Prop({
    default: [{ required: true, message: "账号不能为空", trigger: "blur" }]
  })
  readonly passwordRules!: object | Array<any>;
  @Prop({
    default: [{ required: true, message: "密码不能为空", trigger: "blur" }]
  })
  readonly userNameRules!: object | Array<any>;

  name: string = "LoginForm";

  form = {
    userName: "super_admin",
    password: ""
  };

  // computed
  get rules() {
    return {
      userName: this.userNameRules,
      password: this.passwordRules
    };
  }

  @Emit("on-success-valid")
  submit() {
    return {
      userName: this.form.userName,
      password: this.form.password
    };
  }
  // method
  handleSubmit() {
    (this.$refs.loginForm as Form).validate(valid => {
      if (valid) {
        this.submit();
      }
    });
  }
}
</script>
