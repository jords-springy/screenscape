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
  mounted() { // Get userID from Vuex
  const token = this.$store.getters.token;    // Get token from Vuex
  
  if (token) {
    console.log('Token are available:', token);  // Log for debugging
    this.$store.dispatch('fetchUser');  // Fetch the user data
  } else {
    console.error('Token is missing. Cannot fetch user data.');
  }
},

  computed: {
    user() {
      return this.$store.getters.getUser;  // Access user data from the getter
    }
  }
}
</script>
