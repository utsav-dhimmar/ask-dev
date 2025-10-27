import { checkPassword, hashPassword } from "@/utils/bcrypt";
import {
  type Document,
  Model,
  model,
  models,
  ObjectId,
  Schema,
} from "mongoose";

interface UserModel extends Document<ObjectId> {
	username: string;
	email: string;
	password: string;
	reputation: number;
	createdAt: Date;
	updatedAt: Date;
	comparePassword: (password: string) => Promise<boolean>;
}

const userSchema: Schema<UserModel> = new Schema<UserModel>(
	{
		username: {
			type: String,
			unique: true,
			lowercase: true,
			minlength: 3,
			maxlength: 30,
			index: true,
			required: true,
		},
		email: {
			type: String,
			unique: true,
			lowercase: true,
			minlength: 3,
			maxlength: 30,
			index: true,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		reputation: {
			type: Number,
			max: 100,
			min: 0,
			default: 50,
		},
	},
	{
		timestamps: true,
	},
);

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) next();
	hashPassword(this.password);
});

userSchema.methods.comparePassword = async function (password: string) {
	return checkPassword(password, this.password);
};

const User = (models.User as Model<UserModel>) ?? model("User", userSchema);

export default User;
