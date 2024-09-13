<template>
  <div class="product">
    <SingleCard v-if="product" :product="product" :showDetails="showDetails"
    @toggle-details="toggleProductDetails" @add-to-orders="handleAddToOrders">
      <template #image>
        <img :src="product.prodUrl || 'https://example.com/default-image.jpg'" alt="Product Image" class="singleprod"/>
      </template>

      <template #title>
        <h3>{{ product.prodName || 'No Name' }}</h3>
      </template>

      <template #description>
        <p><strong>Description:</strong> {{ product.prodDescription || 'No Description' }}</p>
        <p><strong>Features:</strong> {{ product.prodFeatures || 'No Features' }}</p>
        <p><strong>Sound:</strong> {{ product.prodSound || 'No Sound' }}</p>
        <p><strong>Package:</strong> {{ product.prodPackage || 'No Package' }}</p>
        <p><strong>Category:</strong> {{ product.category || 'No Category' }}</p>
        <p><strong>Quantity:</strong> {{ product.quantity || 0 }}</p>
        <p><strong>Price:</strong> R{{ product.amount || '0.00' }}</p>
      </template>

      <template #button>
        <button @click="toggleProducts">
          {{ product.showDetails ? 'Return to Products': 'Go back' }}
        </button>
        <button @click="addToOrders">Add to Orders</button>
      </template>
    </SingleCard>
  </div>
</template>

<script>
import SingleCard from "@/components/SingleCard.vue";
import { mapGetters } from "vuex";
import axios from "axios";

export default {
  name: "SingleProductView",
  components: {
    SingleCard,
  },
  computed: {
    ...mapGetters(['product'])
  },
  methods: {
  toggleProducts() {
    this.$router.push({ name: 'products' });
  },
  handleAddToOrders(product) {
      // Handle the logic to add the product to orders
      axios.post(`https://screenscape.onrender.com/user/${userID}/order`, {
        prodID: product.id, // Or however your API expects it
        quantity: 1, // You can add quantity management later
      })
      .then(response => {
        console.log("Product added to orders:", response.data);
      })
      .catch(error => {
        console.error("Error adding to orders:", error);
      });
    },
},
  mounted() {
  const prodID = this.$route.params.prodID;
  console.log('Mounted with product ID:', prodID); // Check if this is correct

  if (prodID) {
    this.$store.dispatch('fetchProduct', prodID)
      .catch(err => console.error('Dispatch failed:', err));
  } else {
    console.error('No valid product ID');
  }
}

};
</script>

<style scoped>
/* Custom styles if needed */
.singleprod{
  height: 300px;
  width:600px
}
/* Responsive Styles */
@media (max-width: 768px) {
  /* Adjust single product image and card layout for tablets */
  .singleprod {
    height: auto;
    max-width: 100%; /* Ensure the image fits within the container */
  }

  .single-card {
    padding: 15px;
    max-width: 100%;
  }

  h3 {
    font-size: 1.25rem; /* Slightly smaller title for tablets */
  }

  p {
    font-size: 0.9rem; /* Adjust font size for better readability */
  }

  button {
    padding: 8px;
    font-size: 0.9rem; /* Adjust button text size */
  }
}

@media (max-width: 480px) {
  /* Adjust single product image and card layout for mobile devices */
  .singleprod {
    height: auto;
    max-width: 100%;
  }

  .single-card {
    padding: 10px;
    max-width: 100%;
  }

  h3 {
    font-size: 1rem; /* Smaller title font size for mobile */
  }

  p {
    font-size: 0.8rem; /* Smaller description font size */
  }

  button {
    padding: 6px;
    font-size: 0.8rem; /* Smaller button text size */
    display: block;
    width: 100%; /* Make buttons full-width on mobile */
    margin-top: 10px; /* Add margin between buttons */
  }
}
</style>
