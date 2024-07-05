const mongoose = require('mongoose')

async function dbconnect(){
// database connection
mongoose.connect("mongodb+srv://binishfarhan89:vamp1989@cluster0.vzdef1c.mongodb.net/mern_todo")
}

module.exports = dbconnect