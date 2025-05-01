import Blog from "../models/Blog.js";

// 📌 Create Blog
const createBlog = async (req, res) => {
  const { title, content, image } = req.body;

  try {
    const blog = new Blog({
      title,
      content,
      image,
      author: req.user._id,
    });

    const createdBlog = await blog.save();

    // 🔁 Populate author with _id and username
    const populatedBlog = await createdBlog.populate("author", "_id username");

    res.status(201).json(createdBlog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while creating blog", error });
  }
};


export {createBlog}