import { Schema, models, model } from "mongoose";

export interface IUser {
  email: string;
  password: string;
  coins: number;
  lastRequest: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  coins: { type: Number, default: 3 },
  lastRequest: { type: Date, default: new Date(0) },
});

export const User = models.User || model<IUser>("User", UserSchema);
