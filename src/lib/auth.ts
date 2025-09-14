import { Document } from "mongoose";
import jwt from "jsonwebtoken";
import { User, IUser } from "@/models/User";
import { connectDB } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

// Extend IUser with Document
type IUserDocument = IUser & Document;

// Generate JWT token
export function createToken(userId: string) {
  return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: "7d" });
}

// Reset daily coins if a new day
export async function resetCoinsIfNeeded(user: IUserDocument) {
  const now = new Date();
  const last = new Date(user.lastRequest);

  if (
    now.getUTCFullYear() !== last.getUTCFullYear() ||
    now.getUTCMonth() !== last.getUTCMonth() ||
    now.getUTCDate() !== last.getUTCDate()
  ) {
    user.coins = 3; // reset daily limit
    await user.save();
  }
}

// Check and decrement user coins
export async function checkCoins(userId: string) {
  await connectDB();
  const user = (await User.findById(userId)) as IUserDocument;
  if (!user) throw new Error("User not found");

  await resetCoinsIfNeeded(user);

  if (user.coins <= 0) throw new Error("No credits left today");

  user.coins -= 1;
  user.lastRequest = new Date();
  await user.save();

  return user.coins;
}
