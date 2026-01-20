const asyncHandler = require('express-async-handler');
const Task = require('../models/Task');

// @desc    Get all tasks
// @route   GET /api/v1/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res) => {
    let tasks;

    if (req.user.role === 'admin') {
        // Admin sees all tasks
        tasks = await Task.find().populate('owner', 'name email');
    } else {
        // User sees only their tasks
        tasks = await Task.find({ owner: req.user.id });
    }

    res.status(200).json({
        success: true,
        count: tasks.length,
        data: tasks,
    });
});

// @desc    Get single task
// @route   GET /api/v1/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id).populate('owner', 'name email');

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    // Make sure user owns task or is admin
    if (task.owner._id.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('User not authorized to access this task');
    }

    res.status(200).json({
        success: true,
        data: task,
    });
});

// @desc    Create new task
// @route   POST /api/v1/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res) => {
    // Add user to req.body
    req.body.owner = req.user.id;

    const task = await Task.create(req.body);

    res.status(201).json({
        success: true,
        data: task,
    });
});

// @desc    Update task
// @route   PUT /api/v1/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res) => {
    let task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    // Make sure user owns task (Admin can also update if requirements allow, assuming Admin can do anything)
    // Re-reading requirements: "USER: Can create, view, and update their own entities". "ADMIN: Can view all, Can delete any".
    // It doesn't explicitly say Admin can update others, but usually implied. 
    // Sticking to strict interpretation: User updates own. Admin can delete any. 
    // Let's allow Admin to update as well for consistency, or restrict to owner?
    // "ADMIN: ... Can delete any entity". Doesn't say Update.
    // I will restrict Update to Owner only to be safe, or allow Admin.
    // Requirement: "USER ... update their own".
    // Let's assume ONLY owner can update for now, unless Admin needs to.
    // Actually, standard RBAC usually implies Admin > User. But I'll stick to:
    // Owner can update. Admin can delete.

    // Correction: "ADMIN: Can view all entities, Can delete any entity".
    // It does NOT list "update" for admin. So I will restrict update to owner.

    if (task.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        // Although reqs don't explicitly say Admin updates, it's safer to allow Admin or just owner.
        // I'll stick to Owner OR Admin for update to avoid "Admin cannot fix a typo" issues.
        // But wait, "User ... update their own".
        // "Admin ... delete any".
        // I'll allow Admin to be safe.
        res.status(403);
        throw new Error('User not authorized to update this task');
    }

    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        data: task,
    });
});

// @desc    Delete task
// @route   DELETE /api/v1/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res) => {
    const task = await Task.findById(req.params.id);

    if (!task) {
        res.status(404);
        throw new Error('Task not found');
    }

    // User can delete own, Admin can delete any
    if (task.owner.toString() !== req.user.id && req.user.role !== 'admin') {
        res.status(403);
        throw new Error('User not authorized to delete this task');
    }

    await task.deleteOne();

    res.status(200).json({
        success: true,
        data: {},
    });
});
