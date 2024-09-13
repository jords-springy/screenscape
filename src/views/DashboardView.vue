<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <div v-if="user" class="user-info">
      <img :src="user.userProfile" alt="Profile Picture" class="profile-picture">
      <div class="user-details">
        <h2>Welcome, {{ user.firstName }} {{ user.lastName }}</h2>
        <p><strong>Email:</strong> {{ user.emailAdd }}</p>
        <p><strong>Age:</strong> {{ user.userAge }}</p>
        <p><strong>Gender:</strong> {{ user.gender }}</p>
        <p><strong>Role:</strong> {{ user.userRole }}</p>
        <button @click="fetchOrders" class="fetch-orders-button">Fetch Orders</button>
      </div>
      <div v-if="orders.length" class="orders">
        <h2>Orders:</h2>
        <ul>
          <li v-for="order in orders" :key="order.orderID">{{ order.details }}</li>
        </ul>
      </div>
    </div>
    <div v-else class="loading">
      <p>Loading user data...</p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.getters.user;  // Use the getter to access user data
    },
    userID() {
      return this.$store.state.userID;  // Get the userID from the Vuex state
    },
    orders() {
      return this.$store.getters.orders;
    }
  },
  async mounted() {
    try {
      if (this.userID) {
        await this.$store.dispatch('fetchUser', this.userID);
      } else {
        console.error('No userID found in state');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  },
  methods: {
    async fetchOrders() {
      try {
        await this.$store.dispatch('fetchOrders');
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    }
  }
}
</script>

<style scoped>
.dashboard {
  font-family: Arial, sans-serif;
  padding: 20px;
  text-align: center;
  margin-top: 6rem;
}

.user-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 70vh;
}

.profile-picture {
  border-radius: 50%;
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-bottom: 20px;
}

.user-details {
  text-align: center;
  margin-bottom: 20px;
}

.user-details h2 {
  margin: 10px 0;
}

.user-details p {
  margin: 5px 0;
}

.fetch-orders-button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  font-size: 16px;
}

.fetch-orders-button:hover {
  background-color: #0056b3;
}

.orders {
  margin-top: 20px;
}

.orders ul {
  list-style-type: none;
  padding: 0;
}

.orders li {
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 10px;
  margin: 5px 0;
}

.loading {
  text-align: center;
  font-size: 18px;
  color: #666;
}
</style>
