const mongoose= require('mongoose')

// mongodb://localhost:27017/cyberShooraTask
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const logInSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)
module.exports=LogInCollection