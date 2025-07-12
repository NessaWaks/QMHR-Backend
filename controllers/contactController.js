const Contact = require('../models/Contact');
const sendEmail = require('../utils/sendEmail');

exports.create = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to DB
    const contact = new Contact({ name, email, message });
    await contact.save();

    // Send email notification
    const html = `
      <h2>New Contact Form Message</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `;

    await sendEmail(
      'qmhrsanya@gmail.com', // Replace with actual church email
      'New Contact Message - QMHR Parish',
      html
    );

    res.status(201).json({ message: 'Message submitted and email sent', contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: "Contact message not found" });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Contact message not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Contact.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Contact message not found" });
    res.json({ message: "Contact message deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
