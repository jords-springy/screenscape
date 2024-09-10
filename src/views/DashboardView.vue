<template>
  <div class="dashboard-view">
    <h2>User Dashboard</h2>

    <div v-if="user" class="user-info">
      <h3>Account Information</h3>
      <div class="info-group">
        <label for="firstName">First Name:</label>
        <input v-model="user.firstName" id="firstName" :disabled="!isEditing" />
      </div>
      <div class="info-group">
        <label for="lastName">Last Name:</label>
        <input v-model="user.lastName" id="lastName" :disabled="!isEditing" />
      </div>
      <div class="info-group">
        <label for="email">Email:</label>
        <input v-model="user.emailAdd" id="email" :disabled="!isEditing" />
      </div>
      <div class="info-group">
        <label for="age">Age:</label>
        <input v-model="user.userAge" id="age" type="number" :disabled="!isEditing" />
      </div>
      <div class="info-group">
        <label for="gender">Gender:</label>
        <input v-model="user.gender" id="gender" :disabled="!isEditing" />
      </div>
      <div class="info-group">
        <label for="role">Role:</label>
        <input v-model="user.userRole" id="role" :disabled="!isEditing" />
      </div>
      <div class="info-group">
        <label for="profilePicture">Profile Picture URL:</label>
        <input v-model="user.userProfile" id="profilePicture" :disabled="!isEditing" />
      </div>

      <button @click="enableEditing" v-if="!isEditing">Edit</button>
      <button @click="handleUpdate" v-if="isEditing">Update</button>
      <button @click="handleDelete">Delete Account</button>
    </div>

    <div v-else>
      <p>Loading user data...</p>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

export default {
  data() {
    return {
      isEditing: false,
      user: null,
    };
  },
  computed: {
    ...mapGetters(['userID', 'token']),
  },
  async created() {
    try {
      const userID = this.userID;
      if (!userID) throw new Error('User ID is missing.');
      this.user = await this.fetchUser(userID);
    } catch (error) {
      toast.error('Failed to fetch user data.');
      console.error('Error fetching user data:', error);
    }
  },
  methods: {
    ...mapActions(['fetchUser', 'updateUser', 'deleteUser']),
    
    enableEditing() {
      this.isEditing = true;
    },
    
    async handleUpdate() {
      try {
        await this.updateUser(this.user);
        toast.success('Account updated successfully!');
        this.isEditing = false;
      } catch (error) {
        toast.error('Failed to update account.');
      }
    },
    
    async handleDelete() {
      try {
        await this.deleteUser(this.user.userID);
        toast.success('Account deleted successfully!');
        this.$router.push('/login');
      } catch (error) {
        toast.error('Failed to delete account.');
      }
    }
  }
};
</script>


<style scoped>
.dashboard-view {
  padding: 2rem;
  max-width: 600px;
  margin: 0 auto;
}

.user-info {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

h3 {
  margin-bottom: 1rem;
}

.info-group {
  margin-bottom: 1rem;
}

.info-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #333;
}

.info-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

button {
  margin-right: 1rem;
  padding: 0.75rem;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #0056b3;
}
</style>
