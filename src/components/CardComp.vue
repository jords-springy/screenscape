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

    <!-- Show details -->
    <div class="products-details" v-if="showDetails">
      <slot name="description">
        <p>{{ product.prodDescription || 'No Description' }}</p>
        <p><strong>Features:</strong> {{ product.prodFeatures || 'No Features' }}</p>
        <p><strong>Sound:</strong> {{ product.prodSound || 'No Sound' }}</p>
        <p><strong>Package:</strong> {{ product.prodPackage || 'No Package' }}</p>
        <p><strong>Category:</strong> {{ product.category || 'No Category' }}</p>
        <p><strong>Quantity:</strong> {{ product.quantity || 0 }}</p>
        <p><strong>Price:</strong> R{{ product.amount || '0.00' }}</p>
      </slot>
    </div>

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
      defaultImage: 'https://example.com/default-image.jpg'
    };
  },
  methods: {
    toggleProductDetails() {
      this.showDetails = !this.showDetails;
    }
  }
}
</script>

<style scoped>
.products-card {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  margin: 16px auto;
  padding: 16px;
}

.products-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #eaeaea;
}

.products-card h3 {
  font-size: 22px;
  margin: 16px 0;
  text-align: center;
  color: #333;
}

.products-details {
  padding: 16px 0;
}

.products-details p {
  margin: 8px 0;
  font-size: 14px;
  color: #555;
}

.products-details strong {
  color: #000;
}

.products-view-more-btn, .view-product-btn {
  display: inline-block;
  margin: 16px;
  padding: 10px 16px;
  background-color: black;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.products-view-more-btn:hover, .view-product-btn:hover {
  background-color: #950101;
}

.products-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

@media (max-width: 768px) {
  .products-card {
    max-width: 100%;
    margin: 16px;
  }

  .products-card img {
    height: 150px;
  }

  .products-card h3 {
    font-size: 18px;
  }

  .products-details p {
    font-size: 13px;
  }
}
</style>
