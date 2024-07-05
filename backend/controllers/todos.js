let arr = require('../data')
const Todo = require('../models/todo')

// CRUD
// cons resp = []
async function getTodos(req, res) {
    console.log("I am in get Todos")
    const resp = await Todo.find()
    res.send({ message: "all todos", status: 200, data: resp })
}

async function createTodo(req, res) {
    console.log('...create', req.body)
    const { title, desc } = req.body
    const resp = await Todo.create({
        title: title,
        desc: desc
    })
    console.log(resp)
    res.send({ message: "todo created", status: 201, res: resp })
}

async function updateTodo(req, res) {
    console.log("updateTodo", req.body)
    const { _id, isEdit, title, desc } = req.body
    const resp = await Todo.findByIdAndUpdate(_id, { isEdit, title, desc })
    console.log(resp)
    res.send({ message: "todo update", status: 200, res: resp._id })

}

async function deleteTodo(req, res) {

    console.log("delete", req.body)
    const { _id } = req.body
    const resp = await Todo.findByIdAndDelete(_id, { _id })
    console.log(resp)
    res.send({ message: "todo delete", status: 200, res: resp })

}

async function deleteAllTodo(req, res) {
    console.log("delt all", req.body)
    const resp = await Todo.deleteMany()
    
    res.send({ message: "delete all todos" })

}
module.exports = { getTodos, createTodo, updateTodo, deleteTodo, deleteAllTodo } 