import env from "@/app/env";
import Email from "@/emails/email";
import { render } from "@react-email/render";

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "sandbox.smtp.mailtrap.io",
	port: 2525,
	secure: false,
	auth: {
		user: env.MAILTRAP_USERNAME,
		pass: env.MAILTRAP_PASSWORD,
	},
});

export async function sendEmail({
	username,
	email,
}: {
	username: string;
	email: string;
}) {
	try {
		const emailHtml = await render(
			Email({
				username,
			}),
		);
		const options = {
			// from: "utsav@askdev.com",
			to: email,
			subject: "Welcome to ask dev",
			html: emailHtml,
		};

		await transporter.sendMail(options);
	} catch (error) {
		console.log("failed to send email ", error);
	}
}
