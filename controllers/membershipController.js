const Membership = require('../models/Membership');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    console.log("👉 Incoming data:", req.body); // LOG INPUT

    const { email, password, ...rest } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const member = new Membership({ ...rest, email, password: hashedPassword });

    console.log("🔨 Saving member...");
    await member.save();

    res.status(201).json(member);
  } catch (err) {
    console.error("❌ Registration failed:", err); // LOG FULL ERROR
    res.status(500).json({ error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const member = await Membership.findOne({ email });
    if (!member) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(password, member.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: member._id, email: member.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, member });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const members = await Membership.find();
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const member = await Membership.findById(req.params.id);
    if (!member) return res.status(404).json({ message: "Not found" });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Membership.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Membership.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
