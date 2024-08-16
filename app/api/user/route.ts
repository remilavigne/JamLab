import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { hash } from "bcrypt";

// Create Register User API
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, password } = body;

    // Check if email aleady exist
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json({ user: null, message: "User with this email already exists"}, { status: 409} )
    }

    //Hash password bcrypt
    const hashedPassword = await hash(password, 10);

    //Create new user in the db
    const newUser = await db.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword
      }
    })

    const { password: newuserPassword, ...rest } = newUser;

    return NextResponse.json({ user: rest, message: "User created successfully" }, { status: 201 });
  } catch(error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}
