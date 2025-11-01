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

interface IQuestionModel extends Document<ObjectId> {
	title: string;
	content: string;
	user_id: ObjectId;
	upvote_count?: number;
	downvote_count?: number;
	createdAt: Date;
	updatedAt: Date;
}

const questionSchema = new Schema<IQuestionModel>(
	{
		title: {
			type: String,
			required: true,
			minlength: 5,
			maxlength: 100,
			trim: true,
		},
		content: {
			type: String,
			required: true,
			minlength: 10,
			maxlength: 5000,
			trim: true,
		},
		user_id: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		upvote_count: {
			type: Number,
			required: false,
			default: 0,
		},
		downvote_count: {
			type: Number,
			required: false,
			default: 0,
		},
	},
	{
		timestamps: true,
	},
);

questionSchema.plugin(paginate);

interface QuestionDocument extends IQuestionModel {}

const Question =
	(models.Question as Model<
		QuestionDocument,
		PaginateModel<QuestionDocument>
	>) ?? model("Question", questionSchema);

export default Question;
