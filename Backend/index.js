const express = require('express');
const types = require('./types');
const { todo } = require('./db');
const app = express();

app.use(express.json());

app.post("/todo", async function(req, res) {
    const CreatePayload = req.body;
    console.log(req.body);
    const ParsedPayload = types.createTodo.safeParse(CreatePayload);
    if (!ParsedPayload.success) {
        res.status(411).json({ msg: "Your parameters are wrong" });
        return;
    }
    await todo.create({
        title: CreatePayload.title,
        description: CreatePayload.description,
        completed: false
    });

    res.json({ msg: "Todo Created" });
});

app.get("/todos", async function (req, res) {
    console.log("hi");
    const todos = await todo.find({});
    res.json(todos);
});

app.put("/completed", async function(req, res) {
    const CreatePayload = req.body;
    const ParsedPayload = types.updateTodo.safeParse(CreatePayload);
    if (!ParsedPayload.success) {
        res.status(411).json({ msg: "Your parameters are wrong" });
        return; 
    }
    await todo.findByIdAndUpdate(
        CreatePayload.id,
        { $set: { completed: true } }
    );

    res.json({ msg: "We have updated" });
});

app.listen(3000);
