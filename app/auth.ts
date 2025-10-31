import User from "@/model/user.model";
import { checkPassword } from "@/utils/bcrypt";
import { MongooseAdapter } from "@brendon1555/authjs-mongoose-adapter";
import NextAuth from "next-auth";
import { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import env from "./env";

const providers: Provider[] = [
	GitHub,
	Credentials({
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
		authorize: async function (credentials) {
			const { email, password } = credentials;
			try {
				const user = await User.findOne({
					email,
				})
					.select("+password")
					.lean();
				if (!user) throw new Error("User not found");
				const isValidPassword = await checkPassword(
					user.password,
					password as string,
				);
				if (!isValidPassword) throw new Error("Invalid credentials.");
				console.log("found user", user);
				return {
					...user,
					_id: user._id.toString(),
				};
				// @typescript-eslint/no-unused-vars
			} catch (error) {
				return null;
			}
		},
	}),
];

export const providerMap = providers
	.map(provider => {
		if (typeof provider === "function") {
			const providerData = provider();
			return { id: providerData.id, name: providerData.name };
		} else {
			return { id: provider.id, name: provider.name };
		}
	})
	.filter(provider => provider.id !== "credentials");

export const { auth, signIn, signOut, handlers } = NextAuth({
	adapter: MongooseAdapter(env.MONGODB_URI as string),
	providers,
	debug: env.NODE_ENV === "dev" ? true : false,
	callbacks: {
		jwt({ token, user }) {
			if (user) {
				// @ts-expect-error
				token._id = user._id || user.id;
				token.email = user.email;
			}
			return token;
		},
		session({ session, token }) {
			if (session.user) {
				session.user._id = token._id;
				session.user.email = token.email;
			}
			return session;
		},
	},
	secret: env.AUTH_SECRET,
	pages: {
		signIn: "/signin",
	},
	strategy: "database",
});
