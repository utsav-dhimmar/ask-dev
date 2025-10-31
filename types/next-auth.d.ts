import { DefaultSession } from "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
	interface User {
		_id: string;
		email: string;
	}
	interface JWT {
		_id: string;
		email: string;
	}
	interface Session {
		user: {
			_id: string;
			email: string;
		} & DefaultSession["user"];
	}
}

declare module "next-auth/jwt" {
	/** Returned by the `jwt` callback and `auth`, when using JWT sessions */
	interface JWT {
		_id: string;
		email: string;
	}
}
