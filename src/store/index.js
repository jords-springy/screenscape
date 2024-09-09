import { createStore } from 'vuex';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();
const apiURL = 'https://screenscape.onrender.com/';

export default createStore({
  state: {
    products: [],
    product: null,
    users: [],
    adminproducts: [], // If used, otherwise remove
    adminproduct: null // If used, otherwise remove
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
        const response = await axios.get(`${apiURL}product/${prodID}`);
        commit('SET_PRODUCT', response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to fetch product');
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
        console.error('Error adding product:', error);
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
        console.error('Error deleting product:', error);
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
        console.error('Error updating product:', error);
        toast.error('Failed to update product');
      }
    },
    async fetchUsers({ commit }) {
      try {
        const response = await axios.get(`${apiURL}user`);
        commit('SET_USERS', response.data.result);
      } catch (error) {
        console.error('Error fetching users:', error);
        toast.error('Failed to fetch users');
      }
    },
    async register({ dispatch }, userData) {
      try {
        await axios.post(`${apiURL}user`, userData);
        toast.success('User registered successfully');
        dispatch('fetchUsers');
      } catch (error) {
        console.error('Error registering user:', error);
        toast.error('Failed to register user');
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
    }
  },
  getters: {
    products: state => state.products,
    product: state => state.product,
    adminproducts: state => state.adminproducts,
    adminproduct: state => state.adminproduct,
    users: state => state.users
  }
});
