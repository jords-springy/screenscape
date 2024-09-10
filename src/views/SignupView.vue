<template>
  <form @submit.prevent="handleSubmit">
    <!-- Input fields for form data -->
    <input v-model="form.firstName" type="text" placeholder="First Name" required />
    <input v-model="form.lastName" type="text" placeholder="Last Name" required />
    <input v-model="form.userAge" type="number" placeholder="Age" required />
    <select v-model="form.gender" required>
      <option value="male">Male</option>
      <option value="female">Female</option>
      <!-- Add more options if needed -->
    </select>
    <select v-model="form.userRole" required>
      <option value="user">User</option>
      <option value="admin">Admin</option>
    </select>
    <input v-model="form.emailAdd" type="email" placeholder="Email" required />
    <input v-model="form.userPass" type="password" placeholder="Password" required />
    <input v-model="form.userProfile" type="text" placeholder="Profile Picture URL" />

    <button type="submit">Register</button>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        userAge: '',
        gender: '',
        userRole: '',
        emailAdd: '',
        userPass: '',
        userProfile: '', // Handle as URL or placeholder if no file upload
      },
    };
  },
  methods: {
    ...mapActions(['register']),
    
    async handleSubmit() {
  try {
    // Attempt to register the user
    await this.register(this.form);

    // Ensure $toast is available
    if (this.$toast && typeof this.$toast.success === 'function') {
      this.$toast.success('Registration successful!');
    } else {
      console.warn('Toast notifications are not initialized.');
    }

    // Redirect to the login page
    if (this.$router && typeof this.$router.push === 'function') {
      this.$router.push('/login');
    } else {
      console.warn('Router is not initialized.');
    }
  } catch (error) {
    // Log the entire error object for debugging
    console.error('Error in handleSubmit:', error);

    // Safeguard: Handle different error scenarios
    let errorMessage = 'An unexpected error occurred.';

    // Check if error is defined and is an object
    if (error && typeof error === 'object') {
      if (error.response) {
        // Check if error.response.data exists and is an object
        if (error.response.data && typeof error.response.data === 'object') {
          // Safely extract the error message
          errorMessage = error.response.data.error || 'An error occurred during registration.';
        } else {
          errorMessage = 'Error response data is not properly formatted.';
        }
      } else if (error.message) {
        // Use the error message if available
        errorMessage = error.message;
      }
    }

    // Ensure $toast is available
    if (this.$toast && typeof this.$toast.error === 'function') {
      this.$toast.error(`Registration failed: ${errorMessage}`);
    } else {
      console.warn('Toast notifications are not initialized.');
    }
  }
}
  }
}
</script>
