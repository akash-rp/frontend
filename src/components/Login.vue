<template>
  <div class="l-form">
    <form v-on:submit.prevent="onSubmit" class="form" v-if="!totp">
      <h1 class="form__title">Welcome Back :)</h1>
      <p class="error-message" v-if="error">Invalid Email/Password</p>
      <div class="form_div">
        <input
          type="text"
          class="form__input"
          placeholder=" "
          v-model="email"
        />
        <label for="" class="form__label">Email</label>
      </div>
      <div class="form_div">
        <input
          type="password"
          class="form__input"
          placeholder=" "
          v-model="password"
        />
        <label for="" class="form__label">Password</label>
      </div>
      <input type="submit" class="form__button" value="Sign In" />
    </form>
    <form v-on:submit.prevent="totp" class="form" v-if="totp">
      <h1 class="form__title">Enter TOTP</h1>
      <p class="error-message" v-if="error">Invalid TOTP</p>
      <div class="form_div">
        <input
          type="text"
          class="form__input"
          placeholder=" "
          v-model="email"
        />
        <label for="" class="form__label">Totp</label>
      </div>
      <input type="submit" class="form__button" value="Sign In" />
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: false,
      totp: false,
    };
  },

  methods: {
    onSubmit() {
      fetch("http://localhost/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.error = true;
          } else {
            this.error = false;
            localStorage.token = data.token;
            localStorage.id = data.id;
            this.$store.commit("changeName", data.firstName);
            this.$store.commit("setEmail", data.email);
            this.$store.commit("setGravatar", data.gravatar);
            this.$router.push("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      this.password = "";
      console.log(this.$store.state.email);
    },
  },
};
</script>

<style scoped>
.error-message {
  border: 1px solid red;
  padding: 10px;
  border-radius: 3px;
  color: red;
}
/*===== GOOGLE FONTS =====*/
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&display=swap");
/*===== VARIABLES CSS =====*/
:root {
  /*===== Colores =====*/
  --first-color: #1a73e8;
  --input-color: #80868b;
  --border-color: #dadce0;

  /*===== Fuente y tipografia =====*/
  --body-font: "Roboto", sans-serif;
  --normal-font-size: 1rem;
  --small-font-size: 0.75rem;
}

/*===== BASE =====*/
*,
::before,
::after {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 0;
  font-family: var(--body-font);
  font-size: var(--normal-font-size);
}
h1 {
  margin: 0;
}
.l-form {
  display: flex;
  justify-content: center;
  align-items: center;
}
.form {
  width: 360px;
  padding: 4rem 2rem;
  border-radius: 1rem;
  box-shadow: 0 10px 25px rgba(92, 99, 105, 0.2);
}
.form__title {
  font-weight: 500;
  margin-bottom: 3rem;
}
.form_div {
  position: relative;
  height: 48px;
  margin-bottom: 1.5rem;
}
.form__input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 1.5rem;
  border: 1px solid rgb(209, 214, 223);
  border-radius: 0.5rem;
  outline: none;
  padding: 1rem;
  background: none;
  z-index: 1;
}
.form__label {
  position: absolute;
  left: 1rem;
  top: 1rem;
  padding: 0 0.25rem;
  background-color: #fff;
  color: rgb(209, 214, 223);
  font-size: 1.5rem;
  transition: 0.3s;
}
.form__button {
  padding: 0.75rem 2rem;
  outline: none;
  border: none;
  background-color: blue;
  color: white;
  font-size: 1.5rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: 0.3s;
}
.form__button:hover {
  box-shadow: 0 10px 36px rgba(0, 0, 0, 0.15);
}
.form__input:focus + .form__label {
  top: -0.5rem;
  left: 0.8rem;
  color: blue;
  font-size: var(--small-font-size);
  font-weight: 500;
  z-index: 10;
}
.form__input:not(:placeholder-shown).form__input:not(:focus) + .form__label {
  top: -0.5rem;
  left: 0.8rem;
  color: blue;
  font-size: 1.5rem;
  font-weight: 500;
  z-index: 10;
}

.form__input:focus {
  border: 1.5px solid blue;
}
</style>
