const {MongoClient}= require('mongodb');
const {v1:uuidv4}= require('uuid');
const URI= 'mongodb+srv://metaverse:Testing%40121003@cluster0.1bvoswa.mongodb.net/Cluster0?retryWrites=true&w=majority'
const jwt=require('jsonwebtoken')
const bcrypt= require('bcrypt')
const homepage=(req,res)=>{
    res.send('HOMEPAGE RENDER')
}


const login=async(req,res)=>{
    const client= new MongoClient(URI);
    const email= req.body.email;
    const Password= req.body.password;
    
    try {
        client.connect();
        const database= client.db('app-data');
        const users= database.collection('users');
    
        //find user by email
        const user= await users.findOne({email})
        const correct_pass= await bcrypt.compare(Password,user.hashedPassword);
        if(user && correct_pass)
        {
            const token= jwt.sign(user,email,
                {
                    expiresIn:60*24
                })
            res.status(201).json({token, userId: user.user_id,email})
        }
        else{
            res.status(400).send('invalid credentials');
        }
       
    
    } catch (error) {
        console.log(error);  
    }
    
    
    }
const register=async (req,res)=>{

        const client= new MongoClient(URI);
        const email= req.body.email;
        const Password= req.body.password;
        // console.log(email,Password);
        
        const generateuserid= uuidv4()
        const hashedpassword= await bcrypt.hash(Password,10);
        try {
             client.connect();
           const database=  client.db('app-data')
           const users= database.collection('users');
           const existinguser= await users.findOne({email})
    
           if(existinguser)
           {
            return res.status(409).send('user already exists, please login')
           }
    
           const sanatizedEmail= email.toLowerCase();
           const data={
            user_id:generateuserid,
            email: sanatizedEmail,
            hashedPassword: hashedpassword
           } 
          const inserteduser=  await users.insertOne(data)
           const token= await jwt.sign(inserteduser,sanatizedEmail,
            {
                expiresIn:60*24,
            }
            )
            res.status(201).json({token, userId: generateuserid, email: sanatizedEmail})
    
        }
        catch (error) {
           console.log(error);
    
        }
    
    }   

module.exports={homepage,register,login}



