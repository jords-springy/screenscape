<template>
    <div class="contact">
      <!-- Contact Us Section with Image Background -->
      <div class="parallax">
      <div class="parallax-blur2"></div>
      <div class="hero-content">
        <h1>Contact Us</h1>

      </div>
      </div>
  
      <!-- Contact Information and Form Section -->
      <div class="contact-container">
        <!-- Contact Information Section -->
        <div class="contact-info">
          <p>Feel free to reach out for inquiries or to make a reservation.</p>
          <div class="info-section">
            <div class="office-info">
              <h3>OUR OFFICE</h3>
              <h4>Address</h4>
              <p>
                ScreenScape Cinemas<br>
                The Cinema Hub, 14 Bree Street<br>
                Cape Town, 8000<br>
                South Africa
              </p>
              <br>
              <h4>Contact Number</h4>
              <p>+27 123 4567</p>
              <br>
              <h4>Email Us</h4>
              <p>reservations@screenscape.com</p>
              <br>
              <h4>Office Hours</h4>
              <p>Monday to Sunday, 9:00 AM – 11:00 PM</p>
              <br>
              <h4>Online Bookings</h4>
              <p>Available 24/7 through our website.</p>
            </div>
          </div>
        </div>
  
        <!-- Contact Form Section -->
        <div class="contact-form">
          <h2>Any Questions?</h2>
          <p class="intro-text">Use the form below to get in touch with us.</p>
          <form @submit.prevent="handleSubmit">
            <label for="name">Your Name </label>
            <input type="text" id="name" v-model="form.name" placeholder="Write your name here" required />
  
            <label for="email">Your Email </label>
            <input type="email" id="email" v-model="form.email" placeholder="Write your email here" required />
  
            <label for="phone">Phone Number</label>
            <input type="tel" id="phone" v-model="form.phone" placeholder="Write your phone number" />
  
            <label for="subject">Subject </label>
            <input type="text" id="subject" v-model="form.subject" placeholder="Write your subject here" required />
  
            <label for="message">Your Message </label>
            <textarea id="message" v-model="form.message" placeholder="Write your message here" required></textarea>
  
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  // Import SweetAlert2
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        form: {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        },
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await fetch('https://formcarry.com/s/NQsKj4W9e2L', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify(this.form),
          });
  
          // Debugging response
          console.log('Response Status:', response.status);
          console.log('Response Status Text:', response.statusText);
          const responseText = await response.text(); // Read as text to handle potential HTML
          console.log('Response Text:', responseText);
  
          if (response.ok) {
            Swal.fire({
              title: 'Success',
              text: 'Your message has been sent successfully.',
              icon: 'success',
              confirmButtonText: 'OK',
            });
            this.resetForm();
          } else {
            let errorMessage = 'There was an error submitting your message. Please try again later.';
            // Parse the responseText for specific error details if available
            if (responseText.includes('specific error text')) {
              errorMessage = 'Detailed error message based on response content.';
            }
            Swal.fire({
              title: 'Submission Error',
              text: errorMessage,
              icon: 'error',
              confirmButtonText: 'OK',
            });
            console.error('Error response:', response.status, response.statusText, responseText);
          }
        } catch (error) {
          Swal.fire({
            title: 'Network Error',
            text: 'There was a problem with your submission. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK',
          });
          console.error('Network error:', error);
        }
      },
      resetForm() {
        this.form.name = '';
        this.form.email = '';
        this.form.phone = '';
        this.form.subject = '';
        this.form.message = '';
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your styling here */
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
  background-image: url('https://jords-springy.github.io/hostedimages/images/sscontact.jpg');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  filter: blur(4px); /* Blur effect */
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

/* Responsive Styles */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 2rem; /* Adjust font size for tablets */
  }

  .hero-content p {
    font-size: 1rem; /* Adjust font size for tablets */
  }

  .contact-container {
    padding: 15px;
  }

  .contact-info, .contact-form {
    padding: 15px;
  }

  input, textarea {
    font-size: 0.9rem; /* Smaller font size for input fields */
  }

  button {
    padding: 8px;
    font-size: 0.9rem; /* Smaller font size for buttons */
  }
}

@media (max-width: 480px) {
  .hero-content h1 {
    font-size: 1.5rem; /* Smaller font size for mobile */
  }

  .hero-content p {
    font-size: 0.9rem; /* Smaller font size for mobile */
  }

  .contact-container {
    padding: 10px;
  }

  .contact-info, .contact-form {
    padding: 10px;
  }

  input, textarea {
    font-size: 0.8rem; /* Smaller font size for input fields */
  }

  button {
    padding: 6px;
    font-size: 0.8rem; /* Smaller font size for buttons */
  }
}

  </style>
  