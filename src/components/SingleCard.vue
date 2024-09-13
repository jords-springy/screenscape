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

    <!-- Show description and additional details -->
    <div class="products-details" v-if="showDetails">
      <slot name="description">
        <p><strong>Description:</strong> {{ product.prodDescription || 'No Description' }}</p>
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
      <button class="products-return-btn" @click="$emit('return-to-products')">
        Return to Products
      </button>
      <button class="products-cart-btn" @click="$emit('add-to-cart')">
        Add To Cart
      </button>
      <button class="add-to-orders" @click="$emit('add-to-orders')">Add To Order</button> 
      </slot>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showDetails: true,
      defaultImage: 'https://example.com/default-image.jpg'
    };
  },
  methods: {
    toggleProductDetails() {
      this.showDetails = !this.showDetails;
    },
    AddToOrders() {
      this.$emit('add-to-orders', this.product)
    }
  }
}
</script>

  <style scoped>
  .products-card {
    width: 100%;
    max-width: 500px;
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
    height: 250px;
    object-fit: cover;
    border-bottom: 1px solid #eaeaea;
  }
  
  .products-card h3 {
    font-size: 24px;
    margin: 16px 0;
    text-align: center;
    color: #333;
  }
  
  .products-details {
    padding: 16px 0;
  }
  
  .products-details p {
    margin: 8px 0;
    font-size: 15px;
    color: #555;
  }
  
  .products-details strong {
    color: #000;
  }
  
  .products-view-more-btn {
    display: inline-block;
    margin: 16px 0;
    padding: 10px 16px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .products-view-more-btn:hover {
    background-color: #0056b3;
  }
  
  .products-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
  
  .oneProd-container {
    margin-top: 16px;
  }
  
  @media (max-width: 768px) {
    .products-card {
      max-width: 100%;
      margin: 16px;
    }
  
    .products-card img {
      height: 200px;
    }
  
    .products-card h3 {
      font-size: 20px;
    }
  
    .products-details p {
      font-size: 14px;
    }
  }
  </style>
  