<template>
  <div id="app">
    <img alt="logo" src="./assets/mindojo-full@2x.png">
<!-- TODO PD1-4590 Add routing to the front-end. -->
    <div v-if="isLoggedIn">
      <Home></Home>
    </div>
    <div v-else>
      <Login></Login>
    </div>

  </div>
</template>

<script>

import Home from '@/views/Home';
import Login from '@/views/Login';

export default {
  name: 'App',
  components: {
    Login,
    Home,
  },
  computed: {
    // TODO	PD1-4591 Implement token refresh in the admin panel
    isLoggedIn: function () {
      return localStorage.getItem('token') != null;
    }
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
