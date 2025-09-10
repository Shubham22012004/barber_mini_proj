import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    service: { type: String, required: true },
    barber: { type: String, default: "Any" },
    date: { type: String, required: true }, // "YYYY-MM-DD"
    time: { type: String, required: true }, // "HH:MM" 24h or "10:30 AM"
    notes: { type: String, trim: true }
  },
  { timestamps: true }
);

/**
 * Prevent double-booking same barber+date+time.
 * If "Any" barber is used, we'll only check date+time (so only one person per slot).
 */
BookingSchema.index({ barber: 1, date: 1, time: 1 }, { unique: true });

export default mongoose.model("Booking", BookingSchema);
