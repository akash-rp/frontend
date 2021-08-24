<template>
  <div class="new_site main">
    <h2 class="new_site_title">Add Site</h2>
    <label for="name" class="site_label">Site Name (Must be unique)</label>
    <input
      id="name"
      type="text"
      class="site_input"
      placeholder="Unique site name"
      v-model="name"
    />
    <label for="domain" class="site_label">Domain Name</label>
    <input
      id="domain"
      type="text"
      class="site_input"
      placeholder="eg: "
      v-model="domain"
    />
    <label for="user" class="site_label">System User</label>
    <input
      id="user"
      type="text"
      class="site_input"
      placeholder="System User"
      v-model="user"
    />
    <label for="php" class="site_label">PHP version</label>
    <select name="php" id="php" v-model="php" class="site_input">
      <option value="lsphp72">PHP 7.2</option>
      <option value="lsphp73">PHP 7.3</option>
      <option value="lsphp74">PHP 7.4</option>
      <option value="lsphp80">PHP 8.0</option>
    </select>
    <hr class="line_break" />
    <h2 class="wordpress_title">Wordpress Details</h2>
    <label for="title" class="site_label">Wordpress Site Title</label>
    <input
      id="title"
      type="text"
      class="site_input"
      placeholder="Eg: My Site"
      v-model="title"
    />
    <label for="admin" class="site_label">Admin Username</label>
    <input
      id="admin"
      type="text"
      class="site_input"
      placeholder="Wordpress admin username"
      v-model="admin"
    />
    <label for="email" class="site_label">Admin Email</label>
    <input
      id="email"
      type="email"
      class="site_input"
      placeholder="Wordpress admin email"
      v-model="email"
    />
    <label for="password" class="site_label">Admin Password</label>
    <input
      id="password"
      type="password"
      class="site_input"
      placeholder="Wordpress admin password"
      v-model="password"
    />
    <button class="submit" @click="addSite">Submit</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      domain: "",
      user: "",
      php: "lsphp74",
      title: "",
      admin: "",
      email: "",
      password: "",
    };
  },
  methods: {
    addSite() {
      fetch("http://localhost/addsite/" + this.$route.params.serverid, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          appName: this.name,
          url: this.domain,
          userName: this.user,
          title: this.title,
          adminUser: this.admin,
          adminEmail: this.email,
          adminPassword: this.password,
          php: this.php,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("data", data);
          if (data) {
            this.$store.commit("setSites", data);
            this.$router.push(
              "/server/" + this.$route.params.serverid + "/sites"
            );
          }
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.new_site {
  background-color: white;
  height: max-content;
  padding: 1rem 2rem;
  margin-top: 1rem;
  border-radius: 3px;
  box-shadow: 0px 2px 5px 1px rgba(64, 60, 67, 0.16);
  margin-right: 2rem;
  &_title {
    font-size: var(--font-size-header);
  }
}
.site {
  &_label {
    display: block;
    font-size: var(--font-size-small-header);
    margin: 2rem 0rem 1rem 0;
  }

  &_input {
    width: 100%;
    padding: 1.1rem;
    border: 1px solid #ccc;
    border-radius: 2px;
  }
}

.line_break {
  margin: 2rem 0;
  border: 1px solid #ccc;
}

.wordpress_title {
  font-size: 2rem;
}

.submit {
  width: 100%;
  padding: 1rem;
  background-color: white;
  border: 1px solid green;
  outline: none;
  margin: 3rem 0;
  color: green;
  font-size: var(--font-size-primary);
  font-weight: bold;
  border-radius: 2px;
  font-family: inherit;
}
</style>
