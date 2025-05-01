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

// ✏️ Update Blog
const updateBlog = async (req, res) => {
  const { title, content, image } = req.body;

  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // 🛡️ Check if the logged-in user is the blog's author
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message:
          "You're not allowed to edit this blog. Only the author can update it.",
      });
    }

    // ✏️ Update the fields
    blog.title = title || blog.title;
    blog.content = content || blog.content;
    blog.image = image !== undefined ? image : blog.image;

    const updatedBlog = await blog.save();
    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({
      message: "Server error while updating blog",
      error: error.message,
    });
  }
};

// 🗑️ Delete Blog
const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message:
          "You're not allowed to delete this blog. Only the author can delete it.",
      });
    }

    await blog.deleteOne();

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Server error while deleting blog",
      error: error.message,
    });
  }
};

// 📚 Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find()
      .populate("author", "_id username") // 👤 Include author info
      .sort({ createdAt: -1 }); // 🕒 Newest first

    res.json(blogs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while fetching blogs", error });
  }
};

// 🔍 Get Single Blog
const getSingleBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id)
      .populate("author", "_id username") // 👤 Populate author
      .populate("comments.user", "_id username"); // 💬 Populate comment users

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.json(blog);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server error while fetching blog", error });
  }
};

export { createBlog, updateBlog, deleteBlog, getAllBlogs, getSingleBlog };
