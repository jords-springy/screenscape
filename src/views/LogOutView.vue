<template>
    <div class="logout-container">
      <div class="form-wrapper">
        <h1 class="form-title">Logout</h1>
        <p class="form-message">Are you sure you want to log out?</p>
        <button class="logout-button" @click="handleLogout">Logout</button>
        <button class="delete-account-button" @click="handleDeleteAccount">Delete Account</button>
      </div>
    </div>
  </template>
  
  <script>
  import { useStore } from 'vuex';
  import { useRouter } from 'vue-router';
  import { toast } from 'vue3-toastify';
  
  export default {
    name: 'LogOutView',
    setup() {
      const store = useStore();
      const router = useRouter();
      
      // Check if userID is available in the store and log it for debugging
      const userID = store.state.userID; 
      console.log('userID from store:', userID);  // Log userID to ensure it's being retrieved correctly
  
      const handleLogout = async () => {
        try {
          await store.dispatch('logoutUser'); // Dispatch the logoutUser action
          toast.success('Logged out successfully'); // Show success toast
          router.push('/login'); // Redirect to the login page after logout
        } catch (error) {
          console.error('Logout failed:', error);
          toast.error('Failed to log out'); // Show error toast
        }
      };
  
      const handleDeleteAccount = async () => {
        if (!userID) {
          console.log('No userID found in Vuex state'); // Additional logging for debugging
          toast.error('No userID found. Unable to delete account.');
          return;
        }
        try {
          await store.dispatch('deleteUser', userID); // Dispatch deleteUser action with userID
          toast.success('Account deleted successfully'); // Show success toast
          router.push('/'); // Redirect after account deletion
        } catch (error) {
          console.error('Failed to delete account:', error);
          toast.error('Failed to delete account'); // Show error toast
        }
      };
  
      return { handleLogout, handleDeleteAccount };
    }
  };
  </script>
  
  <style scoped>
  .logout-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
  }
  
  .form-wrapper {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  .form-title {
    font-size: 24px;
    font-weight: 600;
    margin-bottom: 16px;
  }
  
  .form-message {
    font-size: 16px;
    margin-bottom: 24px;
  }
  
  .logout-button, .delete-account-button {
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin: 5px;
  }
  
  .logout-button {
    background-color: #007bff;
  }
  
  .logout-button:hover {
    background-color: #0056b3;
  }
  
  .delete-account-button {
    background-color: #dc3545;
  }
  
  .delete-account-button:hover {
    background-color: #c82333;
  }

  /* Responsive Styles */
@media (max-width: 768px) {
  .form-wrapper {
    padding: 15px; /* Adjust padding for tablets */
  }

  .form-title {
    font-size: 20px; /* Adjust font size for tablets */
  }

  .form-message {
    font-size: 14px; /* Adjust font size for tablets */
  }

  .logout-button, .delete-account-button {
    font-size: 14px; /* Adjust font size for buttons on tablets */
    padding: 8px 16px; /* Adjust padding for buttons on tablets */
  }
}

@media (max-width: 480px) {
  .form-wrapper {
    padding: 10px; /* Reduce padding for mobile screens */
  }

  .form-title {
    font-size: 18px; /* Reduce font size for mobile screens */
  }

  .form-message {
    font-size: 12px; /* Reduce font size for mobile screens */
  }

  .logout-button, .delete-account-button {
    font-size: 12px; /* Reduce font size for buttons on mobile screens */
    padding: 6px 12px; /* Reduce padding for buttons on mobile screens */
  }
}
  </style>
  