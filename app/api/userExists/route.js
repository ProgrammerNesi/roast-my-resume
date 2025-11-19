import { NextResponse } from "next/server";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";



export async function POST(req){
    try{
        await dbConnect();
        const { email, username } = await req.json();
        const user1 = await UserModel.findOne({ email });
        const user2 = await UserModel.findOne({ username });
        const emailExists = user1;
        const usernameExists = user2;
        const exists = emailExists || usernameExists;
        return NextResponse.json({ exists, emailExists, usernameExists });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "Failed to check user existence" }, { status: 500 });
    }
}