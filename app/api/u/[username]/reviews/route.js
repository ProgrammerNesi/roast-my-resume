import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export async function GET(req, { params }) {
  try {
    const { username } = await params || {};
    const session = await getServerSession(authOptions);
    if (!session?.user?.username) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    if (session.user.username !== username) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }
    if (!username) return NextResponse.json({ message: "Username required" }, { status: 400 });

    await dbConnect();
    const user = await UserModel.findOne({ username }).lean();
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    // Return reviews with ratings
    const reviews = user.review || [];
    
    return NextResponse.json({ 
      success: true, 
      reviews: reviews.reverse() // Show newest first
    });
  } catch (err) {
    console.error("fetch reviews error", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
