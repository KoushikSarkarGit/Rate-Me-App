import mongoose  from "mongoose";


interface connectionObject {
    isConnected ? : Number
}


const connection: connectionObject = {};


async function dbConnect() {
    if(connection.isConnected){
        console.log("Already Connected to Database")
        return;
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI ||'', {})
        console.log("connected to Rate Me App")
        console.log(db)
        
    } catch (error) {
        console.log("Database Connection Failed", error)
        process.exit(1);
    }
}