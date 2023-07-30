<template>
  <div class="w-2/5 bg-white rounded mx-auto mt-4 shadow">
    <a-form
      :model="login"
      name="login"
      autocomplete="off"
      layout="vertical"
      class="p-5"
      hideRequiredMark="true"
      @finish="loginSubmit"
    >
      <a-form-item
        label="Email"
        name="email"
        :rules="[{ required: true, message: 'Please enter email' }]"
      >
        <a-input v-model:value="login.email" />
      </a-form-item>

      <a-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please enter password' }]"
      >
        <a-input-password v-model:value="login.password" class="" />
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit">Sign In</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { KRATOS_URL } from '../../constants';

export default {
  data() {
    return {
      login: {},
      flow: {},
      token: "",
    };
  },
  methods: {
    loginSubmit() {
      this.$axios
        .post(
          "auth/login?flow=" + this.flow.id,
          {
            method: "password",
            csrf_token: this.token,
            identifier: this.login.email,
            password: this.login.password,
          },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          this.$store.commit("setUser", res.data.session);
          this.$router.push("/servers");
        });
    },
  },
  created() {
    this.$axios
      .get("auth/flow/login", {
        Headers: {
          accept: "application/json",
        },
        withCredentials: true,
      })
      .then((res) => {
        this.flow = res.data;
      })
      .catch((err) => {
        if (err.response.data.error.id == "session_already_available") {
          this.$router.push("/servers");
        }
      });
  },
  watch: {
    flow: {
      deep: true,
      handler() {
        for (let node of this.flow.ui.nodes) {
          if (node.attributes.name == "csrf_token") {
            this.token = node.attributes.value;
          }
        }
      },
    },
  },
};
</script>

<style scoped></style>
