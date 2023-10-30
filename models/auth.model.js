const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
    email: { type: String, required: true, maxlength: 25, lowercase: true },
    username: { type: String, required: true, minlength: 6, lowercase: true },
    password: { type: String, required: true, minlength: 8 }
}, {
    timestamps: true
})

const authModel = mongoose.model('AuthUsers', authSchema);

module.exports = authModel;