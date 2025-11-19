import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";

export async function GET(_req, { params }) {
  const { username } = params || {};
  if (!username) return NextResponse.json({ message: "Username required" }, { status: 400 });
  await dbConnect();
  const user = await UserModel.findOne({ username });
  if (!user || !user.resume || !user.resume.data) {
    return NextResponse.json({ message: "Resume not found" }, { status: 404 });
  }
  const headers = new Headers();
  headers.set("Content-Type", user.resume.mimetype || "application/octet-stream");
  headers.set("Cache-Control", "public, max-age=60, s-maxage=300, stale-while-revalidate=600");
  return new NextResponse(user.resume.data, { headers });
}


