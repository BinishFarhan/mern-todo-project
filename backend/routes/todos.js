const express = require('express')
const arr = require('../data')
const todoRouter = express.Router()
const {getTodos , createTodo , deleteTodo , updateTodo, deleteAllTodo} = require('../controllers/todos.js')

todoRouter
.get('/', getTodos)
.post('/add' , createTodo)
.post('/', updateTodo)
.post('/delete' , deleteTodo)
.post('/deleteAll' , deleteAllTodo)

module.exports = todoRouter