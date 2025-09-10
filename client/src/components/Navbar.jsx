import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">BookMyBarber</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/book">Book Now</Link>
        <Link to="/admin">Bookings</Link>
      </div>
    </nav>
  );
}
