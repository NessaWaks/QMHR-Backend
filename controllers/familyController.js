const Family = require('../models/FamilyRegistration');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.register = async (req, res) => {
  try {
    const { email, password, ...rest } = req.body;
    const existing = await Family.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const family = new Family({ ...rest, email, password: hashedPassword });
    await family.save();
    res.status(201).json(family);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const family = await Family.findOne({ email });
    if (!family) return res.status(404).json({ message: "Family not found" });

    const valid = await bcrypt.compare(password, family.password);
    if (!valid) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: family._id, email: family.email }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ token, family });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const families = await Family.find();
    res.json(families);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getOne = async (req, res) => {
  try {
    const family = await Family.findById(req.params.id);
    if (!family) return res.status(404).json({ message: "Family not found" });
    res.json(family);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await Family.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Family not found" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await Family.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Family not found" });
    res.json({ message: "Family deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
