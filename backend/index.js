const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = 5000
const cors = require('cors')
const todoRouter = require('./routes/todos')
const dbconnect = require('./db')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())
app.get('/', (req, res) => {
    return res.status(200).send(new Date().toString())

})
app.use("/todo", todoRouter)



app.listen(PORT, async () =>{
    await dbconnect();
    console.log("server is running at 5000")
    console.log("db connected")
})