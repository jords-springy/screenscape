<template>
  <div>
    <SpinnerComp :isLoading="isLoading" />
    <div v-if="!isLoading">
      <nav-bar-comp/>
      <footer-comp/>
      <!-- Display your products here -->
      <div v-if="products.length">
        <!-- Product display logic here -->
      </div>
  
    </div>
  </div>
</template>

<script>
import AOS from 'aos';
import 'aos/dist/aos.css';
import NavBarComp from './components/NavBarComp.vue';
import FooterComp from './components/FooterComp.vue';
import SpinnerComp from './components/SpinnerComp.vue';
import axios from 'axios';


export default {
  components: {
    NavBarComp,
    FooterComp,
    SpinnerComp,

  },
  data() {
    return {
      isLoading: true,
      products: []  // Array to hold the fetched products
    };
  },
  mounted() {
    AOS.init();
    this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      console.log('Fetching products...');
      try {
        const response = await axios.get('https://screenscape.onrender.com/product');
        this.products = response.data;
        console.log('Products fetched successfully:', this.products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        this.isLoading = false;  // Ensure loading state is turned off
        console.log('Loading state updated to:', this.isLoading);
      }
    }
  }
}
</script>


<style>
@import url('./assets/css/style.css');
@import url('https://fonts.googleapis.com/css?family=Roboto');
</style>