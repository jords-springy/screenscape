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
    user:null,
    adminproducts: [], // If used, otherwise remove
    adminproduct: null, // If used, otherwise remove
    token: null,
    userID: null // Add token to state
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
      state.userID = userID;
    },
    SET_USER(state, user) {
      state.users = user;
    },
    SET_USER_DATA(state, userData) {
      state.user = userData;  // Store the fetched user data
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
    SET_TOKEN(state, token) { // Add the SET_TOKEN mutation
      state.token = token;
       // Optionally store the token in cookies
    }
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
    
        console.log('Fetching product with ID:', prodID); // Log the product ID
    
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
          headers: { 'Authorization': `Bearer ${cookies.get('authToken')}` }
        });
        toast.success('Product added successfully');
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Error adding product:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
        toast.error('Failed to add product');
      }
    },
    async deleteProduct({ dispatch }, prodID) {
      try {
        await axios.delete(`${apiURL}product/${prodID}`, {
          headers: { 'Authorization': `Bearer ${cookies.get('authToken')}` }
        });
        toast.success('Product deleted successfully');
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Error deleting product:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
        toast.error('Failed to delete product');
      }
    },
    async updateProduct({ dispatch }, { prodID, productData }) {
      try {
        await axios.put(`${apiURL}product/${prodID}`, productData, {
          headers: { 'Authorization': `Bearer ${cookies.get('authToken')}` }
        });
        toast.success('Product updated successfully');
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Error updating product:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
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
    async fetchUser({ commit }, userID) {
      try {
        const token = cookies.get('authToken');
        if (!token) {
          throw new Error('Authentication token is missing.');
        }
        const response = await axios.get(`${apiURL}user/${userID}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        commit('SET_USER', response.data);
        return response.data;
      } catch (error) {
        console.error('Failed to fetch user data:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status
        });
        toast.error('Failed to fetch user data.');
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
        console.error('Error registering user:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
    
        // Throw the error to be handled by the component
        throw error;
      }
    },
    // In your login action
    async login({ commit, dispatch }, { emailAdd, password }) {
      try {
        const response = await axios.post(`${apiURL}user/login`, { emailAdd, password }, {
          headers: { 'Content-Type': 'application/json' },
        });
  
        const { token } = response.data;
        if (token) {
          commit('SET_TOKEN', token);
          // Store the token in cookies or local storage
          cookies.set('authToken', token, '1d');
          toast.success('Login successful');
          
          // Fetch user data after successful login
          await dispatch('fetchCurrentUser');
        } else {
          throw new Error('No token received');
        }
      } catch (error) {
        console.error('Error logging in:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
        toast.error('Failed to login');
      }
    },
    
    
    

    
    async updateUser({ dispatch }, { userID, userData }) {
      try {
        await axios.put(`${apiURL}user/${userID}`, userData, {
          headers: { 'Authorization': `Bearer ${cookies.get('authToken')}` }
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
        await axios.delete(`${apiURL}user/${userID}`, {
          headers: { 'Authorization': `Bearer ${cookies.get('authToken')}` }
        });
        toast.success('User deleted successfully');
        dispatch('fetchUsers');
      } catch (error) {
        console.error('Error deleting user:', error);
        toast.error('Failed to delete user');
      }
    },
    async fetchCurrentUser({ commit, state }) {
      try {
        const token = state.token || cookies.get('authToken');
        if (!token) {
          throw new Error('Authentication token is missing.');
        }
        const response = await axios.get(`${apiURL}user/me`, {
          headers: { 
            'Authorization': `Bearer ${token}`, 
            'Content-Type': 'application/json' 
          }
        });
        commit('SET_USER_DATA', response.data);  // Commit the fetched user data
      } catch (error) {
        console.error('Error fetching user data:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers,
        });
        toast.error('Failed to fetch user data');
      }
    }
  
  
    
    
  
    
  },
  getters: {
    products: state => state.products,
    product: state => state.product,
    adminproducts: state => state.adminproducts,
    adminproduct: state => state.adminproduct,
    users: state => state.users,
      userID: state => state.userID,   // Ensure this is correctly retrieving the userID
      token: state => state.token,     // Ensure this is correctly retrieving the token
      getUser: state => state.user     // This retrieves the user data

    
    // Add getter for token
  }
})
