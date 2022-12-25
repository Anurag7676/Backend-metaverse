const mongoose= require('mongoose')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken');
require('dotenv').config()
const user_schema= new mongoose.Schema(
{
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:false,
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
    },
    tokens:[
            {
            token:{ type:String }

            }
        ]
    
}
)

user_schema.pre('save',async function(next){
  
    if(this.isModified('password'))
    {
        this.password= await bcrypt.hash(this.password,12);
        this.confirmpassword=await bcrypt.hash(this.confirmpassword,12);

    }
    next();

})

//generating json token via method of instance

user_schema.methods.generatetoken= async function()
{
    try {
        let gen_token = jwt.sign({_id:this._id},process.env.SECRET_KEY)
        this.tokens= this.tokens.concat({token:gen_token})
        await this.save();
        return gen_token;
    } catch (error) {
        console.log(error);
    }

}




const Users_register= mongoose.model('Users_register',user_schema)

module.exports= Users_register;