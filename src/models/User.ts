import mongoose, { Schema, Document } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  coins: number;
  lastRequest?: Date;
  lastReset?: Date; // <- add this
}

export type IUserDocument = IUser & Document;

const UserSchema = new Schema<IUserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 3 },
  lastRequest: { type: Date, default: null },
  lastReset: { type: Date, default: null }, // <- add this
});

export const User =
  mongoose.models.User || mongoose.model<IUserDocument>("User", UserSchema);
