import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { User } from "@/models/User";
import { createToken, resetCoinsIfNeeded } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { action, email, password } = await req.json();

    if (!action || !email)
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });

    if (action === "register") {
      if (!password)
        return NextResponse.json(
          { error: "Password required" },
          { status: 400 }
        );

      const existing = await User.findOne({ email });
      if (existing)
        return NextResponse.json(
          { error: "User already exists" },
          { status: 400 }
        );

      const hashed = await bcrypt.hash(password, 10);
      const user = await User.create({ email, password: hashed });
      const token = createToken(user._id.toString());

      return NextResponse.json({ token, coins: user.coins });
    }

    if (action === "login") {
      if (!password)
        return NextResponse.json(
          { error: "Password required" },
          { status: 400 }
        );

      const user = await User.findOne({ email });
      if (!user)
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );

      const valid = await bcrypt.compare(password, user.password);
      if (!valid)
        return NextResponse.json(
          { error: "Invalid credentials" },
          { status: 401 }
        );

      await resetCoinsIfNeeded(user);

      const token = createToken(user._id.toString());
      return NextResponse.json({ token, coins: user.coins });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
