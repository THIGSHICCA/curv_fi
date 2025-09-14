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

// Reset coins if 24 hours have passed since last reset
export async function resetCoinsIfNeeded(user: IUserDocument) {
  const now = new Date();
  const lastReset = user.lastReset || new Date(0); // fallback if never set

  const hoursSinceLastReset =
    (now.getTime() - lastReset.getTime()) / (1000 * 60 * 60);

  if (hoursSinceLastReset >= 24) {
    user.coins = 3; // reset daily coins
    user.lastReset = now;
    await user.save();
  }
}

// Check and decrement user coins
export async function checkCoins(userId: string) {
  await connectDB();
  const user = (await User.findById(userId)) as IUserDocument;
  if (!user) throw new Error("User not found");

  // Reset coins every 24 hours
  await resetCoinsIfNeeded(user);

  if (user.coins <= 0) throw new Error("No credits left today");

  user.coins -= 1;
  await user.save();

  return user.coins;
}
