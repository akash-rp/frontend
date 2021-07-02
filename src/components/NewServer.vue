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

<style></style>
