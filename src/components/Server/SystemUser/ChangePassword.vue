<template>
  <div>
    <p class="mb-4">
      User: <b>{{ user.user }}</b>
    </p>
    <div>
      <a-form
        :model="password"
        name="changePass"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
        layout="vertical"
        id="changePass"
        :hideRequiredMark="true"
        :rules="rules"
        @submit="changePassword"
      >
        <a-form-item
          label="New Password"
          name="password"
          :labelCol="{ span: 12 }"
          :wrapperCol="{ span: 30 }"
          has-feedback
        >
          <a-input-password v-model:value="password.password" />
        </a-form-item>
        <a-form-item
          label="Confirm New Password"
          name="confirmPassword"
          :labelCol="{ span: 12 }"
          :wrapperCol="{ span: 30 }"
          has-feedback
        >
          <a-input-password v-model:value="password.confirmPassword" />
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
import { Form } from "ant-design-vue";
const useForm = Form.useForm;
export default {
  props: ["user"],
  data() {
    return {
      password: {
        password: "",
        confirmPassword: "",
      },
      username: this.user,
      rules: {
        password: [
          {
            required: true,
            validator: this.validatePass,
            trigger: "change",
          },
        ],
        confirmPassword: [
          {
            required: true,
            validator: this.validatePass2,
            trigger: "change",
          },
        ],
      },
    };
  },
  methods: {
    async validatePass(_rule, value) {
      if (!value) {
        return Promise.reject("Password cannot be empty");
      }
      let regex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z]).{8,}$/;

      if (!regex.test(value)) {
        return Promise.reject(
          "Password must contain atleast One Uppercase and One Lowercase letter, and One Number"
        );
      } else {
        return Promise.resolve();
      }
    },
    async validatePass2(_rule, value) {
      if (!value) {
        return Promise.reject("Password cannot be empty");
      }
      if (this.password.password !== this.password.confirmPassword) {
        return Promise.reject("Passwords does not match");
      } else {
        return Promise.resolve();
      }
    },
    changePassword() {
      const { validate } = useForm(this.password, this.rules);
      let username = this.username;
      let password = this.password.password;
      console.log(username, password);
      validate()
        .then(() => {
          let data = { user: username.user, password: password };

          this.$emit("submit", data);
        })
        .catch((error) => {
          console.log(error);
          console.log("catch");
        });
    },
  },
};
</script>
<style lang=""></style>
