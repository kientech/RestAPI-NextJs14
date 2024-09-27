import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/modals/user";

export const GET = async () => {
  try {
    await connect();
    const users = await User.find();

    return NextResponse.json({
      status: "success",
      length: users.length,
      data: users,
    });
  } catch (error: any) {
    console.log("🚀 ~ GET ~ error:", error);
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    await connect();
    const user = new User(body);
    await user.save();
    return NextResponse.json({
      status: "success",
      message: "Registered Successfully!!!",
      data: user,
    });
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
};
