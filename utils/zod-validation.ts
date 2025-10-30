import type { z, ZodIssue, ZodObject, ZodRawShape } from "zod";

type ValidationResult<T> =
	| {
			success: true;
			data: T;
	  }
	| {
			success: false;
			error: Record<string, string>;
	  };

export function parserWithZodSchema<T extends ZodRawShape>(
	data: unknown,
	schema: ZodObject<T>,
): ValidationResult<z.infer<typeof schema>> {
	const zodResult = schema.safeParse(data);
	if (zodResult.success) {
		return {
			success: true,
			data: zodResult.data,
			// message: "Validation success",
		};
	}
	const erroObj = zodResult.error.issues.reduce(
		(acc, issue: ZodIssue) => {
			const key = issue.path.join(".");
			acc[key] = issue.message;
			return acc;
		},
		{} as Record<string, string>,
	);
	return {
		success: false,
		error: erroObj,
		// data: {},
	};
}
