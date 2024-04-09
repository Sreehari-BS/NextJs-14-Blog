import connectDB from "@/lib/utils";
import Post from "@/lib/models/postModel";
import {NextResponse} from "next/server"

const GET = async (req) => {
  try {
    connectDB();
    const posts = await Post.find();
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch posts!");
  }
};

export { GET };
