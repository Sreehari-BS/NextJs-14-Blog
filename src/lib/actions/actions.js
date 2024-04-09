"use server";

import User from "../models/userModels";
import connectDB from "../utils";
import bcrypt from "bcrypt";
import { signIn, signOut } from "../auth/auth";
import Post from "../models/postModel";
import { revalidatePath } from "next/cache";

const handleGithubLogin = async () => {
  await signIn("github");
};

const handleLogout = async () => {
  await signOut();
};

const registerUser = async (previousState, formData) => {
  const { userName, email, password, confirmPassword } =
    Object.fromEntries(formData);

  if (password !== confirmPassword) {
    return { error: "Passwords do not match" };
  }

  try {
    connectDB();

    const user = await User.findOne({ userName });

    if (user) {
      return { error: "Username already exists" };
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

const userLogin = async (previousState, formData) => {
  const { userName, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { userName, password });
  } catch (error) {
    console.log(error);
    if (error.type === "CredentialsSignin") {
      return { error: "Invalid Username or Password!" };
    }
    throw error;
  }
};

const addPost = async (previousState, formData) => {
  const { title, desc, slug, userId } = Object.fromEntries(formData);

  try {
    connectDB();
    const newPost = new Post({
      title,
      desc,
      slug,
      userId,
    });

    await newPost.save();
    console.log("Post saved to DB");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

const deletePost = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await Post.findByIdAndDelete(id);
    console.log("Post Deleted from DB");
    revalidatePath("/blog");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

const addUser = async (previousState, formData) => {
  const { userName, email, password, img } = Object.fromEntries(formData);
  console.log(userName, email,password,img)

  try {
    connectDB();
    const newUser = new User({
      userName,
      email,
      password,
      img,
    });

    await newUser.save();
    console.log("Post saved to DB");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

const deleteUser = async (formData) => {
  const { id } = Object.fromEntries(formData);
  try {
    await Post.deleteMany({ userId: id });
    await User.findByIdAndDelete(id);
    console.log("User Deleted from DB");
    revalidatePath("/admin");
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong" };
  }
};

export {
  handleGithubLogin,
  handleLogout,
  registerUser,
  userLogin,
  addPost,
  deletePost,
  addUser,
  deleteUser,
};
