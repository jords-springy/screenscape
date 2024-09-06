<template>
    <div class="product-page">
      <div data-aos="fade-down" data-aos-duration="500">
        <div class="product-header">
          <h1>Products</h1>
        </div>
      </div>
      <h2>What we offer</h2>
      <div class="content-container">
        <div class="product-grid">
          <CardComp
            v-for="product in sortedProducts"
            :key="product.id"
            :product="product"
            @toggle-details="toggleProductDetails"
          >
            <template v-if="product.showDetails">
              <div class="product-details">
                <p><strong>Description:</strong> {{ product.prodDescription }}</p>
                <p><strong>Features:</strong> {{ product.prodFeatures }}</p>
                <p><strong>Quantity:</strong> {{ product.quantity }}</p>
                <p><strong>Sound:</strong> {{ product.prodSound }}</p>
                <p><strong>Package:</strong> {{ product.prodPackage }}</p>
                <p><strong>Amount:</strong> {{ product.amount }}</p>
                <p><strong>Category:</strong> {{ product.category }}</p>
                <img :src="product.prodUrl" alt="Product Image" />
              </div>
            </template>
          </CardComp>
        </div>
  
        <div class="sidebar">
          <div class="search-container">
            <input type="text" placeholder="Search..." v-model="searchQuery" />
            <button type="button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg>
            </button>
          </div>
          <h4>Categories</h4>
          <ul>
            <li @click="showAllProducts" :class="{ active: !selectedCategory }">All Products</li>
            <li
              v-for="(category, index) in categories"
              :key="index"
              @click="filterByCategory(category)"
              :class="{ active: selectedCategory === category }"
            >
              {{ category }}
            </li>
          </ul>
  
          <h4>Filter by Price</h4>
          <ul>
            <li
              v-for="(priceRange, index) in priceFilters"
              :key="priceRange.label + index"
              @click="filterByPriceRange(priceRange)"
              :class="{ active: selectedPriceRange === priceRange }"
            >
              {{ priceRange.label }}
            </li>
          </ul>
  
          <select v-model="sortOrder" @change="persistSortOrder" class="custom-select">
            <option value="id-asc">Select Sort Order</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import CardComp from "../components/CardComp.vue";
  import axios from "axios";
  
  
  export default {
    name: "ProductsView",
    components: {
      CardComp,
    },
    data() {
      return {
        products: [],
        categories: [],
        priceFilters: [
          { label: "R0 - R249", min: 0, max: 249 },
          { label: "R250 - R400", min: 250, max: 400 },
          { label: "Over R400", min: 400, max: Infinity },
        ],
        selectedCategory: null,
        selectedPriceRange: null,
        searchQuery: "",
        sortOrder: "asc",
      };
    },
    computed: {
      filteredProducts() {
        let filtered = this.products;
  
        if (this.selectedCategory) {
          filtered = filtered.filter(
            (product) => product.category === this.selectedCategory
          );
        }
  
        if (this.selectedPriceRange) {
          filtered = filtered.filter((product) => {
            const price = Number(product.amount);
            return (
              price >= this.selectedPriceRange.min &&
              price <= this.selectedPriceRange.max
            );
          });
        }
  
        if (this.searchQuery) {
          filtered = filtered.filter((product) =>
            product.prodName.toLowerCase().includes(this.searchQuery.toLowerCase())
          );
        }
  
        return filtered;
      },
      sortedProducts() {
        const sorted = this.filteredProducts.slice().sort((a, b) => {
          if (this.sortOrder === "asc") {
            return Number(a.amount) - Number(b.amount);
          } else if (this.sortOrder === "desc") {
            return Number(b.amount) - Number(a.amount);
          } else if (this.sortOrder === "id-asc") {
            return a.prodID - b.prodID;
          } else if (this.sortOrder === "id-desc") {
            return b.prodID - a.prodID;
          } else {
            return 0;
          }
        });
  
        return sorted;
      },
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get("https://screenscape.onrender.com/product");
          this.products = response.data.result;
          this.categories = [...new Set(this.products.map((product) => product.category))];
          console.log('Categories:', this.categories); // Debugging
        } catch (error) {
          console.error(error);
        }
      },
      filterByCategory(category) {
        this.selectedCategory = category;
      },
      filterByPriceRange(priceRange) {
        this.selectedPriceRange = priceRange;
      },
      showAllProducts() {
        this.selectedCategory = null;
        this.selectedPriceRange = null;
      },
      persistSortOrder() {
        if (this.sortOrder) {
          localStorage.setItem("sortOrder", this.sortOrder);
        } else {
          localStorage.removeItem("sortOrder");
        }
      },
      retrieveSortOrder() {
        const savedSortOrder = localStorage.getItem("sortOrder");
        if (savedSortOrder) {
          this.sortOrder = savedSortOrder;
        }
      },
      toggleProductDetails(product) {
        product.showDetails = !product.showDetails;
      },
    },
    created() {
      this.retrieveSortOrder();
    },
    mounted() {
      this.fetchProducts();
    },
  };
  </script>
  
  <style scoped>
  .product-page {
    display: flex;
    flex-direction: column;
    padding: 20px;
  }
  
  .product-header {
    text-align: center;
  }
  
  .content-container {
    display: flex;
    justify-content: space-between;
  }
  
  .product-grid {
    flex: 3;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .sidebar {
    flex: 1;
    padding: 10px;
    border-left: 1px solid #ddd;
  }
  
  .search-container {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  
  .search-container input {
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .search-container button {
    background-color: #950101;
    border: none;
    color: white;
    padding: 10px;
    border-radius: 4px;
    margin-left: 10px;
  }
  
  .sidebar h4 {
    margin-top: 0;
  }
  
  .sidebar ul {
    list-style: none;
    padding: 0;
  }
  
  .sidebar ul li {
    cursor: pointer;
    padding: 10px;
  }
  
  .sidebar ul li.active {
    background-color: #950101;
    color: white;
  }
  
  .product-details {
    margin-top: 10px;
  }
  .custom-select {
  padding: 10px;
  border: 1px solid #950101; /* Border color */
  border-radius: 4px;
  background-color: black; /* Background color */
  color: #fff; /* Text color */
  appearance: none; /* Remove default styling */
  cursor: pointer;
}

.custom-select:hover {
  border-color: #950101; /* Border color on hover */
  background-color: #950101; /* Background color on hover */
  color: #fff; /* Text color on hover */
}

.custom-select option {
  background-color: black; /* Background color of options */
  color: #fff; /* Text color of options */
}


  </style>
  