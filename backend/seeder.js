import colors from "colors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import users from "./data/users.js";
import User from "./models/User.js";

dotenv.config();
connectDB();

const importUsers = async () => {
  try {
    await User.deleteMany(); // 🧹 Clear existing users
    const createdUsers = await User.insertMany(users); // ➕ Insert new users
    console.log("✅ 👥 Users Imported!".green.inverse);
    process.exit();
  } catch (err) {
    console.error(`❌ 🔴 ${err}`.red.inverse);
    process.exit(1);
  }
};

const destroyUsers = async () => {
  try {
    await User.deleteMany(); // 🗑️ Clear users
    console.log("🧨 🔴 Users Destroyed!".red.inverse);
    process.exit();
  } catch (err) {
    console.error(`❌ 🔴 ${err}`.red.inverse);
    process.exit(1);
  }
};

// ℹ️ Usage
// Run with: node seeder.js       → 👥 Import users
// Run with: node seeder.js -d    → 🧨 Destroy users
if (process.argv[2] === "-d") {
  destroyUsers();
} else {
  importUsers();
}
