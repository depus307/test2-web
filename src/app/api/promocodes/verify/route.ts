import { NextResponse } from "next/server";
import dbConnect from "@/lib/db/connection";
import PromoCode from "@/models/PromoCode";
import User from "@/models/User";
import { verifyToken } from "@/lib/utils";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const { code } = await req.json();

    if (!code) {
      return NextResponse.json(
        { message: "Promo code is required" },
        { status: 400 }
      );
    }

    // Get user from token
    const token = cookies().get("token")?.value;
    if (!token) {
      return NextResponse.json(
        { message: "Not authenticated" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json(
        { message: "Invalid token" },
        { status: 401 }
      );
    }

    // Connect to database
    await dbConnect();

    // Find promo code
    const promoCode = await PromoCode.findOne({ 
      code: code.toUpperCase(),
      isActive: true,
      validUntil: { $gte: new Date() }
    });

    if (!promoCode) {
      return NextResponse.json(
        { valid: false, message: "Invalid or expired promo code" },
        { status: 400 }
      );
    }

    // Check if max uses is reached
    if (promoCode.maxUses > 0 && promoCode.currentUses >= promoCode.maxUses) {
      return NextResponse.json(
        { valid: false, message: "Promo code has reached maximum uses" },
        { status: 400 }
      );
    }

    // Update user to grant access
    await User.findByIdAndUpdate(
      decoded.id,
      { allowedAccess: true },
      { new: true }
    );

    // Increment promo code usage
    await PromoCode.findByIdAndUpdate(
      promoCode._id,
      { $inc: { currentUses: 1 } }
    );

    return NextResponse.json({
      valid: true,
      message: "Promo code verified successfully",
    });
  } catch (error) {
    console.error("Promo code verification error:", error);
    return NextResponse.json(
      { valid: false, message: "Internal server error" },
      { status: 500 }
    );
  }
} 