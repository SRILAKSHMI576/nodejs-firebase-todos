var express = require('express')
var todoRouter = express.Router()
const Firebase = require('../Firebase/config')
const uuidv4 = require('uuid/v4');

const todoList = []
// define the home page route
todoRouter.get('/', function(req, res) {
  res.json(todoList);
})

todoRouter.post("/", function(req, res) {
  const todo = {
    text: req.body.text,
    author: req.body.author,
    completed: false,
    created_at: Date.now(),
    updated_at: Date.now(),
  }

  const todoUUID = "todo_" + uuidv4()

  Firebase.db().ref("todo").update({
    [todoUUID]: todo
  }).then(() => {
    res.send(todo)
  }).catch(e => {
    res.status(404).send()
  });
})

module.exports = todoRouter