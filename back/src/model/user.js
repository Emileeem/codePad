const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlenght: 3,
    },
    nickname: {
        type: String,
        required: true,
        minlenght: 4,
    },
    birth: {
        type: Date,
        required: true,
    },
    email: {
        type: String,
        required: true,
        minlength: 3,
    },
    admin:{
        type: Boolean,
        required: false,
    },
    createdAt: {
        type: Date,
        required: true,
    },
    updatedAt: {
        type: Date,
        required: false,
    },
    removedAt: {
        type: Date,
        required: false,
    },
});

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.userSchema = userSchema;
