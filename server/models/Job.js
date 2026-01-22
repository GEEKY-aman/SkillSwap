const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    logo: { type: String },
    location: { type: String, required: true },
    type: { type: String, required: true },
    salary: { type: String, required: true },
    tags: [String],
    active: { type: Boolean, default: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
