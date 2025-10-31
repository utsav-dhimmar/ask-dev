import z, { ZodError } from "zod";

const envSchema = z.object({
	MONGODB_URI: z.string(),
	AUTH_SECRET: z.string(),
	NEXTAUTH_URL: z.string(),
	AUTH_GITHUB_ID: z.string(),
	AUTH_GITHUB_SECRET: z.string(),
	NODE_ENV: z.string(),
	DOMAIN_URL: z.string(),
	MAILTRAP_USERNAME: z.string(),
	MAILTRAP_PASSWORD: z.string(),
});

type EnvTypes = z.infer<typeof envSchema>;
let env: EnvTypes;

function checkEnvs() {
	try {
		env = envSchema.parse(process.env);
	} catch (error) {
		const err = error as ZodError;
		const errorObj = err.issues.reduce(
			(acc, issue) => {
				const key = issue.path.join("");
				acc[key] = issue.message;
				return acc;
			},
			{} as Record<string, string>,
		);
		console.log("Got an env errors", errorObj);

		process.exit(1);
	}
}

checkEnvs();

export default env;
