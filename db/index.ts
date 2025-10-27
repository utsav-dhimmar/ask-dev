import { connect, connection } from "mongoose";

export default async function connnectToDatabase() {
	const mongoDBUri = process.env.MONGODB_URI;
	if (!mongoDBUri) {
		throw new Error("[Server] require MONGODB_URI");
	}

	if (connection.readyState === 1) {
		console.log(`[Database] already connected`);
		return;
	}

	try {
		const res = await connect(mongoDBUri, {
			dbName: "ask-dev",
			autoIndex: true,
		});
		console.log(`[Database] connected successfully models`, res.models);
	} catch (error) {
		console.log("[Database] connection failed ", error);
		process.exit(1);
	}
}
