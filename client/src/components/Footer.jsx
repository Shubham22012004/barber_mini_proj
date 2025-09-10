
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand / About */}
        <div className="footer-col">
          <h2 className="logo">BarberX</h2>
          <p>Stylish cuts, modern looks, and a fresh vibe. Your grooming, our passion.</p>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/booking">Book Now</a></li>
            <li><a href="/services">Services</a></li>
            <li><a href="/about">About Us</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4>Contact</h4>
          <p>Email: contact@barberx.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Address: C-789, Apartment, Noida</p>
        </div>

        {/* Social Media */}
        {/* <div className="footer-col">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
        </div> */}
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} BarberX. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
