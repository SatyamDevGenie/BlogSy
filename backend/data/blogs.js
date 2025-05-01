import bcrypt from "bcryptjs";

const blogs = [
    {
      title: "Getting Started with MERN Stack",
      content: "This blog explains how to start with MongoDB, Express, React, and Node.js.",
      image: "https://example.com/mern.jpg",
      // author will be added dynamically using seed script after inserting users
    },
    {
      title: "Understanding React Hooks",
      content: "React hooks allow you to use state and lifecycle features in functional components.",
      image: "https://example.com/hooks.png",
      // author will be added dynamically
    },
  ];
  
  export default blogs;
  