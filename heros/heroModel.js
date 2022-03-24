const mongoose = require("mongoose");

// Schema creation:

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 250,
    },
    power: {
        type: [String],
        required: true,
        maxlength: 250,
    },
    color: {
        type: String,
        required: true,
        maxlength: 250,
    },
    isAlive: {
        type: Boolean,
        required: true,
    },
    age: {
        type: Number,
        required: true,
        min: 0,
        max: 1000,
    }
});

// Model creation:

const Hero = mongoose.model("Hero", heroSchema);

// Model exportation:

module.exports = Hero;