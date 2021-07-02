<template>
  <nav class="nav">
    <div class="nav__logo"><a href="#">Hosting</a></div>
    <div class="nav__settings">
      <ul class="nav__settings-ul">
        <li class="nav__setting-item-1 item">Server</li>
        <li class="nav__setting-item-2 item">App</li>
      </ul>
    </div>
    <div class="nav__search">
      <form v-on:submit.prevent="">
        <input
          type="text"
          class="nav__search-input"
          placeholder="Search Server/Application"
        />
        <button class="nav__search-button">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 129 129"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            enable-background="new 0 0 129 129"
            class="nav__search-icon"
          >
            <g>
              <path
                d="M51.6,96.7c11,0,21-3.9,28.8-10.5l35,35c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8l-35-35   c6.5-7.8,10.5-17.9,10.5-28.8c0-24.9-20.2-45.1-45.1-45.1C26.8,6.5,6.5,26.8,6.5,51.6C6.5,76.5,26.8,96.7,51.6,96.7z M51.6,14.7   c20.4,0,36.9,16.6,36.9,36.9C88.5,72,72,88.5,51.6,88.5c-20.4,0-36.9-16.6-36.9-36.9C14.7,31.3,31.3,14.7,51.6,14.7z"
              />
            </g>
          </svg>
        </button>
      </form>
    </div>
    <div class="nav__profile">
      <img :src="gravatarUrl" alt="profile" class="nav__profile-image" />
    </div>
  </nav>
</template>

<style scoped>
.logo {
  font-size: 20px;
  float: left;
}
.header {
  padding: 10px;
  border-bottom: 1px solid #7e7f81;
}
.nav-item-right {
  float: right;
}
</style>

<script>
export default {
  data() {
    return {
      gravatar: "",
    };
  },
  computed: {
    gravatarUrl() {
      return this.gravatar;
    },
  },
  async created() {
    if (localStorage.id) {
      fetch("http://localhost/userdetails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: localStorage.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          this.$store.commit("changeName", data.firstName);
          this.$store.commit("setEmail", data.email);
          this.gravatar = data.gravatar;
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>
