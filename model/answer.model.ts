import {
    Document,
    Model,
    model,
    models,
    ObjectId,
    PaginateModel,
    Schema,
} from "mongoose";
import paginate from "mongoose-paginate-v2";

interface IAnswerModel extends Document<ObjectId> {
	content: string;
	question_id: ObjectId;
	user_id: ObjectId;
	upvote_count: number;
	downvote_count: number;
	createdAt: Date;
	updatedAt: Date;
}

const answerSchema = new Schema<IAnswerModel>(
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
		upvote_count: {
			type: Number,
			required: true,
			default: 0,
		},
		downvote_count: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

answerSchema.plugin(paginate);

interface AnswerDocument extends IAnswerModel {}

const Answer =
	(models.Answer as Model<AnswerDocument, PaginateModel<AnswerDocument>>) ??
	model("Answer", answerSchema);

export default Answer;
