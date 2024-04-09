import User from "../models/userModels";
import connectDB from "../utils";
import { unstable_noStore as noStore } from "next/cache";

const getSingleUser = async (id) => {
  noStore();
  try {
    connectDB();
    const user = await User.findById(id);
    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch user!");
  }
};

const getAllUsers = async () => {
  try {
    connectDB();
    const users = await User.find();
    return users;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch users!");
  }
};

export { getAllUsers, getSingleUser };
