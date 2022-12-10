const mongoose = require('mongoose')    

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL, {
            // useCreateIndex: true,
            // useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlparser: true,
        })
        console.log("db is connected succesflly");
    }catch(error){
        console.log(`Error ${error.message}`);
    }
} 

module.exports = dbConnect;