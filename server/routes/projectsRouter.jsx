const express = require('express');
const router = express.Router();
const Project = require('../models/ProjectModel.jsx');

// Create a new project
router.post('/api/projects', async (req, res) => {
    const { name, image, description, githubLink, liveDemoLink, userID } = req.body;

    try {
        const newProject = new Project({ name, image, description, githubLink, liveDemoLink, userID });
        await newProject.save();
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all projects for a user
router.get('/api/projects/:userID', async (req, res) => {
    try {
        const projects = await Project.find({ userID: req.params.userID });
        res.json(projects);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a single project by ID
router.get('/api/project/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) return res.status(404).json({ message: 'Project not found' });
        res.json(project);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a project by ID
router.put('/api/project/:id', async (req, res) => {
    const { name, image, description, githubLink, liveDemoLink } = req.body;

    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { name, image, description, githubLink, liveDemoLink },
            { new: true }
        );
        if (!updatedProject) return res.status(404).json({ message: 'Project not found' });
        res.json(updatedProject);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a project by ID
router.delete('/api/project/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) return res.status(404).json({ message: 'Project not found' });
        res.json({ message: 'Project deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;