import bcrypt from "bcryptjs";

const users = [
  {
    username: "Admin",
    email: "admin@gmail.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true, // ✅ Admin user
  },
  {
    username: "Satyam",
    email: "satyam@gmail.com",
    password: bcrypt.hashSync("123", 10),
  },
];

export default users;
