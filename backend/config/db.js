import mongoose from "mongoose"; // 🗄️ For interacting with MongoDB
import chalk from "chalk"; // 🎨 For colored console output

// Function to connect to MongoDB using Mongoose
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database using the URI from environment variables
        const conn = await mongoose.connect(process.env.MONGO_URI); 
        console.log(chalk.cyanBright(`MongoDB connected: ${conn.connection.host}`)); // 🌐 Log successful connection with cyan color
    } catch (err) {
        // Log the error message in red if connection fails
        console.error(chalk.redBright(`Error: ${err.message}`)); // ❌ Error message
        process.exit(1); // 🔴 Exit process with failure code
    }
};

export default connectDB; // 🔗 Export the function for use in other parts of the app
