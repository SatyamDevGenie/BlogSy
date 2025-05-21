import bcrypt from "bcryptjs";

const blogs = [
  {
    title: "Artificial Intelligence",
    content:
      "Artificial Intelligence (AI) is a branch of computer science focused on creating systems that can perform tasks that typically require human intelligence. These tasks include understanding natural language, recognizing patterns, making decisions, and even demonstrating creativity. AI is categorized into narrow AI, which is designed for specific tasks, and general AI, which aims to perform any cognitive task a human can. With advancements in machine learning, deep learning, and neural networks, AI is transforming industries like healthcare, finance, transportation, and education.",
    image: "/images/ai.jpg",
  },
  {
    title: "Nodejs - Javascript",
    content:
      "Node.js is a powerful, open-source, cross-platform JavaScript runtime environment that allows developers to run JavaScript code on the server side. It uses an event-driven, non-blocking I/O model that makes it efficient and lightweight. Node.js is built on Chrome's V8 JavaScript engine and is widely used for building scalable, high-performance server-side and networking applications. From RESTful APIs to real-time applications like chat apps and streaming services, Node.js has become a staple in modern web development.",
    image: "/images/node.jpg",
  },
  {
    title: "DevOps Practices",
    content:
      "DevOps is a cultural and professional movement that emphasizes collaboration between software developers and IT operations teams. Its goal is to automate and integrate the processes of software development and IT operations, enabling faster development cycles and more reliable releases. Core DevOps practices include continuous integration (CI), continuous delivery (CD), infrastructure as code (IaC), automated testing, and proactive monitoring. DevOps fosters a mindset of shared responsibility, transparency, and continuous improvement across the development lifecycle.",
    image: "/images/devops.jpg",
  },
  {
    title: "Software Development",
    content:
      "Software development is a structured process of designing, coding, testing, and maintaining applications or systems. It begins with requirement analysis, followed by planning, software design, implementation, testing, deployment, and maintenance. Modern development methodologies like Agile, Scrum, and DevOps aim to increase flexibility, quality, and speed. Developers use a variety of tools, languages, and frameworks depending on the project type — web, mobile, desktop, embedded systems, or enterprise applications.",
    image: "/images/software.jpg",
  },
  {
    title: "Data Structures & Algorithms",
    content:
      "Data Structures and Algorithms (DSA) form the backbone of computer science and programming. Data structures like arrays, linked lists, stacks, queues, trees, and graphs organize data for efficient access and modification. Algorithms, on the other hand, are step-by-step procedures for solving problems or performing tasks. Examples include sorting algorithms (merge sort, quicksort), searching algorithms (binary search), and graph algorithms (Dijkstra’s, BFS, DFS). Mastering DSA is essential for building optimized software and cracking technical interviews.",
    image: "/images/dsa.jpg",
  },
  {
    title: "Cyber Security Essentials",
    content:
      "Cyber Security is the practice of protecting systems, networks, and programs from digital attacks. These cyberattacks aim to access, change, or destroy sensitive information, extort money, or interrupt business processes. Key elements include network security, application security, endpoint security, identity management, and data security. Practices such as encryption, penetration testing, firewalls, anti-virus, and user awareness training play vital roles. As threats like ransomware, phishing, and zero-day exploits grow, cybersecurity remains a top priority for all organizations.",
    image: "/images/cyber.jpg",
  },
  {
    title: "Black Clover - Anime Magic",
    content:
      "Black Clover is a high-energy fantasy anime and manga series created by Yūki Tabata. It follows the story of Asta, a young boy born without any magical power in a world where magic is everything. Despite this, he dreams of becoming the Wizard King — the most powerful mage in the Clover Kingdom. With the help of his anti-magic sword and support from his rival Yuno and the Black Bulls squad, Asta overcomes tremendous odds. The series is known for its explosive battles, heartfelt friendships, and themes of persistence, rivalry, and destiny.",
    image: "/images/bg.jpg",
  },
];

export default blogs;
