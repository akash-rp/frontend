<template>
  <nav class="nav flex-initial flex flex-col bg-blue-600 h-screen w-60">
    <div class="nav__logo h-20"></div>
    <div class="nav__optins flex-1">
      <router-link class="text-2xl text-white option" to="/servers/">Server</router-link>
      
      <router-link class="text-2xl text-white option" to="/servers/">Sites</router-link>

    </div>
    
    <div class="nav__profile" v-show="showgravatar">
      <img
        :src="gravatarUrl"
        @load="showGravatar"
        alt="profile"
        class="nav__profile-image"
      />
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
