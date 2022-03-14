<template>
  <nav class="flex flex-col pr-2 bg-indigo-800 text-white h-full fixed w-56">
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
      </ul>
    </div>

    <footer class="" v-show="showgravatar">
      <img :src="gravatarUrl" @load="showGravatar" alt="profile" class="" />
    </footer>
  </nav>
</template>

<style scoped>
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
</style>

<script>
export default {
  data() {
    return {
      gravatar: "",
      showgravatar: false,
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
  methods: {
    showGravatar() {
      this.showgravatar = true;
    },
  },
};
</script>

//
<style lang="scss" scoped>
// .nav {
//   display: flex;
//   background-color: var(--color-primary);
//   justify-content: space-between;
//   align-items: center;
//   color: white;
//   //   padding: 1rem 1rem;
//   height: 5rem;
//   padding: 0 5rem;

//   &__logo {
//     padding: 1rem;
//     font-size: var(--font-size-small-header);

//     a {
//       color: white;
//       text-decoration: none;
//     }
//   }

//   &__settings {
//     font-size: var(--font-size-small-header);
//     &-ul {
//       display: flex;
//       justify-content: space-between;
//       list-style: none;
//     }
//   }

//   &__search {
//     flex: 0 0 20%;
//     margin-right: auto;

//     &-input {
//       width: 90%;
//       height: 2.5rem;
//       border-radius: 3px;
//       margin-right: -2rem;
//       border: none;
//       padding: 1rem;

//       &:focus {
//         outline: none;
//       }
//     }

//     &-button {
//       background-color: white;
//       border: none;
//     }

//     &-icon {
//       height: 1.5rem;
//       width: 1.5rem;
//       background-color: white;
//       top: 0.2rem;
//       position: relative;
//     }
//   }

//   .item {
//     padding: 1rem;
//     cursor: pointer;
//   }

//   &__profile {
//     margin-right: 1rem;
//     &-image {
//       height: 3.5rem;
//       width: 3.5rem;
//       border-radius: 50%;
//     }
//   }
// }
//
</style>
