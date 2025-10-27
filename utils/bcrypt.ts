import { compare, hash } from "bcrypt";

export const hashPassword = async (password: string) => {
	return await hash(password, 10);
};

export const checkPassword = async (
	hashedPassword: string,
	passwordToBeCompare: string,
) => {
	return await compare(hashedPassword, passwordToBeCompare);
};
