<template>
    <div class="products-card">
      <!-- Slot for image -->
      <slot name="image">
        <img :src="product.prodUrl || defaultImage" :alt="product.prodName || 'No Name'" />
      </slot>
  
      <!-- Slot for title -->
      <slot name="title">
        <h3>{{ product.prodName || 'No Name' }}</h3>
      </slot>
  
      <!-- Show description and price only if `showDetails` is true -->
      <slot name="description" v-if="showDetails">
        <p>{{ product.prodDescription || 'No Description' }}</p>
        <p>Price: R{{ product.amount || '0.00' }}</p>
      </slot>
  
      <!-- Slot for buttons -->
      <slot name="button">
        <button class="products-view-more-btn" @click="toggleProductDetails">
          {{ showDetails ? 'Show Less' : 'View More' }}
        </button>

        <router-link :to="`product/${product.prodID}`">
            <button class="view-product-btn">
                View Product
            </button>
        </router-link>

      </slot>
      <slot name="oneProd">

      </slot>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        default: () => ({})
      }
    },
    data() {
      return {
        showDetails: false,
        defaultImage: 'https://example.com/default-image.jpg' // Replace with your default image URL
      };
    },
    methods: {
      toggleProductDetails() {
        this.showDetails = !this.showDetails;
      }
    }
  }
  </script>