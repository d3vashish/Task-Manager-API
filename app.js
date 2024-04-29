const express = require('express');
const app = express();
const taskData = require("./task.json");
const Validator = require("./helpers/Validator")
const fs = require('fs');
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/tasks", (req, res) => {
    try {
        res.status(200).json(taskData.tasks);
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get("/tasks/:id", (req, res) => {
    try {
        const allTasks = taskData.tasks;
        const taskId = req.params.id;
        const filteredTasks = allTasks.filter((t) => t.id == taskId);
        if (filteredTasks.length == 0) {
            return res.status(404).send("No Task found");
        } else {
            return res.status(200).json(filteredTasks[0]);
        }
    } catch (err) {
        res.status(500).send("server error: ");
    }
});

app.post("/tasks", (req, res) => {
    try {
        const body = req.body;
        let newTaskData = {
            id: body.id,
            title: body.title,
            description: body.description,
            completed: body.completed,
        };
        let allNewTasks = taskData;
        allNewTasks.tasks.push(newTaskData);
        if (Validator.validateTask(body).status == true) {
            fs.writeFile(
                "./task.json",
                JSON.stringify(allNewTasks),
                {
                    encoding: "utf8",
                    flag: "w",
                },
                (err, data) => {
                    if (err) {
                        return res.status(500).send("Server error");
                    } else {
                        res.status(201).json(data);
                    }
                }
            );
        } else {
            let message = Validator.validateTask(body).message;
            return res.status(400).send(message);
        }
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

app.put("/tasks/:id", (req, res) => {
    try {
        const body = req.body;
        const taskId = req.params.id;
        let findDataFromId = taskData.tasks.find((task) => task.id == taskId);
        if (Validator.validateTask(body)) {
            if (findDataFromId != null) {
                findDataFromId.title = body.title;
                findDataFromId.description = body.description;

                if (typeof body.completed === 'boolean') {
                    findDataFromId.completed = body.completed;
                } else {
                    return res.status(400).send("Validation Error: 'completed' should be a boolean");
                }

                fs.writeFile(
                    "./task.json",
                    JSON.stringify(taskData),
                    {
                        encoding: "utf8",
                        flag: "w",
                    },
                    (err, data) => {
                        if (err) {
                            return res.status(500).send("Error writing task.json");
                        } else {
                            return res.status(200).send("Task Updated Successfully");
                        }
                    }
                );
            } else {
                return res.status(404).send("ID Not Found");
            }
        } else {
            return res.status(400).send("Validation Error: Please fill all the required fields");
        }
    } catch (err) {
        return res.status(500).send(err);
    }
});


app.delete('/tasks/:id', (req, res) => {
    try {
        const taskId = req.params.id;
        const taskIndex = taskData.tasks.findIndex(task => task.id == taskId);
        if (taskIndex != -1) {
            taskData.tasks.splice(taskIndex, 1);
            fs.writeFile('./task.json', JSON.stringify(taskData), { encoding: "utf-8", flag: "w" }, (err, data) => {
                if (err) {
                    return res.status(500).send("Error in writing file ", err);
                }
                else {
                    return res.status(200).send("Task deleted successfully");
                }
            })
        } else {
            return res.status(404).send("ID not Found")
        }
    } catch (err) {
        return res.status(500).send(err);
    }
})
app.listen(port, (err) => {
    if (err) {
        return console.log('Something bad happened', err);
    }
    console.log(`Server is listening on ${port}`);
});



module.exports = app;