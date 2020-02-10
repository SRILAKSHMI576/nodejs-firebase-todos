const express = require('express')
const todoRouter = express.Router()
const Firebase = require('../Firebase/config')
const uuidv4 = require('uuid/v4');

todoRouter.get('/', function(req, res) {
  Firebase.db().ref("todo").once("value", (snapshot) => {
    res.send(snapshot.val())
  }).catch(e => {
    res.status(404).send()
  })
})

todoRouter.get("/:id", function(req, res) {
  const id = req.params.id
  Firebase.db().ref(`todo/${id}`).once("value", (snapshot) => {
    const todo = snapshot.val()
    if (!todo) {
      res.statusMessage = "Not found"
      res.status(404).send()
      return
    }
    res.send(snapshot.val())
  }).catch(e => {
    res.status(500).send()
  })
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

todoRouter.put("/:id", function(req, res) {
  const id = req.params.id
  const todo = {
    text: req.body.text,
    author: req.body.author,
    completed: false,
    created_at: Date.now(),
    updated_at: Date.now(),
  }

  //Update the a todo
  Firebase.db().ref("todo").update({
    [id]: todo
  }).then(() => {
    res.send(todo)
  }).catch(e => {
    res.status(404).send()
  });
})

// Delete detail
todoRouter.delete("/:id", function(req, res) {
  const id = req.params.id
  Firebase.db().ref(`todo/${id}`).remove()
  .then(() => {
    res.send({status: "ok"})
  })
  .catch(e => {
    res.status(500).send()
  })
})

module.exports = todoRouter