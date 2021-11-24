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

<style lang="scss" scoped>
.account {
  width: 50rem;
  padding: 5rem;
  margin: 5rem auto;
  background-color: white;
  box-shadow: 0 10px 25px rgba(92, 99, 105, 0.2);
  font-family: sans-serif;
  font-size: var(--font-size-primary);

  border-radius: 10px;

  &__form {
    &-email {
      width: 100%;
      height: 3rem;
      padding: 2rem 2rem;
      border-radius: 5px;
      border: 2px solid #ebebeb;
      font-family: sans-serif;
      font-size: var(--font-size-primary);
      &:focus {
        outline: none;
        border: 2px solid var(--color-primary);
      }
    }

    &-firstname {
      width: 48%;
      height: 3rem;
      padding: 2rem 2rem;
      border-radius: 5px;
      margin-right: 14px;
      border: 2px solid #ebebeb;
      font-family: sans-serif;
      font-size: var(--font-size-primary);
      &:focus {
        outline: none;
        border: 2px solid var(--color-primary);
      }
    }

    &-lastname {
      width: 48%;
      height: 3rem;
      padding: 2rem 2rem;
      border-radius: 5px;
      border: 2px solid #ebebeb;
      font-family: sans-serif;
      font-size: var(--font-size-primary);
      &:focus {
        outline: none;
        border: 2px solid var(--color-primary);
      }
    }

    &-password {
      width: 100%;
      height: 3rem;
      padding: 2rem 2rem;
      border-radius: 5px;
      border: 2px solid #ebebeb;
      font-family: sans-serif;
      font-size: var(--font-size-primary);

      &:focus {
        outline: none;
        border: 2px solid var(--color-primary);
      }
    }

    &-submit {
      background-color: var(--color-primary);
      width: 35rem;
      height: 4rem;
      border-radius: 5px;
      border: none;
      color: white;
      font-size: var(--font-size-small-header);
    }
  }
}

.form {
  &__group {
    padding: 1rem;
  }
}
</style>
