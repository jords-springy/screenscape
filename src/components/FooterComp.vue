<template>
    <div>
      <footer>
        <p>&copy; <span id="year"></span> Micasa. All rights reserved.</p>
      </footer>
    </div>
  </template>
  
  <script>
  export default {
    mounted() {
      const year = new Date().getFullYear();
      document.getElementById("year").textContent = year;
    }
  };
  </script>
  
 
  