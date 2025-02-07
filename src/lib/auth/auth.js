import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import connectDB from "../utils";
import User from "../models/userModels";
import bcrypt from "bcrypt";
import { authConfig } from "../auth.config/auth.config";

const login = async (credentials) => {
  try {
    connectDB();

    const user = await User.findOne({ userName: credentials.userName });

    if (!user) {
      throw new Error("Wrong credentials!");
    }

    const checkPassword = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!checkPassword) {
      throw new Error("Wrong credentials!");
    }

    return user;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to login!");
  }
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "github") {
        connectDB();
        try {
          const user = await User.findOne({ email: profile.email });

          if (!user) {
            const newUser = new User({
              userName: profile.login,
              email: profile.email,
              img: profile.avatar_url,
            });
            await newUser.save();
          }
        } catch (error) {
          console.log(error);
          return false;
        }
      }
      return true;
    },
    ...authConfig.callbacks,
  },
});
