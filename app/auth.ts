import User from "@/model/user.model";
import { checkPassword } from "@/utils/bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";
import env from "./env";

export const authOptions: NextAuthOptions = {
	providers: [
		GitHubProvider({
			clientId: env.GITHUB_ID,
			clientSecret: env.GITHUB_SECRET,
		}),
		CredentialsProvider({
			credentials: {
				email: {
					type: "email",
					label: "Email",
					placeholder: "Enter your email",
				},
				password: {
					type: "password",
					label: "Password",
					placeholder: "Enter your password",
				},
			},
			async authorize(credentials) {
				const email = credentials?.email;
				const password = credentials?.password;
				try {
					if (!email || !password) {
						throw new Error("Email and password are required");
					}

					const user = await User.findOne({
						email,
					})
						.select("+password")
						.lean();
					if (!user) throw new Error("User not found");

					const isValidPassword = await checkPassword(
						user.password,
						password,
					);
					if (!isValidPassword)
						throw new Error("Invalid credentials.");

					console.log("found user", user);
					return {
						...user,
						_id: user._id.toString(),
					};
				} catch (error) {
					if (error instanceof Error) {
						throw new Error(error.message);
					}
					throw new Error("An error occurred during authentication.");
				}
			},
		}),
	],
	debug: env.NODE_ENV === "dev",
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				token._id = user._id;
				token.email = user.email;
			}
			return token;
		},
		session({ session, token }) {
			if (session.user) {
				session.user._id = token._id as string;
				session.user.email = token.email as string;
			}
			return session;
		},
	},
	secret: env.AUTH_SECRET,
	pages: {
		signIn: "/signin",
	},
};
