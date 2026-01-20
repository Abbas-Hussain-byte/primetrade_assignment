const mongoose = require('mongoose');

const taskSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
            maxlength: [50, 'Title can not be more than 50 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [500, 'Description can not be more than 500 characters'],
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending',
        },
        owner: {
            type: mongoose.Schema.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Task', taskSchema);
