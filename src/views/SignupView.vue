<template>
  <div class="signup-view">
    <form @submit.prevent="handleSubmit" class="signup-form">
      <h2>Register</h2>
      
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
        
      </select>
      <input v-model="form.emailAdd" type="email" placeholder="Email" required />
      <input v-model="form.userPass" type="password" placeholder="Password" required />
      <input v-model="form.userProfile" type="text" placeholder="Profile Picture URL" />

      <button type="submit">Register</button>
      <a href="/login">Already registered ? Go To Login</a>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';

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

        // Show success toast
        toast.success('Registration successful!');

        // Redirect to the login page
        this.$router.push('/login');
      } catch (error) {
        // Log the entire error object for debugging
        console.error('Error in handleSubmit:', error);

        // Safeguard: Handle different error scenarios
        let errorMessage = 'An unexpected error occurred.';

        if (error && typeof error === 'object') {
          if (error.response && error.response.data) {
            errorMessage = error.response.data.error || 'An error occurred during registration.';
          } else if (error.message) {
            errorMessage = error.message;
          }
        }

        // Show error toast
        toast.error(`Registration failed: ${errorMessage}`);
      }
    }
  }
};
</script>

<style scoped>

a{
  text-decoration-color: #950101;
  color:#950101;
}
.signup-view {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
  margin-top: 6rem;
}

.signup-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  width: 600px;
}

.signup-form h2 {
  margin-bottom: 1rem;
  font-size: 1.5rem;
  color: #333;
}

.signup-form .form-group {
  margin-bottom: 1rem;
}

.signup-form input,
.signup-form select {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  margin-bottom: 1rem;
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: black;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #950101;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .signup-form h2 {
    font-size: 1.25rem; /* Adjust font size for tablets */
  }

  .signup-form input,
  .signup-form select {
    padding: 0.5rem; /* Adjust padding for smaller screens */
    font-size: 0.9rem; /* Smaller font size for input fields */
  }

  button {
    padding: 0.5rem; /* Adjust padding for smaller screens */
    font-size: 0.9rem; /* Smaller font size for buttons */
  }
}

@media (max-width: 480px) {
  .signup-form h2 {
    font-size: 1.1rem; /* Smaller font size for mobile */
  }

  .signup-form input,
  .signup-form select {
    padding: 0.4rem; /* Adjust padding for mobile screens */
    font-size: 0.8rem; /* Smaller font size for input fields */
  }

  button {
    padding: 0.4rem; /* Adjust padding for mobile screens */
    font-size: 0.8rem; /* Smaller font size for buttons */
  }
}
</style>
