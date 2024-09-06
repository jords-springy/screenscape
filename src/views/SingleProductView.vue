<template>
  <div class="product">
    <SingleCard v-if="product" :product="product">
      <template #image>
        <img :src="product.prodUrl || 'https://example.com/default-image.jpg'" alt="Product Image" />
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
        <button @click="toggleProductDetails">
          {{ product.showDetails ? 'Show Less' : 'View More' }}
        </button>
      </template>
    </SingleCard>
  </div>
</template>

<script>
import SingleCard from "@/components/SingleCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "SingleProductView",
  components: {
    SingleCard,
  },
  computed: {
    ...mapGetters(['product'])
  },
  methods: {
    toggleProductDetails() {
      if (this.product) {
        this.product.showDetails = !this.product.showDetails;
      }
    },
  },
  mounted() {
    const prodID = this.$route.params.prodID;
    this.$store.dispatch('fetchProduct', prodID);
  }
};
</script>

<style scoped>
/* Custom styles if needed */
</style>
