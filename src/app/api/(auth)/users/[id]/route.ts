import { NextResponse } from "next/server";
import connect from "@/lib/db";
import User from "@/lib/modals/user";

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

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
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
      data: updatedUser,
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

    const user = await User.findById(id);

    if (!user) {
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
      data: user,
    });
  } catch (error: any) {
    console.error("🚀 ~ GET ~ error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while fetching the user.",
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

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
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
      message: "User deleted successfully.",
    });
  } catch (error: any) {
    console.error("🚀 ~ DELETE ~ error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "An error occurred while deleting the user.",
        error: error.message,
      },
      { status: 500 }
    );
  }
};
