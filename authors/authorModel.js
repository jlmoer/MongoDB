const mongoose = require("mongoose");

// Schema creation:

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: 250,
    },
    nationality: {
        type: String,
        required: true,
        maxlength: 50,
    },
    books: [{
        type: String,
        required: true,
        maxlength: 250
    }]
});

// Model creation:

const Author = mongoose.model("Author", authorSchema);

// Model exportation:

module.exports = Author;

