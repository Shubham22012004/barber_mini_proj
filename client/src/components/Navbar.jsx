// import { Link } from 'react-router-dom';
// import './Navbar.css';

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <h2 className="logo">BookMyBarber</h2>
//       <div>
//         <Link to="/">Home</Link>
//         <Link to="/services">Services</Link>
//         <Link to="/book">Book Now</Link>
//         <Link to="/admin">admin login</Link>
//       </div>
//     </nav>
//   );
// }



import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check admin login state from localStorage
    const loggedIn = localStorage.getItem("isAdmin") === "true";
    setIsAdmin(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setIsAdmin(false);
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav className="navbar">
      <h2 className="logo">BookMyBarber</h2>
      <div>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/book">Book Now</Link>

        {isAdmin ? (
          <>
            <Link to="/admin">Bookings</Link>
            <span className="logout-link" onClick={handleLogout}>
              Logout
            </span>
          </>
        ) : (
          <Link to="/admin">Admin Login</Link>
        )}
      </div>
    </nav>
  );
}

