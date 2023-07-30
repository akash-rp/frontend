<template>
  <nav
    class="flex flex-col pr-2 bg-indigo-800 text-white h-full fixed w-58 flex flex-column justify-between"
  >
    <div>
      <header class="p-4 mb-4">
        <h1>HOSTING</h1>
      </header>
      <div class="">
        <ul class="list-none m-0">
          <li>
            <router-link class="nav-option p-ripple" to="/servers" v-ripple>
              <span class="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
                  />
                </svg>
              </span>
              Servers
            </router-link>
          </li>
          <li>
            <router-link class="nav-option p-ripple mt-2" to="/sites" v-ripple>
              <span class="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </span>
              Sites
            </router-link>
          </li>
          <li>
            <router-link
              class="nav-option p-ripple mt-2"
              to="/dns-management"
              v-ripple
            >
              <span class="mr-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                  />
                </svg>
              </span>
              DNS Management
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <footer
      class=""
      @click="toggle"
      aria-haspopup="true"
      aria-controls="profile_menu"
    >
      <Menu
        id="profile_menu"
        ref="menu"
        :model="profileItems"
        :popup="true"
        class="min-w-0 ml-8"
      />
      <div
        class="flex flex-row items-center py-2 px-5 hover:bg-indigo-900 rounded ml-2 my-2 cursor-pointer"
      >
        <img
          :src="gravatarUrl"
          @load="showGravatar"
          alt="profile"
          class="rounded-full w-10 h-10"
        />
        <p class="ml-2">
          {{
            this.$store.state.user.identity.traits.name.first +
            " " +
            this.$store.state.user.identity.traits.name.last
          }}
        </p>
      </div>
    </footer>
  </nav>
</template>

<style lang="scss">
/* .logo {
  font-size: 20px;
  float: left;
}
.header {
  padding: 10px;
  border-bottom: 1px solid #7e7f81;
}
.nav-item-right {
  float: right;
} */
.p-menu .p-submenu-header {
  padding: 0 !important;
}
.logout {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' class='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor' stroke-width='2'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1' /%3E%3C/svg%3E");
}
</style>

<script>
import Menu from "primevue/menu";

export default {
  data() {
    return {
      gravatar: "",
      profileItems: [
        {
          items: [
            {
              label: "Logout",
              icon: "pi pi-sign-out",
              command: () => {
                this.logout();
              },
            },
            {
              label: "Settings",
              icon: "pi pi-cog",
              command: () => {
                this.$router.push("/settings");
              },
            },
          ],
        },
      ],
    };
  },
  computed: {
    gravatarUrl() {
      return this.gravatar;
    },
  },
  created() {
    // console.log(this.$store.state.user);
    if (this.$store.state.user) {
      console.log(this.$store.state.user.identity);
      let hash = MD5.generate(this.$store.state.user.identity.traits.email);
      this.gravatar = "https://www.gravatar.com/avatar/" + hash;
    }
  },
  methods: {
    toggle(event) {
      this.$refs.menu.toggle(event);
    },
    logout() {
      console.log("logging out");
      this.$axios
        .get("auth/flow/logout")
        .then((res) => {
          this.$axios
            .get("auth/logout?token="+res.data.logout_token)
            .then(() => {
              this.$store.state.user = undefined;
              this.$router.push("/login");
            })
            .catch(() => {
              this.$toast.error("Something went wrong");
            });
        })
        .catch(() => {
          this.$toast.error("Something went wrong");
        });
    },
  },
  components: { Menu },
};
</script>
