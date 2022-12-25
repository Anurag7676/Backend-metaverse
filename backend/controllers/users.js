const {v1:uuidv4}= require('uuid');
const Users_register= require('../models/register');
const jwt=require('jsonwebtoken')
const bcrypt= require('bcrypt')
const { Mongoose, default: mongoose } = require('mongoose');
const connectDb = require('../db/Users');
const homepage=(req,res)=>{
    res.send('babes its working')
}

const registered= async(req,res)=>
{
    await connectDb(process.env.URI)
   const {firstname,lastname,email,password,confirmpassword}=req.body;
   if(password!==confirmpassword)
   {
    return res.status(422).json({err:"password not match"})  ;
   }

   if(!firstname||!lastname||!email||!password||!confirmpassword)
    {
        return res.status(422).json({error:"please fill all the field properly"});
    }
     
    try {
       const userExist=await Users_register.findOne({email:email})
        
         if(userExist){
               return  res.status(422).json({error:"email already exist"});
            }

        const user= new Users_register({firstname,lastname,email,password,confirmpassword})
        
        const newuser= await user.save();            
        res.status(201).json({msg:"user created succesfully"})
           
        }
         catch (error) {
            console.log(err);
        }


}

const login= async(req,res)=>
{
     await connectDb(process.env.URI);
    const {email,password}=req.body
  
    try {
        
        if(email.length==0 ||password.length==0)
        {
                return res.json({msg:"error please fill the fields properly"});
    
        }
     const user=await Users_register.findOne({email:email});
    if(user)
    {
        const ismatch= await bcrypt.compare(password,user.password)


        if(!ismatch)
        {

            res.status(400).json({error:"Email or password doesn't match"})
        }
        else
        {
           const token= await user.generatetoken(); 
           res.cookie('jwt',token);
           res.status(200).json({msg:'user logged in sucessfully'})
        }
    }
    else
    {
        res.status(400).json({error:`Email or password doesn't match`});
    }
     
    }
     catch (error) {
        console.log(error)
        
    }
   
}






// const login=async(req,res)=>{
// //     const client= new MongoClient(URI);
// //     const email= req.body.email;
// //     const Password= req.body.password;
    
// //     try {
// //         client.connect();
// //         const database= client.db('app-data');
// //         const users= database.collection('users');
    
// //         //find user by email
// //         const user= await users.findOne({email})
// //         const correct_pass= await bcrypt.compare(Password,user.hashedPassword);
// //         if(user && correct_pass)
// //         {
// //             const token= jwt.sign(user,email,
// //                 {
// //                     expiresIn:60*24
// //                 })
// //             res.status(201).json({token, userId: user.user_id,email})
// //         }
// //         else{
// //             res.status(400).send('invalid credentials');
// //         }
       
    
// //     } catch (error) {
// //         console.log(error);  
// //     }
    
    
//     }




module.exports={homepage,login,registered}



