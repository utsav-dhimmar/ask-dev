import {
    Body,
    Font,
    Head,
    Heading,
    Html,
    Row,
    Section,
    Tailwind,
    Text,
} from "@react-email/components";

interface EmailProps {
	username: string;
}

export default function Email({ username }: Readonly<EmailProps>) {
	return (
		<Html>
			<Head>
				<title>Verification Email</title>
				<Font
					fontFamily="Roboto"
					fallbackFontFamily="Verdana"
					webFont={{
						url: "https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxKKTU1Kg.woff2",
						format: "woff2",
					}}
					fontWeight={400}
					fontStyle="normal"
				/>
			</Head>
			<Tailwind>
				<Body>
					<Section>
						<Row>
							<Heading className="text-center">
								Hello {username}
							</Heading>
						</Row>
						<Row>
							<Text>Thank you for registering on ask dev,</Text>
						</Row>
					</Section>
				</Body>
			</Tailwind>
		</Html>
	);
}
