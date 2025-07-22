import bcrypt from "bcryptjs";

const users = [
  {
    username: "Satyam",
    email: "satyamsawant54@gmail.com",
    password: bcrypt.hashSync("@Satyam#1234", 10),
    isAdmin: true, // ✅ Admin user
  },
  {
    username: "Aftab",
    email: "aftab@gmail.com",
    password: bcrypt.hashSync("123", 10),
  },
  {
    username: "Harsh",
    email: "harsh@gmail.com",
    password: bcrypt.hashSync("123", 10),
  },
  {
    username: "Akash",
    email: "akash@gmail.com",
    password: bcrypt.hashSync("123", 10),
  },
];

export default users;
