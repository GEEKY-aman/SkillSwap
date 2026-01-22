const Hackathon = require('../models/Hackathon');

const getHackathons = async (req, res) => {
    try {
        const hackathons = await Hackathon.find({});
        res.json(hackathons);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createHackathon = async (req, res) => {
    try {
        const hackathon = await Hackathon.create(req.body);
        res.status(201).json(hackathon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getHackathons, createHackathon };
