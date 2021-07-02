<template>
  <div class="account">
    <form v-on:submit.prevent="register" class="account__form">
      <p v-if="error">{{ error }}</p>
      <div class="form__group">
        <input
          type="text"
          class="account__form-firstname"
          id="firstname"
          placeholder="First Name"
          v-model="firstName"
        />

        <input
          type="text"
          class="account__form-lastname"
          id="lastname"
          placeholder="Last Name"
          v-model="lastName"
        />
      </div>
      <div class="form__group">
        <input
          type="email"
          class="account__form-email"
          id="email"
          placeholder="Email"
          v-model="email"
        />
      </div>
      <div class="form__group">
        <input
          type="password"
          class="account__form-password"
          id="password"
          placeholder="Password"
          v-model="password"
        />
      </div>
      <div class="form__group" style="display: flex; justify-content: center">
        <button type="submit" class="account__form-submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      error: "",
    };
  },
  methods: {
    register() {
      fetch("http://localhost/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userData: {
            email: this.email,
            password: this.password,
            firstName: this.firstName,
            lastName: this.lastName,
          },
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.error = data.error;
          } else {
            localStorage.token = data.token;
            localStorage.name = data.firstName;
            localStorage.id = data.userId;
            this.$router.push("/servers");
          }
        });
    },
  },
};
</script>

<style></style>
