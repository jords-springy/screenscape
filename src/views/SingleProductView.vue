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
          {{ product.showDetails ? 'Return to Products' : 'Go Back' }}
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
    ...mapGetters(['product', 'userID']) // Ensure you have userID in Vuex
  },
  methods: {
    toggleProducts() {
      this.$router.push({ name: 'products' });
    },
    async handleAddToOrders() {
      try {
        const response = await axios.post(`https://screenscape.onrender.com/user/${this.userID}/order`, {
          prodID: this.product.id, // Make sure to use the correct product ID
          quantity: 1, // You can add quantity management later
        });
        console.log("Product added to orders:", response.data);
        this.$toast.success("Product added to orders!");
      } catch (error) {
        console.error("Error adding to orders:", error);
        this.$toast.error("Failed to add product to orders.");
      }
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
  },
};
</script>

<style scoped>
.singleprod {
  height: 300px;
  width: 600px;
}

@media (max-width: 768px) {
  .singleprod {
    height: auto;
    max-width: 100%;
  }

  .single-card {
    padding: 15px;
    max-width: 100%;
  }

  h3 {
    font-size: 1.25rem;
  }

  p {
    font-size: 0.9rem;
  }

  button {
    padding: 8px;
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .singleprod {
    height: auto;
    max-width: 100%;
  }

  .single-card {
    padding: 10px;
    max-width: 100%;
  }

  h3 {
    font-size: 1rem;
  }

  p {
    font-size: 0.8rem;
  }

  button {
    padding: 6px;
    font-size: 0.8rem;
    display: block;
    width: 100%;
    margin-top: 10px;
  }
}
</style>
