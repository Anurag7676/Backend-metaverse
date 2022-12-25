require('dotenv').config()
const express= require('express');
const cors= require('cors')
const app= express();
const user_route= require('./routes/users');
app.use(cors())
app.use(express.json())

app.use('/',user_route)

app.listen(process.env.Port,()=>{
    console.log(`listening on port ${process.env.Port}`)
}
    )
