const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create Scheema
const UserSchema = new Schema({
    firstname: {
        type: String,
        maxlength: 50,
        required: true
    },
    lastname: {
        type: String,
        maxlength: 50,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    register_date: {
        type: Date,
        default: Date.now
    }
});

module.exports = User = mongoose.model('user', UserSchema);