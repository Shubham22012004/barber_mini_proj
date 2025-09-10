import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // 465 for SSL, 587 for TLS
  secure: true, // true for 465, false for 587
  auth: {
    user: "shubhamyadavoffice123@gmail.com",
    pass: "iyaekhpzinkotnbb",
  },
});


export const sendConfirmationMail = async (to, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: "shubhamyadavoffice123@gmail.com",
      to,
      subject,
      text,
      html,
    });
    console.log("✅ Email sent successfully!");
  } catch (err) {
    console.error("❌ Email sending failed: ", err);
  }
};
