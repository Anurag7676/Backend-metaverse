const mongoose= require('mongoose');
mongoose.set('strictQuery', false);

const connectDb=(URI)=>{

    return mongoose.connect(URI,
        );  
};

module.exports=connectDb;