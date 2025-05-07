import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/connection";
import User from "@/models/User";
import { generateToken } from "@/lib/utils";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Please provide all required fields" },
        { status: 400 }
      );
    }

    // Connect to database
    await dbConnect();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 400 }
      );
    }

    // Create new user
    const user = new User({
      name,
      email,
      password,
      allowedAccess: false, // Default no access until promo code is added
    });

    await user.save();

    // Create token for user
    const token = generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    // Set cookie
    cookies().set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 week
    });

    // Return user without password
    const userWithoutPassword = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      allowedAccess: user.allowedAccess,
    };

    return NextResponse.json({
      message: "User created successfully",
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
} 