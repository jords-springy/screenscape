<template>
  <div class="dashboard">
    <h1>User Dashboard</h1>
    <div v-if="user">
      <p><strong>First Name:</strong> {{ user.firstName }}</p>
      <p><strong>Last Name:</strong> {{ user.lastName }}</p>
      <p><strong>Email:</strong> {{ user.emailAdd }}</p>
      <p><strong>Age:</strong> {{ user.userAge }}</p>
      <p><strong>Gender:</strong> {{ user.gender }}</p>
      <p><strong>Role:</strong> {{ user.userRole }}</p>
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DashboardView',
  // Example usage in DashboardView.vue
  mounted() {
    const userID = this.$store.state.userID;
    if (userID) {
      this.$store.dispatch('fetchUser', userID)
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    } else {
      console.error('No userID found in state');
    }
  },



  computed: {
    user() {
      return this.$store.getters.getUser;  // Access user data from the getter
    }
  }
}
</script>
