import * as z from "zod";

export const signUpSchema = z.object({
	username: z
		.string()
		.min(3, { error: "username at least contains 3 characters" })
		.max(30, {
			error: "username at least contains 30 characters",
		}),
	email: z.email({ error: "Email is required" }),
	password: z
		.string({ error: "Password is required" })
		.min(1, "Password is required")
		.min(8, "Password must be more than 8 characters")
		.max(32, "Password must be less than 32 characters"),
});
