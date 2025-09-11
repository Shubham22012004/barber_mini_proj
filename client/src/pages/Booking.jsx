import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Booking.css';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    barber: '',
    date: '',
    time: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔎 Validation function
  const validateForm = () => {
    const { name, email, phone, service, date, time } = formData;

    if (!name.trim()) {
      toast.error("⚠️ Name is required");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("⚠️ Please enter a valid email address");
      return false;
    }

    if (!phone.trim() || phone.length < 10) {
      toast.error("⚠️ Please enter a valid phone number");
      return false;
    }

    if (!service) {
      toast.error("⚠️ Please select a service");
      return false;
    }

    if (!date) {
      toast.error("⚠️ Please select a date");
      return false;
    }

    if (!time) {
      toast.error("⚠️ Please select a time");
      return false;
    }

    // Check future date & time
    const now = new Date();
    const selectedDateTime = new Date(`${date}T${time}`);

    if (selectedDateTime < now) {
      toast.error("⚠️ Please choose a future date and time");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return; // stop if invalid

    try {
      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!res.ok) {
        const errMsg = await res.json();
        toast.error(errMsg.message || " Failed to create booking");
        return;
      }

      const data = await res.json();
      toast.success("🎉 Your appointment has been booked!");

      console.log("Saved:", data.booking);

      // ✅ Reset form after booking
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        barber: '',
        date: '',
        time: ''
      });

    } catch (err) {
      console.error(err);
      toast.error("⚠️ Server error, please try again.");
    }
  };


  
const generateTimeSlots = (selectedDate) => {
  const slots = [];
  let start = 9;   // 9 AM
  let end = 18;    // 6 PM
  const now = new Date();

  for (let hour = start; hour < end; hour++) {
    for (let min of [0, 30]) {
      const slot = `${hour.toString().padStart(2, '0')}:${min === 0 ? "00" : "30"}`;

      // If selected date is today, filter out past times
      if (selectedDate) {
        const slotDateTime = new Date(`${selectedDate}T${slot}`);
        if (slotDateTime <= now) continue; // skip past slots
      }

      slots.push(slot);
    }
  }
  return slots;
};



  return (
    <div className="booking-page">
      <form className="booking-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />

        <select name="service" value={formData.service} onChange={handleChange}>
          <option value="">Select Service</option>
          <option value="Haircut">Haircut</option>
          <option value="Shave">Shave</option>
          <option value="Beard Trim">Beard Trim</option>
        </select>

        <input name="barber" placeholder="Preferred Barber (optional)" value={formData.barber} onChange={handleChange} />
        

        <input 
          type="date" 
          name="date" 
          value={formData.date} 
          onChange={handleChange} 
          min={new Date().toISOString().split("T")[0]} 
        />


        <select name="time" value={formData.time} onChange={handleChange}>
          <option value="">Select Time</option>
          {generateTimeSlots(formData.date).map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>



        <button type="submit">Submit</button>
      </form>

      {/* Toast notification container */}
      <ToastContainer position="top-center" autoClose={2500} hideProgressBar={false} />
    </div>
  );
}

