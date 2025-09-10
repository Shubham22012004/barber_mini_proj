import express from "express";
import Booking from "../models/Booking.js";
import  { sendConfirmationMail }  from "../utils/sendEmail.js";

const router = express.Router();

/**
 * GET /api/bookings
 * Optional query filters: ?date=YYYY-MM-DD&barber=Alex
 */
router.get("/", async (req, res) => {
  try {
    const { date, barber } = req.query;
    const filter = {};
    if (date) filter.date = date;
    if (barber) filter.barber = barber;

    const bookings = await Booking.find(filter).sort({ date: 1, time: 1 });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
});

/**
 * POST /api/bookings
 * Body: { name, email, phone, service, barber, date, time, notes }
 */
router.post("/", async (req, res) => {
  try {
    const { name, phone, email, service, barber = "Any", date, time, notes } = req.body;

    if (!name || !phone || !service || !date || !time) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Create booking
    const booking = new Booking({ name, phone, email, service, barber, date, time, notes });

    await booking.save(); 

    if (email) {
      const subject = "Booking Confirmation - Barber Shop";
      const text = `Hi ${name}, your booking for ${service} with ${barber} on ${date} at ${time} is confirmed.`;
      const html = `
        <h2>Booking Confirmation</h2>
        <p>Hi <strong>${name}</strong>,</p>
        <p>Your booking has been confirmed with the following details:</p>
        <ul>
          <li><b>Service:</b> ${service}</li>
          <li><b>Barber:</b> ${barber}</li>
          <li><b>Date:</b> ${date}</li>
          <li><b>Time:</b> ${time}</li>
        </ul>
        <p>Thank you for choosing us!</p>
      `;

      // Don't block the response, just log errors if mail fails
      sendConfirmationMail(email, subject, text, html).catch(console.error);
    }    

    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    // Handle duplicate (double-booking)
    if (err?.code === 11000) {
      return res.status(409).json({ message: "Slot already booked for this barber/time" });
    }
    console.error(err);
    res.status(500).json({ message: "Server error creating booking" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Booking.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Booking not found" });

    // Send cancellation email
    if (deleted?.email) {
      sendConfirmationMail(
        deleted.email,
        "Booking Cancelled",
        `Hi ${deleted.name}, your appointment for ${deleted.service} on ${deleted.date} at ${deleted.time} has been cancelled.`,
        `<p>Hi <b>${deleted.name}</b>,</p>
         <p>Your appointment for <b>${deleted.service}</b> on <b>${deleted.date}</b> at <b>${deleted.time}</b> has been <span style="color:red;">cancelled</span>.</p>`
      ).catch(console.error);
    }

    res.json({ message: "Booking deleted", id: req.params.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error deleting booking" });
  }
});



export default router;
