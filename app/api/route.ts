import connnectToDatabase from "@/db";
import { NextResponse } from "next/server";

export async function GET() {
	connnectToDatabase();
	return NextResponse.json(
		{
			message: "all good",
		},
		{
			status: 200,
		},
	);
}
