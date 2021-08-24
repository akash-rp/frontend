<template>
  <div class="servers">
    <div class="servers__main">
      <h1 class="title">Servers</h1>
      <button class="title__button" @click="$router.push('/createServer')">
        Create Server
      </button>
    </div>
    <div class="servers__padding"></div>
    <div class="server__list">
      <div
        class="svr"
        v-for="server in servers"
        v-bind:key="server.name"
        @click="$router.push('/server/' + server.serverId)"
      >
        <img
          class="svr__image"
          :src="'/assets/providers/' + server.provider + '.svg'"
        />
        <p class="svr__name">{{ server.name }}</p>
        <p class="svr__ip">{{ server.ip }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: "",
      providerImg: "",
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.setServers();
  },

  methods: {
    setServers() {
      fetch("http://localhost/servers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.error = data.error;
            return;
          }
          this.$store.commit("setServers", data);
        })
        .catch((err) => (this.error = err));
    },
  },
  computed: {
    servers() {
      return this.$store.state.servers;
    },
  },
};
</script>

<style lang="scss" scoped>
.servers {
  padding: 2rem 5rem;

  &__padding {
    padding: 2rem;
  }

  &__main {
    display: flex;
  }
}

.title {
  font-size: 4rem;

  &__button {
    background-color: var(--color-primary);
    color: white;
    width: 12rem;
    margin-left: 2rem;
    border-radius: 5px;
    border: none;
    font-size: var(--font-size-primary);
    font-weight: 600;
    cursor: pointer;
  }
}

.create-server {
  background-color: var(--color-primary);
  display: grid;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  box-shadow: 5px 5px 5px #888888;
  flex-direction: column;
  cursor: pointer;

  &:hover {
    box-shadow: 2px 2px 2px #888888;
  }

  &__svg {
    width: 13rem;
    height: 13rem;
    align-self: end;
    fill: white;
  }

  &__p {
    color: white;
    font-size: var(--font-size-primary);
    margin-top: 0rem;
  }
}

.svr {
  display: flex;
  border-radius: 5px;
  cursor: pointer;
  background-color: white;
  box-shadow: 0px 1px 4px #888888;
  margin-bottom: 1rem;
  height: 6rem;
  width: 50%;

  & > * {
    padding: 1rem;
  }
  &__list {
    display: flex;
    flex-direction: column;
  }
  &__name {
    font-size: var(--font-size-header);
    text-transform: capitalize;
    display: flex;
    align-items: center;
  }

  &__prov {
  }

  &__ip {
    display: flex;
    align-items: center;
    font-size: var(--font-size-primary);
  }
  &__image {
    height: 5rem;
    display: flex;
    align-self: center;
    width: 5rem;
  }
}
</style>
