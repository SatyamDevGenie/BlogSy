import bcrypt from "bcryptjs";

const blogs = [
    {
      title: "Getting Started with MERN Stack",
      content: "This blog explains how to start with MongoDB, Express, React, and Node.js.",
      image: "/images/mern.png",
      // author will be added dynamically using seed script after inserting users
    },
  ];
  
  export default blogs;
  