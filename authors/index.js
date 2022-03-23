const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./authorModel");
const dotenv = require("dotenv");
const Author = require("./authorModel");
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


// Exercice 1
app.get("/", (_req, res) => {
    res.send("Welcome to MongoDB");
})

// Exercice 2
app.get("/authors/:authorsId", async (req, res) => {
    console.log(req.params.authorsId);
    const authors = await Author.findById(req.params.authorsId);

    res.json(authors);
})

app.post("/authors", async (req, res) => {
    await Author.create(req.body);

    res.status(201).json({
        message: "Author created",
    });
});
// Exercice 3
app.get("/authors/:authorsId/books", (req, res) => {
    const author = authors.find((author) => {
        return author.id.toString() === req.params.authorsId;
    })
    // console.log(author);
    res.send(`${author.books.join(", ")}`);
})

// Exercice 4
app.get("/json/authors/:id", (req, res) => {
    const author = authors.find((author) => {
        return author.id.toString() === req.params.id;
    })
    res.json({
        name: author.name,
        nationality: author.nationality,
    })
})

app.get("/json/authors/:id/books", (req, res) => {
    const author = authors.find((author) => {
        return author.id.toString() === req.params.id;
    })
    res.json({
        books: author.books,
    })
})






app.listen(8000, () => {
    console.log("Listening on port 8000");
})