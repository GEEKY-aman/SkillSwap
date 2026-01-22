const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public (for now)
const getProjects = async (req, res) => {
    try {
        const projects = await Project.find({});
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get project by ID
// @route   GET /api/projects/:id
// @access  Public
const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (project) {
            res.json(project);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Public
const createProject = async (req, res) => {
    const { name, files, whiteboardData } = req.body;

    try {
        const project = new Project({
            name,
            files,
            whiteboardData,
        });

        const createdProject = await project.save();
        res.status(201).json(createdProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Public
const updateProject = async (req, res) => {
    const { files, whiteboardData } = req.body;

    try {
        const project = await Project.findById(req.params.id);

        if (project) {
            project.files = files || project.files;
            project.whiteboardData = whiteboardData || project.whiteboardData;

            const updatedProject = await project.save();
            res.json(updatedProject);
        } else {
            res.status(404).json({ message: 'Project not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
};
