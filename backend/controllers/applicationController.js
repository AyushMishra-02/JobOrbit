const Application = require('../models/Application');

// GET all applications for logged-in user (with filter/sort)
const getApplications = async (req, res) => {
  try {
    const { status, sort } = req.query;
    const filter = { user: req.user._id };
    if (status) filter.status = status;

    let query = Application.find(filter);
    if (sort === 'date') query = query.sort({ appliedDate: -1 });
    if (sort === 'priority') query = query.sort({ priority: -1 });

    const applications = await query;
    res.json(applications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// CREATE
const createApplication = async (req, res) => {
  try {
    const app = await Application.create({ ...req.body, user: req.user._id });
    res.status(201).json(app);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// UPDATE
const updateApplication = async (req, res) => {
  try {
    const app = await Application.findOne({ _id: req.params.id, user: req.user._id });
    if (!app) return res.status(404).json({ message: 'Application not found' });

    Object.assign(app, req.body);
    const updated = await app.save();
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
const deleteApplication = async (req, res) => {
  try {
    const app = await Application.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!app) return res.status(404).json({ message: 'Application not found' });
    res.json({ message: 'Application removed' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// STATS for dashboard
const getStats = async (req, res) => {
  try {
    const stats = await Application.aggregate([
      { $match: { user: req.user._id } },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);
    res.json(stats);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getApplications, createApplication, updateApplication, deleteApplication, getStats };
