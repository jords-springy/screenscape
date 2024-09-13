<template>
  <div class="about">
    <div class="parallax">
      <div class="parallax-blur2"></div>
      <div class="hero-content">
        <h1>About Us</h1>

      </div>
    </div>

    <div data-aos="zoom-in">
      <div id="about" class="padding-large">
        <h2>ScreenScape FAQ's</h2>
        <div class="container">
          <div class="row justify-content-center">
            <div class="col-md-8 text-center icon-text-block">
              <i class="fas fa-video fa-2x"></i>
              <p>We deliver premium cinema experiences featuring luxury seating, top-tier catering options, and superior audiovisual technology.</p>
            </div>
            <div class="col-md-8 text-center icon-text-block">
              <i class="fas fa-user-shield fa-2x"></i>
              <p>Renowned for its secure reservation and payment system that simplifies the booking process while ensuring user data protection.</p>
            </div>
            <div class="col-md-8 text-center icon-text-block">
              <i class="fas fa-hands fa-2x"></i>
              <p>Creates a scalable platform that can expand to offer customizable additional luxury services and experiences.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div data-aos="zoom-in">
      <div class="what-we-offer">
        <div class="container">
          <h2>What We Offer</h2>
          <p class="intro-text">
            ScreenScape provides an exclusive, luxurious cinema experience with the following offerings:
          </p>
          <ul class="offer-list">
            <li>
              <strong><i class="fas fa-file-video"></i> Private Cinema Reservations:</strong> <br>Exclusive access to private cinema spaces for small groups, events, or personal enjoyment.<br>
            </li>
            <li>
              <strong><i class="fas fa-file-video"></i> Customizable Viewing Options:</strong> <br>Choose from new releases, classic films, or personal content for a tailored experience.<br>
            </li>
            <li>
              <strong><i class="fas fa-file-video"></i> Luxurious Setting:</strong> <br>Comfortable seating, premium sound systems, and high-quality visual displays for an enhanced viewing experience.<br>
            </li>
            <li>
              <strong><i class="fas fa-file-video"></i> Personal Events:</strong> <br>Ideal for birthdays, anniversaries, corporate events, or private parties with a cinematic touch.<br>
            </li>
            <li>
              <strong><i class="fas fa-file-video"></i> On-Demand Services:</strong> <br>Flexible scheduling to accommodate specific viewing times and preferences.<br>
            </li>
            <li>
              <strong><i class="fas fa-file-video"></i> Food & Beverage Options:</strong> <br>Catering services available, offering gourmet snacks, drinks, and full meal options.<br>
            </li>
            <li>
              <strong><i class="fas fa-file-video"></i> Themed Experiences:</strong> <br>Option to customize the cinema environment with themes, decorations, and personal touches.<br>
            </li>
            <li>
              <strong><i class="fas fa-file-video"></i> Enhanced Privacy and Comfort:</strong><br> No distractions or interruptions, creating a completely immersive experience.
            </li>
          </ul>
        </div>
      </div>

      <div data-aos="zoom-in">
  <div class="values-section">
    <div class="container">
      <h2>Our Values</h2>
      <div class="row">
        
        <!-- Exclusivity -->
        <div class="col-md-4 value-item">
          <i class="fas fa-lock"></i>
           
          
          <h3>Exclusivity</h3>
          <p>Offering a private and personalized cinematic experience tailored to each guest's needs.</p>
        </div>

        <!-- Luxury -->
        <div class="col-md-4 value-item">
          <i class="fas fa-money-check"></i>
          <h3>Luxury</h3>
          <p>Providing a premium, high-quality setting with top-tier amenities for ultimate comfort and enjoyment.</p>
        </div>

        <!-- Customization -->
        <div class="col-md-4 value-item">
          <i class="fas fa-person-booth"></i>
          <h3>Customization</h3>
          <p>Ensuring each event is unique with flexible options for film selection, catering, and ambiance.</p>
        </div>
        
      </div>
    </div>
  </div>
</div>
    </div>
  </div>
 
</template>

<style scoped>
.intro-text{
  text-align: center;
}
#about {
  margin-top: 5rem;
  margin-bottom: 5rem;
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
.parallax-blur2 {
  background-image: url('https://jords-springy.github.io/hostedimages/images/ssabout.jpg');
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

h2 {
  text-align: center;
}
.what-we-offer {
  background-color: black;
  color: white;
  padding: 50px 20px;
}

.offer-list {
  list-style-type:none;
  padding: 0;
}
.offer-list li {
  margin-bottom: 15px;
  font-size: 1.1em;
  text-align: center;
}
.offer-list strong {
  color: #950101; /* Gold color for highlights */
}
.values-section {
    background-color: #F9F9F9;
    padding: 50px 100px;
    text-align: center;
  }
  .values-section h2 {
    font-size: 36px;
    margin-bottom: 40px;
    color: #333;
    letter-spacing: 1.5px;
  }
  .value-item {
    margin-bottom: 30px;
    padding: 20px;
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .value-item:hover {
    transform: translateY(-10px); /* Lift effect */
    box-shadow: 0 4px 8px rgba(0,0,0,0.2); /* Shadow effect */
  }
  .value-image {
    width: 100%;
    height: auto;
    margin-bottom: 20px;
    border-radius: 8px;
  }
  .value-item h3 {
    font-size: 24px;
    color: #333;
    margin-bottom: 15px;
  }
  
  /* Media Queries for responsiveness */
@media (max-width: 1200px) {
  .what-we-offer {
    padding: 40px 10px;
  }
  
  .values-section {
    padding: 40px 50px;
  }
}

@media (max-width: 992px) {
  .offer-list li {
    font-size: 1em;
  }

  .values-section h2 {
    font-size: 32px;
  }

  .value-item {
    padding: 15px;
  }
}

@media (max-width: 768px) {
  .parallax {
    height: 60vh;
  }
  
  .hero-content h1 {
    font-size: 2rem;
  }

  .values-section {
    padding: 30px 20px;
  }

  .value-item {
    margin-bottom: 20px;
  }

  .value-item h3 {
    font-size: 20px;
  }

  #about {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
}

@media (max-width: 576px) {
  .parallax-blur2 {
    filter: blur(5px); /* Reduce blur on smaller screens */
  }

  .hero-content h1 {
    font-size: 1.5rem;
  }

  .offer-list li {
    font-size: 0.9em;
    margin-bottom: 10px;
  }

  .values-section {
    padding: 20px 10px;
  }

  .value-item h3 {
    font-size: 18px;
  }
}

</style>
