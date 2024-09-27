import connect from "@/lib/db";
import Blog from "@/lib/modals/blog";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await connect();
    const blogs = await Blog.find();

    return NextResponse.json({
      status: "success",
      length: blogs.length,
      data: blogs,
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
    const blog = new Blog(body);
    await blog.save();
    return NextResponse.json({
      status: "success",    
      message: "Add New Blog Successfully!!!",
      data: blog,
    });
  } catch (error: any) {
    console.log("🚀 ~ POST ~ error:", error);
    return NextResponse.json({
      status: "error",
      message: error.message,
    });
  }
};
