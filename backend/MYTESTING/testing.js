//index db conenction
const start=async ()=>{
    await connectDb(process.env.MONGODB_URL)
    console.log('connected')
    }
    
    start();