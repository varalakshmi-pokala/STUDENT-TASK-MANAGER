const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Serve frontend files
app.use(express.static("public"));

const DATA_FILE = "tasks.json";

// -------------------------------
// Get All Tasks
// -------------------------------
app.get("/tasks", (req, res) => {
    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        if (err) return res.send([]);
        res.send(JSON.parse(data));
    });
});

// -------------------------------
// Add a Task
// -------------------------------
app.post("/tasks", (req, res) => {
    const newTask = req.body;

    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        let tasks = [];

        if (!err) {
            tasks = JSON.parse(data);
        }

        tasks.push(newTask);

        fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), () => {
            res.send({ success: true });
        });
    });
});

// -------------------------------
// Delete Task by ID
// -------------------------------
app.delete("/tasks/:id", (req, res) => {
    const id = req.params.id;

    fs.readFile(DATA_FILE, "utf8", (err, data) => {
        let tasks = JSON.parse(data);
        tasks = tasks.filter(task => task.id != id);

        fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), () => {
            res.send({ success: true });
        });
    });
});

// -------------------------------
// Start Server
// -------------------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
