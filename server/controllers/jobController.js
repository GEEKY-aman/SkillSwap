const Job = require('../models/Job');

const getJobs = async (req, res) => {
    try {
        const jobs = await Job.find({});
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createJob = async (req, res) => {
    try {
        const job = await Job.create(req.body);
        res.status(201).json(job);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getJobs, createJob };
