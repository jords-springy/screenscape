<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>First Name:</label>
        <input v-model="form.firstName" type="text" required />
      </div>
      <div>
        <label>Last Name:</label>
        <input v-model="form.lastName" type="text" required />
      </div>
      <div>
        <label>Age:</label>
        <input v-model="form.userAge" type="number" required />
      </div>
      <div>
        <label>Gender:</label>
        <select v-model="form.gender" required>
          <option value="" disabled>Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div>
        <label>Role:</label>
        <select v-model="form.userRole" required>
          <option value="" disabled>Select Role</option>
          <option value="User">User</option>
          <option value="Admin">Admin</option>
        </select>
      </div>
      <div>
        <label>Email:</label>
        <input v-model="form.emailAdd" type="email" required />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="form.userPass" type="password" required />
      </div>
      <div>
        <label>Profile Picture URL:</label>
        <input v-model="form.userProfile" type="text" />
      </div>
      <button type="submit">Submit</button>
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';

export default {
  setup() {
    const store = useStore();
    const form = ref({
      firstName: '',
      lastName: '',
      userAge: '',
      gender: '',
      userRole: '',
      emailAdd: '',
      userPass: '',
      userProfile: 'https://codjoelmayer.github.io/projectImages/images/profile-Image.png',
    });
    const errorMessage = ref('');

    const handleSubmit = async () => {
      try {
        errorMessage.value = ''; // Clear previous errors

        // Create FormData object for sending data
        const formData = new FormData();
        for (const key in form.value) {
          formData.append(key, form.value[key]);
        }

        // Dispatch the register action with formData
        await store.dispatch('register', formData);

        // Handle successful registration (e.g., redirect or show success message)
        // For example: router.push('/login'); or show a success message

      } catch (error) {
        // Handle registration error
        errorMessage.value = 'Registration failed. Please try again.';
        console.error('Registration failed:', error);
      }
    };

    return {
      form,
      handleSubmit,
      errorMessage
    };
  },
};
</script>

<style scoped>
.signup-view {
  text-align: center;
  margin-top: 20px;
}

table {
  margin: auto;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border: 1px solid #ddd;
}

button {
  margin-top: 10px;
}
</style>
