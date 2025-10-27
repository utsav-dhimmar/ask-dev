import { Document, Model, model, models, ObjectId, Schema } from "mongoose";

interface QuestionVoteModel extends Document<ObjectId> {
	content: string;
	question_id: ObjectId;
	user_id: ObjectId;
	value: number;
	createdAt: Date;
	updatedAt: Date;
}

const questionVoteSchema = new Schema<QuestionVoteModel>(
	{
		content: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 5000,
			trim: true,
		},
		question_id: {
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

const QuestionVote =
	(models.QuestionVote as Model<QuestionVoteModel>) ??
	model("QuestionVote", questionVoteSchema);

export default QuestionVote;
