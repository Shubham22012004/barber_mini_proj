import { useEffect, useState } from "react";
import "./AdminPanel.css";

export default function AdminPanel() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/bookings");
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error("Error fetching bookings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bookings/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setBookings((prev) => prev.filter((b) => b._id !== id));
      } else {
        const err = await res.json();
        alert(err.message);
      }
    } catch (err) {
      console.error("Error deleting booking", err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  if (loading) return <p>Loading bookings...</p>;

  return (
    <div className="admin-panel">
      <h2>Admin Panel - All Bookings</h2>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Service</th>
              <th>Barber</th>
              <th>Date</th>
              <th>Time</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.name}</td>
                <td>{b.phone}</td>
                <td>{b.email}</td>
                <td>{b.service}</td>
                <td>{b.barber}</td>
                <td>{b.date}</td>
                <td>{b.time}</td>
                <td>
                  <button onClick={() => handleDelete(b._id)}>❌ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
