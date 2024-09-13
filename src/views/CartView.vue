<template>
    <div class="cart-page">
      <h1>Your Cart</h1>
      <div v-if="!orders || orders.length === 0">No orders found</div>
  
      <!-- Display Orders -->
      <div v-else>
        <div v-for="order in orders" :key="order.orderID" class="order-item">
          <p>Product ID: {{ order.prodID }}</p>
          <button @click="deleteOrder(order.orderID)">Delete</button>
          <button @click="editOrder(order)">Edit</button>
        </div>
      </div>
    </div>
  </template>
  
  
  <script>
  import { mapActions, mapGetters } from 'vuex';
  
  export default {
    data() {
      return {
        newOrderProdID: '',
        editOrderID: null,
        editProdID: ''
      };
    },
    computed: {
      ...mapGetters(['orders']) // Fetch orders from Vuex store
    },
    methods: {
      ...mapActions(['fetchOrders', 'insertOrder', 'deleteOrder', 'updateOrderDetails']),
      
      async addOrder() {
        if (!this.newOrderProdID) {
          return alert('Please enter a product ID');
        }
        await this.insertOrder({ prodID: this.newOrderProdID });
        this.newOrderProdID = '';
        await this.fetchOrders(); // Refresh orders after inserting
      },
  
      async deleteOrder(orderID) {
        await this.deleteOrder(orderID);
        await this.fetchOrders(); // Refresh orders after deleting
      },
  
      editOrder(order) {
        this.editOrderID = order.orderID;
        this.editProdID = order.prodID;
      },
  
      async updateOrder() {
        if (!this.editProdID) {
          return alert('Please enter a product ID');
        }
        await this.updateOrderDetails({ orderID: this.editOrderID, prodID: this.editProdID });
        this.editOrderID = null;
        this.editProdID = '';
        await this.fetchOrders(); // Refresh orders after updating
      }
    },
    mounted() {
      this.fetchOrders(); // Load orders when component is mounted
    }
  };
  </script>
  <style scoped>
@media (max-width: 600px) {
  .order-item {
    padding: 10px;
  }

  button {
    padding: 8px 12px;
    font-size: 12px;
  }
}

@media (max-width: 400px) {
  .order-item {
    margin-bottom: 5px;
  }

  h1 {
    font-size: 20px;
    margin-bottom: 15px;
  }

  button {
    width: 100%;
    padding: 10px;
  }
}
</style>
  