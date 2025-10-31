// get info about user profile

import { authOptions } from "@/app/auth";
import connnectToDatabase from "@/db";
import User from "@/model/user.model";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
export async function GET(request: NextRequest) {
	try {
		await connnectToDatabase();

		const session = await getServerSession(authOptions);

		console.log("session info", session);
		if (!session || !session.user) {
			return NextResponse.json(
				{
					message: "unauthenticated, not allowed",
					success: false,
				},
				{
					status: 401,
				},
			);
		}
		const userId = session.user._id;
		const user = await User.findById(userId);
		return NextResponse.json(
			{
				user: {
					messsage: "wow",
				},
				success: true,
			},
			{
				status: 200,
			},
		);
	} catch (error) {
		console.log("profile fetch errors", error);
		return NextResponse.json(
			{
				message: "Somthing went wrong while fetching profile",
				success: false,
			},
			{
				status: 500,
			},
		);
	}
}
