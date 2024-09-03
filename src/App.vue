<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link>
  </nav>
  <router-view/> -->
  <nav-bar-comp/>
  <footer-comp/>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavBarComp from './components/NavBarComp.vue';
import FooterComp from './components/FooterComp.vue';

export default {
  components:{
    NavBarComp,
    FooterComp,
  },
  mounted() {
    AOS.init();
  }
}
</script>

<style>
@import url('./assets/css/style.css');
@import url(http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900);
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
} */
</style>