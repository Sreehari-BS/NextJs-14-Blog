import Post from "../models/postModel";
import connectDB from "../utils";

const getAllPosts = async () => {
  try {
    connectDB();
    const posts = await Post.find();
    return posts;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts!");
  }
};

const getSinglePost = async (slug) => {
  try {
    connectDB();
    const post = await Post.findOne({ slug });
    return post;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post!");
  }
};

export { getAllPosts, getSinglePost };
