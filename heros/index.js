const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Hero = require("./heroModel");
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

// Get a Hero by ID:
app.get("/heros/:herosId", async (req, res) => {
    console.log(req.params.herosId);
    const heros = await Hero.findById(req.params.herosId);

    res.json(heros);
})

// Add a hero to the database:
app.post("/heros", async (req, res) => {
    await Hero.create(req.body);

    res.status(201).json({
        message: "Hero created",
    });
});

// Get all a hero's powers:
app.get("/heros/:herosId/powers", async (req, res) => {
    const hero = await Hero.findOne({ _id: req.params.herosId }).select("power");
    res.send(hero);
});

app.listen(8000, () => {
    console.log("Listening on port 8000...");
})