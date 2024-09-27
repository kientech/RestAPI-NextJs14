import { NextResponse } from "next/server";
import connect from "@/lib/db";
import Blog from "@/lib/modals/blog";

export const PATCH = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    const id = params.id;
    const body = await req.json();
    const updateData = body;

    if (!id) {
      return NextResponse.json(
        {
          status: "error",
          message: "User ID is required for updating.",
        },
        { status: 400 }
      );
    }

    await connect();

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedBlog) {
      return NextResponse.json(
        {
          status: "error",
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "User updated successfully.",
      data: updatedBlog,
    });
  } catch (error: any) {
    console.error("🚀 ~ PATCH ~ error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while updating the user.",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connect();
    const { id } = params;

    const blog = await Blog.findById(id);

    if (!blog) {
      return NextResponse.json(
        {
          status: "error",
          message: "Blog not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      data: blog,
    });
  } catch (error: any) {
    console.error("🚀 ~ GET ~ error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while fetching the blog.",
        error: error.message,
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connect();
    const { id } = params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return NextResponse.json(
        {
          status: "error",
          message: "Blog not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      status: "success",
      message: "Blog deleted successfully.",
    });
  } catch (error: any) {
    console.error("🚀 ~ DELETE ~ error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while deleting the blog.",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
