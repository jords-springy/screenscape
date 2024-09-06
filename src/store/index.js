import { createStore } from 'vuex';
import axios from 'axios';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from '@/router';
import { useCookies } from 'vue3-cookies';

const { cookies } = useCookies();
const apiURL = 'https://screenscape.onrender.com/';

export default createStore({
  state: {
    products: [],
    product: null
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
  },
  actions: {
    async fetchProducts({ commit }) {
      try {
        const response = await axios.get('https://screenscape.onrender.com/product');
        commit('SET_PRODUCTS', response.data.result);
      } catch (error) {
        console.error('Error fetching products:', error);
        vue3Toastify.toast.error('Failed to fetch products');
      }
    },
    async getProducts({ commit }) {
      try {
        const response = await axios.get('https://screenscape.onrender.com/product');
        commit('SET_ADMINPRODUCTS', response.data.result);
      } catch (error) {
        console.error('Error fetching products:', error);
        vue3Toastify.toast.error('Failed to fetch products');
      }
    },
    async fetchProduct({ commit }, prodID) {
      try {
        const response = await axios.get(`https://screenscape.onrender.com/product/${prodID}`);
        commit('SET_PRODUCT', response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        vue3Toastify.toast.error('Failed to fetch product');
      }
    },
    async getProduct({ commit }, prodID) {
      try {
        const response = await axios.get(`https://screenscape.onrender.com/product/${prodID}`);
        commit('SET_ADMINPRODUCT', response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
        vue3Toastify.toast.error('Failed to fetch product');
      }
    },
    async insertProduct({ dispatch }, productData) {
      try {
        await axios.post('https://screenscape.onrender.com/product', productData, {
          headers: { 'Authorization': `Bearer ${getCookie('authToken')}` }
        });
        vue3Toastify.toast.success('Product added successfully');
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Error adding product:', error);
        vue3Toastify.toast.error('Failed to add product');
      }
    },
    async deleteProduct({ dispatch }, prodID) {
      try {
        await axios.delete(`https://screenscape.onrender.com/product/${prodID}`, {
          headers: { 'Authorization': `Bearer ${getCookie('authToken')}` }
        });
        vue3Toastify.toast.success('Product deleted successfully');
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Error deleting product:', error);
        vue3Toastify.toast.error('Failed to delete product');
      }
    },
    async updateProduct({ dispatch }, { prodID, productData }) {
      try {
        await axios.put(`https://screenscape.onrender.com/product/${prodID}`, productData, {
          headers: { 'Authorization': `Bearer ${getCookie('authToken')}` }
        });
        vue3Toastify.toast.success('Product updated successfully');
        dispatch('fetchProducts');
      } catch (error) {
        console.error('Error updating product:', error);
        vue3Toastify.toast.error('Failed to update product');
      }
    }
  },
  getters: {
    products: state => state.products,
    product: state => state.product,
    adminproducts: state => state.adminproducts,
    adminproduct: state => state.adminproduct,
    
  }
});

