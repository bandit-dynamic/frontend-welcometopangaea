import bcrypt from "bcrypt";
import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, name, password } = body;

  // Check if user with this email already exists
  const existingUser = await prisma.user.findUnique({
    where: { email: email },
  });

  if (existingUser) {
    // If user with email already exists, return error response
    return NextResponse.json({
      success: false,
      message: "Email is already in use",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  // If user with email does not exist, create new user
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      user: user,
    });
  } catch (error) {
    console.error('Error creating user:', error);
    // Return generic error message
    return NextResponse.json({
      success: false,
      message: 'An error occurred while creating the user.',
    });
  }
}
