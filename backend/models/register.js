const mongoose= require('mongoose')

const register_schema= new mongoose.Schema(
{
    firstname:{
        type:String,
        required:true,
    },
    lasttname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    }
}
)

const Register= mongoose.model('Register',register_schema)

module.exports= Register;