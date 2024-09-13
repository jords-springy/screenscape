a<template>
  <div class="home">
    <div class="parallax">
      <div class="parallax-blur"></div>
      <div class="hero-content">
        <h1>Welcome to ScreenScape</h1>
        <p>A platform where users can seamlessly reserve private cinemas and mini-theaters for intimate screenings and special occasions.</p>
      </div>
    </div>

      <div class="featured-items">
        <h2>Featured Items</h2>
        <p>Explore our top cinema and mini-theater selections.</p>
        <a href="/products"><button class="view-more">View All</button></a>
        
        <div class="cards-container">
          <div class="card">
            <img src="https://jords-springy.github.io/hostedimages/images/majesticcine.jpg" alt="Luxury Cinema Room">
            <div class="card-content">
              <p>Luxury Cinema Room</p>
              <p>Capacity: 10 guests</p>
            </div>
          </div>
          <div class="card">
            <img src="https://jords-springy.github.io/hostedimages/images/cinelux.jpg" alt="Premium Mini-Theater">
            <div class="card-content">
              <p>Premium Mini-Theater</p>
              <p>Capacity: 6 guests</p>
            </div>
          </div>
          <div class="card">
            <img src="https://jords-springy.github.io/hostedimages/images/elitescreen.jpg" alt="Exclusive Cinema Experience">
            <div class="card-content">
              <p>Exclusive Cinema Experience</p>
              <p>Capacity: 15 guests</p>
            </div>
          </div>
        </div>
      </div>

      <div class="signup-section">
        <div class="signup-content">
          <h2>Join ScreenScape Today!</h2>
          <p>Sign up now to reserve your luxury private cinema experience.</p>
          <a href="/signup">
            <button class="signup-button">Sign Up</button>
          </a>
        </div>
      </div>
   
      <div data-aos="fade-right">
    <div class="reviews">
      <h2>Customer Reviews</h2>
      <div class="review-cards">
        <div class="review-card">
          <p class="intro-text">"Screenscape took date night to the next level! My partner and I had the entire cinema to ourselves, which made the experience so much more personal and romantic. I highly recommend it for anyone looking for a unique and cozy cinema experience!"</p>
          <span>- Mia</span>
        </div>
        <div class="review-card">
          <p class="intro-text">"Screenscape is a hidden gem! I booked a private screening for my wife’s birthday, and it was an unforgettable experience. The setup was perfect, and the staff was so accommodating. Definitely planning our next movie night here!"</p>
          <span>- Liam</span>
        </div>
        <div class="review-card">
          <p class="intro-text">"Screenscape was a fantastic experience from start to finish. We had a private screening for a birthday celebration, and everyone was blown away by how luxurious and exclusive it felt. Highly recommend for any special occasion!"</p>
          <span>- Faith</span>
        </div>
      </div>
    </div>
</div>
    

      <div class="social-media">
  <h2>Follow Us</h2>
  <a href="https://facebook.com/screenscape" target="_blank" class="social-icon">
    <i class="fab fa-facebook-f"></i>
  </a>
  <a href="https://instagram.com/screenscape" target="_blank" class="social-icon">
    <i class="fab fa-instagram"></i>
  </a>
  <a href="https://twitter.com/screenscape" target="_blank" class="social-icon">
    <i class="fab fa-twitter"></i>
  </a>
</div>
         
        
        </div>

</template>

<script>
export default {
  name: 'HomeView',
  components: {}
}
</script>

<style scoped>
/* Landing Section Styles */
.section {
  text-align: center;
  padding: 20px;
}

.parallax {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;
  overflow: hidden;
}
.parallax-blur {
  background-image: url('https://jords-springy.github.io/hostedimages/images/sslanding.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  filter: blur(8px); /* Blur effect */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Ensure the image stays behind the text */
}
.hero-content {
  position: relative;
  z-index: 1; /* Ensure the text stays above the blurred image */
  color: #5C5347;
}
.hero-content h1 {
  color: #fff;
}
.hero-content p {
  color: #fff;
}



/* Featured Items Section */
.featured-items {
  text-align: center;
  margin-top: 50px;
  padding-bottom: 100px;
}


.view-more{
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 40px;
  align-content: center;
}

.view-more:hover {
  background-color: #333;
}
/* Cards Container */
.cards-container {
  display: flex;
  justify-content: space-around;
  gap: 20px;
  padding: 0 20px;
}

/* Updated Card Styles */
.card {
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center; /* Center the text horizontally */
  display: flex; /* Use flexbox for vertical centering */
  flex-direction: column; /* Ensure content is stacked vertically */
  justify-content: center; /* Center content vertically */
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.card-content {
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Center the content horizontally */
}


.card h3 {
  margin-bottom: 10px;
}

.card p {
  font-weight: bold;
  color: #333;
}

/* New Signup Section Styles */
.signup-section {
  background-color: black;
  color: white;
  padding: 60px 20px;
  text-align: center;
}

.signup-content {
  max-width: 600px;
  margin: 0 auto;
}

.signup-button {
  background-color: white;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
}

.signup-button:hover {
  background-color: #950101;
}

/* Media Queries */

/* For small devices like mobile (300px - 599px) */
@media (max-width: 599px) {
  .parallax {
    height: 80vh;
  }
  .hero-content h1 {
    font-size: 1.8rem;
  }
  .hero-content p {
    font-size: 1rem;
    padding: 0 15px;
  }
  .cards-container {
    flex-direction: column;
    align-items: center;
  }
  .card {
    width: 90%;
    margin-bottom: 20px;
  }
}

/* For tablets (600px - 899px) */
@media (min-width: 600px) and (max-width: 899px) {
  .parallax {
    height: 90vh;
  }
  .hero-content h1 {
    font-size: 2.2rem;
  }
  .hero-content p {
    font-size: 1.2rem;
  }
  .cards-container {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  .card {
    width: 45%;
  }
}

/* For laptops/desktops (900px - 1440px) */
@media (min-width: 900px) and (max-width: 1440px) {
  .parallax {
    height: 100vh;
  }
  .hero-content h1 {
    font-size: 3rem;
  }
  .hero-content p {
    font-size: 1.4rem;
  }
  .cards-container {
    justify-content: space-around;
    gap: 20px;
  }
  .card {
    width: 300px;
  }
}
</style>
