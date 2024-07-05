const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const PORT = process.env.PORT || 5000
const cors = require('cors')
const todoRouter = require('./routes/todos.js')
const dbconnect = require('./db')


require('dotenv').config({ path: '.env' })

app.use(express.json())
app.use(cors())
dbconnect()
app.use(todoRouter)

app.get("/test", (req, res) => res.send("todo server is running on vercel"))
app.listen(PORT, () => console.log(`Server is Running on: ${PORT} `))


// app.use("/todo", todoRouter)



// app.listen(PORT, async () =>{
//     await dbconnect();
//     console.log("server is running at 5000")
//     console.log("db connected")
// })