<template>
  <form @click.prevent="" class="newServer">
    <h1 class="newServer_title">Create New Server</h1>
    <div class="newServer_ip">
      <label class="newServer_ip-label">Enter IP address</label>
      <input type="text" placeholder="0.0.0.0" class="newServer_ip-input" />
    </div>
    <div class="newServer_pass">
      <label class="newServer_pass-label">Enter root password</label>
      <input
        class="newServer_pass-input"
        type="password"
        placeholder="password"
      />
    </div>
    <button type="submit" class="newServer_submit">Submit</button>
  </form>
</template>

<script></script>

<style lang="scss" scoped>
.newServer {
  padding: 2rem 5rem;
  width: 100rem;
  box-shadow: 0px 1px 4px #888888;
  background-color: white;
  margin: 0 auto;
  margin-top: 2rem;
  &_title {
    font-size: 4rem;
  }
  &_ip {
    margin: 2rem 0;

    display: flex;
    flex-direction: column;
    &-label {
      font-size: 3rem;
    }
    &-input {
      font-size: 2rem;
    }
  }
  &_pass {
    display: flex;
    flex-direction: column;
    &-label {
      font-size: 3rem;
    }
    &-input {
      font-size: 2rem;
    }
  }
  &_submit {
    background-color: #15cd72;
    margin: 1rem 0;
    padding: 1rem;
    border: 1px solid #15cd72;
    border-radius: 5px;
    width: 10rem;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
  }
}
</style>
