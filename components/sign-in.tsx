import { auth, signIn } from "@/app/auth";

export default async function SignIn() {
	const session = await auth();
	console.log(session);

	return (
		<form
			className="bg-purple-400 pt-4 p-2 flex items-center justify-center flex-col gap-2"
			action={async formData => {
				"use server";
				console.log(formData);
				await signIn("credentials", formData, {
					redirectTo: "/about",
				});
			}}
		>
			<label>
				Email
				<input name="email" type="email" />
			</label>
			<label>
				Password
				<input name="password" type="password" />
			</label>
			<button>Sign In</button>
		</form>
	);
}
