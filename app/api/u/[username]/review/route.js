import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export async function POST(req, { params }) {
  try {
    const { username } = params || {};
    

    if (!username) return NextResponse.json({ message: "Username required" }, { status: 400 });
    const body = await req.json().catch(() => ({}));
    const content = (body?.content || "").toString().trim();
    const rating = parseInt(body?.rating) || 5;
    
    if (!content) return NextResponse.json({ message: "Content required" }, { status: 400 });
    if (rating < 1 || rating > 5) return NextResponse.json({ message: "Rating must be between 1 and 5" }, { status: 400 });

    await dbConnect();
    const user = await UserModel.findOne({ username });
    if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

    user.review.unshift({ content, rating });
    await user.save();

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("submit review error", err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}


