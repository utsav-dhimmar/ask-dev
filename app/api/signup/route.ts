import connnectToDatabase from "@/db";
import User from "@/model/user.model";
import { signUpSchema } from "@/schema/user.schema";
import { hashPassword } from "@/utils/bcrypt";
import { parserWithZodSchema } from "@/utils/zod-validation";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		await connnectToDatabase();
		const body = await request.json();

		const validation = parserWithZodSchema(body, signUpSchema);

		if (!validation.success) {
			return NextResponse.json(
				{
					success: false,
					message: "validation failed",
					errors: validation.error,
				},
				{
					status: 400,
				},
			);
		}

		const { password, username, email } = validation.data;
		const hashedPassword = await hashPassword(password);
		const newUser = await User.create({
			username,
			email,
			password: hashedPassword,
		});

		if (!newUser) {
			throw new Error("unable to create user");
		}
		console.log(newUser);
		return NextResponse.json(
			{
				success: true,
				message: "User created successfully",
			},
			{
				status: 201,
			},
		);
	} catch (error) {
		console.log("sign up erros", error);
		return NextResponse.json(
			{
				message: "Somthing went wrong while signup",
				success: false,
			},
			{
				status: 500,
			},
		);
	}
}
