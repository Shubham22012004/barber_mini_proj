import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";

function Home() {
  return (
    <div>

        <section className="hero">
        <h1>Welcome to Our Barber Shop</h1>
        <p>Professional cuts, stylish looks, and the best grooming experience.</p>
       
        </section>
        
      {/* Services Section */}
      <section id="popular-styles">
        <h2>Our Popular Styles</h2>
        <div className="style-cards">
            <div className="style-card">
            <img src="https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&q=80" alt="Fade Haircut" />
            <p>Classic Fade</p>
            </div>
            <div className="style-card">
            <img src="/images/barber1.jpg" alt="Pompadour" />
            <p>Pompadour</p>
            </div>
            <div className="style-card">
            <img src="/images/beardtrim1.jpg" alt="Beard Trim" />
            <p>Beard Grooming</p>
            </div>
        </div>  
        </section>
      {/* Hero Section */}


      <section className="hero1">
        <Link to="/book" className="cta-btn">Book an Appointment</Link>
      </section>

      <Footer />

    </div>
  );
}

export default Home;


// import { Link } from 'react-router-dom';
// import './Home.css';

// export default function Home() {
//   return (
//     <div className="home">
//       <div className="hero">
//         <h1>Welcome to Our Barber Shop</h1>
//         <p>Professional haircuts, shaves, and grooming services.</p>
//         <Link to="/book" className="cta-btn">Book Now</Link>
//       </div>
//     </div>
//   );
// }
