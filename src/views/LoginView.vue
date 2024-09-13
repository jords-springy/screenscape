<template>
    <div class="login-view">
      <form @submit.prevent="handleLogin" class="login-form">
        <h2>Login</h2>
        
        <div class="form-group">
          <label for="email">Email</label>
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="Enter your email"
            required
          />
        </div>
  
        <div class="form-group">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model="password"
            placeholder="Enter your password"
            required
          />
        </div>
  
        <button type="submit">Login</button>
      </form>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  import { toast } from 'vue3-toastify';
  
  export default {
    data() {
      return {
        email: '',
        password: '',
      };
    },
    methods: {
      ...mapActions(['login']),
      async handleLogin() {
        try {
          await this.login({ emailAdd: this.email, password: this.password });
          toast.success('Login successful!');
          this.$router.push('/dashboard'); // Redirect after login
        } catch (error) {
          toast.error(error.response?.data?.message || 'Login failed');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f0f0f0;
  }
  
  .login-form {
    background: #fff;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 600px;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  .form-group input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    width: 100%;
    padding: 0.75rem;
    background-color: black;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #950101;
  }

  /* Responsive Styles */
@media (max-width: 768px) {
  .login-form {
    padding: 1.5rem; /* Adjust padding for tablets */
  }

  .form-group input {
    padding: 0.5rem; /* Adjust padding for input fields on tablets */
  }

  button {
    padding: 0.5rem; /* Adjust padding for buttons on tablets */
    font-size: 0.9rem; /* Adjust font size for buttons on tablets */
  }
}

@media (max-width: 480px) {
  .login-form {
    padding: 1rem; /* Reduce padding for mobile screens */
  }

  .form-group input {
    padding: 0.4rem; /* Reduce padding for input fields on mobile screens */
  }

  button {
    padding: 0.4rem; /* Reduce padding for buttons on mobile screens */
    font-size: 0.8rem; /* Reduce font size for buttons on mobile screens */
  }
}
  </style>
  