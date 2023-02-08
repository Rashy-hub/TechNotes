const mongoose= require ('mongoose')

const connectDB = async ()=> {
    mongoose.set("strictQuery", false); // solving deprecation warning 
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (error) {
        console.log(error)
    }
}

module.exports=connectDB