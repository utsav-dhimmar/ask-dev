import { Document, Model, model, models, ObjectId, Schema } from "mongoose";

interface AnswerVoteModel extends Document<ObjectId> {
	content: string;
	answer_id: ObjectId;
	user_id: ObjectId;
	value: number;
	createdAt: Date;
	updatedAt: Date;
}

const answerVoteSchema = new Schema<AnswerVoteModel>(
	{
		content: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 5000,
			trim: true,
		},
		answer_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		value: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

const AnswerVote =
	(models.AnswerVote as Model<AnswerVoteModel>) ??
	model("AnswerVote", answerVoteSchema);

export default AnswerVote;
