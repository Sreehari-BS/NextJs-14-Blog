import connectDB from "@/lib/utils";
import Post from "@/lib/models/postModel";
import { NextResponse } from "next/server";

const GET = async (req, { params }) => {
  const { slug } = params;
  try {
    connectDB();
    const post = await Post.findOne({ slug });
    return NextResponse.json(post);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch post!");
  }
};

const DELETE = async (req, { params }) => {
  const { slug } = params;
  try {
    connectDB();
    await Post.deleteOne({ slug });
    return NextResponse.json("Post Deleted.");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete post!");
  }
};

export { GET, DELETE };
