import { NextResponse } from "next/server";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcrypt";


export async function POST(req) {
    
    try {
        const { username, email, password } = await req.json();
        if(!username || !email || !password){
            return NextResponse.json({message:"All feilds are required"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await dbConnect();
        await UserModel.create({ username, email, password: hashedPassword });
        return NextResponse.json({ message: "User created successfully" });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ message: "User creation failed" }, { status: 500 });
    }
}