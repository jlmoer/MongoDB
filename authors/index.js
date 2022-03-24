const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Author = require("./authorModel");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

app.use(express.json());

// Connection to the database:
mongoose
    .connect(
        process.env.MONGO_URI
        ,
        {
            useNewUrlParser: true,
        }

    )
    .then(() => console.log("Connected to MongoDB"));


// First route:
app.get("/", (_req, res) => {
    res.send("Welcome to MongoDB");
});

// Get an author by ID:
app.get("/authors/:authorsId", async (req, res) => {
    console.log(req.params.authorsId);
    const authors = await Author.findById(req.params.authorsId);

    res.json(authors);
})

// Add an author to the database:
app.post("/authors", async (req, res) => {
    await Author.create(req.body);

    res.status(201).json({
        message: "Author created",
    });
});

// Get all the books written by an author:
app.get("/authors/:authorsId/books", async (req, res) => {
    const author = await Author.findOne({ _id: req.params.authorsId }).select("-_id books");
    res.send(author);
});

// // Get an author by ID with json:
// app.get("/json/authors/:id", async (req, res) => {
//     const author = await Author.findById({ _id: req.params.authorsId }).select("_id");
//     res.json({
//         name: author.name,
//         nationality: author.nationality,
//     })
// })

// app.get("/json/authors/:id/books", (req, res) => {
//     const author = authors.find((author) => {
//         return author.id.toString() === req.params.id;
//     })
//     res.json({
//         books: author.books,
//     })
// });






app.listen(8000, () => {
    console.log("Listening on port 8000...");
})