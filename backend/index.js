const PORT=3000;
//require('dotenv').config()
const express= require('express');
const cors= require('cors')
const app= express();
const user_route= require('./routes/users');
//const connectDb = require('./db/connect');
app.use(cors())
app.use(express.json())

app.use('/',user_route)


app.get('/users', async (req,res)=>{

    const client= new MongoClient(URI);

    try {
       await client.connect();
       const database=  client.db('app-data')
       const users= database.collection('users');
       const returnedUsers= await users.find().toArray()
        res.send(returnedUsers);
        
    } finally
    {
        await client.close();
    }
    
})





app.listen(PORT,()=>{
    console.log("listening on port ",PORT)
}
    )
