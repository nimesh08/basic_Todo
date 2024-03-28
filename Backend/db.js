const mongoose=require('mongoose');

require('dotenv').config();
console.log(process.env.DB_URI);
mongoose.connect(process.env.DB_URI)

const todoSchema=mongoose.Schema(
    {
        title:String,
        description:String
    }
)
const  todo=mongoose.model('todos',todoSchema)
module.exports={
    todo:todo
}