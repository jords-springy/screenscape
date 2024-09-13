import { createStore } from 'vuex';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();
const apiURL = 'https://screenscape.onrender.com/';

export default createStore({
  state: {
    products: null,
    product: null,
    users: null,
    adminproducts: [],
    adminproduct: null,
    token: cookies.get('authToken') || null, // Initialize token from cookies
    userID: null,
    userData: null,
    orders: [],
    userRole: '',
    orderMessage: '',
  },
  mutations: {
    SET_PRODUCTS(state, products) {
      state.products = products;
    },
    SET_ADMINPRODUCTS(state, adminproducts) {
      state.adminproducts = adminproducts;
    },
    SET_PRODUCT(state, product) {
      state.product = product;
    },
    SET_ADMINPRODUCT(state, adminproduct) {
      state.adminproduct = adminproduct;
    },
    SET_USERS(state, users) {
      state.users = users;
    },
    SET_USER_ID(state, userID) {
      console.log('Setting userID in mutation:', userID);
      state.userID = userID;
    },
    SET_USER(state, user) {
      console.log('Setting user data in mutation:', user);
      state.userData = user;  // Ensure this matches the state property used in the component
    },
    ADD_USER(state, user) {
      state.users.push(user);
    },
    UPDATE_USER(state, updatedUser) {
      const index = state.users.findIndex(user => user.userID === updatedUser.userID);
      if (index !== -1) {
        state.users.splice(index, 1, updatedUser);
      }
    },
    DELETE_USER(state, userID) {
      state.users = state.users.filter(user => user.userID !== userID);
    },
    SET_TOKEN(state, token) {
      state.token = token;
      cookies.set('authToken', token, '1d');
    },
    CLEAR_TOKEN(state) {
      state.token = null;
      cookies.remove('authToken');
    },
    SET_ORDERS(state, orders) {
      state.orders = orders;
    },
    setUserRole(state, role) {
      state.userRole = role;
    },
    setOrderSuccess(state, message) {
      state.orderMessage = message; // Store the success message if needed
    },
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get(`${apiURL}product`);
        commit('SET_PRODUCTS', response.data.result);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      }
    },
    async getProducts({ commit }) {
      try {
        const response = await axios.get(`${apiURL}product`);
        commit('SET_ADMINPRODUCTS', response.data.result);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to fetch products');
      }
    },
    async fetchProduct({ commit }, prodID) {
      try {
        if (!prodID) {
          throw new Error('Invalid Product ID');
        }
        console.log('Fetching product with ID:', prodID);
        const response = await axios.get(`${apiURL}product/${prodID}`);
        commit('SET_PRODUCT', response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to fetch product. Please try again later.');
      }
    },
    async getProduct({ commit }, prodID) {
      try {
        const response = await axios.get(`${apiURL}product/${prodID}`);
        commit('SET_ADMINPRODUCT', response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to fetch product');
      }
    },
    async insertProduct({ dispatch }, productData) {
      try {
        await axios.post(`${apiURL}product`, productData, {
          headers: { 'Authorization': `Bearer ${this.state.token}` }
        });
        toast.success('Product added successfully');
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Error adding product:', error);
        toast.error('Failed to add product');
      }
    },
    async deleteProduct({ dispatch }, prodID) {
      try {
        await axios.delete(`${apiURL}product/${prodID}`, {
          headers: { 'Authorization': `Bearer ${this.state.token}` }
        });
        toast.success('Product deleted successfully');
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Failed to delete product');
      }
    },
    async updateProduct({ dispatch }, { prodID, productData }) {
      try {
        await axios.put(`${apiURL}product/${prodID}`, productData, {
          headers: { 'Authorization': `Bearer ${this.state.token}` }
        });
        toast.success('Product updated successfully');
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
      }
    },
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get(`${apiURL}user`);
        commit('SET_USERS', response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      }
    },
    async fetchUser({ commit, state }, userID) {
      try {
        console.log('Fetching user with ID:', userID);
        const response = await axios.get(`${apiURL}user/${userID}`, {
          headers: { 'Authorization': `Bearer ${state.token}` }
        });
        console.log('Fetched user data:', response.data);
        commit('SET_USER', response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        throw error;
      }
    },
    async register({ commit, dispatch }, userData) {
      try {
        const response = await axios.post(`${apiURL}user/register`, userData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const { token } = response.data;
        if (token) {
          commit('SET_TOKEN', token);
        }
        toast.success('User registered successfully');
        dispatch('fetchUsers');
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('Failed to register user');
        throw error;
      }
    },
    async login({ commit, dispatch }, { emailAdd, password }) {
      try {
        const response = await axios.post(`${apiURL}user/login`, { emailAdd, password });
        const { token, userID } = response.data;
        if (token) {
          commit('SET_TOKEN', token);
          commit('SET_USER_ID', userID);
          commit('setUserRole', response.data.role);  // Set userID in state
          cookies.set('authToken', token, '1d');
          // Optionally, you can call fetchUser here, but ensure it is updated to handle missing userID gracefully
        }
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },
    async updateUser({ dispatch }, { userID, userData }) {
      try {
        await axios.put(`${apiURL}user/${userID}`, userData, {
          headers: { 'Authorization': `Bearer ${this.state.token}` }
        });
        toast.success('User updated successfully');
        dispatch('fetchUsers');
      } catch (error) {
        console.error('Error updating user:', error);
        toast.error('Failed to update user');
      }
    },
    async deleteUser({ dispatch }, userID) {
      try {
        if (!userID) throw new Error('No userID provided');
        await axios.delete(`${apiURL}user/${userID}`, {
          headers: { 'Authorization': `Bearer ${this.state.token}` }
        });
        toast.success('User deleted successfully');
        dispatch('fetchUsers'); // Optionally refetch users after deleting
      } catch (error) {
        console.error('Error deleting user:', error.response ? error.response.data : error.message);
        toast.error('Failed to delete user');
      }
    },
    
    async fetchOrders({ commit, state }) {
      try {
        const token = cookies.get('authToken') || state.token;
        if (!token) {
          throw new Error('Authentication token is missing.');
        }
        const response = await axios.get(`${apiURL}user/${state.userID}/order`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        commit('SET_ORDERS', response.data || []);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders');
      }
    },
    async insertOrder({ commit }, { userID, prodID }) {
      try {
        const response = await fetch(`https://yourapiurl.com/user/${userID}/order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${store.state.token}`, // Include auth token if required
          },
          body: JSON.stringify({ prodID })
        });
  
        const data = await response.json();
        if (response.ok) {
          commit('setOrderSuccess', data.message); // Commit success message or data
          alert('Order was inserted successfully!');
        } else {
          alert(`Error: ${data.message}`);
        }
      } catch (error) {
        console.error('Error inserting order:', error.message);
        alert(`Error: ${error.message}`);
      }
    },

    async logoutUser({ commit }) {
      try {
        await axios.post(`${apiURL}user/logout`, {}, {
          headers: { 'Authorization': `Bearer ${this.state.token}` }
        });
        commit('CLEAR_TOKEN');
        toast.success('Logged out successfully');
      } catch (error) {
        console.error('Error logging out:', error);
        toast.error('Failed to log out');
      }
    }
  },
  getters: {
    products: state => state.products,
    product: state => state.product,
    adminproducts: state => state.adminproducts,
    adminproduct: state => state.adminproduct,
    users: state => state.users,
    userID: state => state.userID,
    token: state => state.token,
    userData: state => state.userData,
    orders: state => state.orders,
    user: state => state.userData  // Ensure this getter matches the state property
  }
});
