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
    email: "satyamsawant54@gmail.com",
    password: bcrypt.hashSync("123456", 10),
  },
];

export default users;
