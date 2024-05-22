import mongoose, { model } from "mongoose";

import { UserSchema } from "./user-schema";
import { UserModel } from "./user.types";

const User: mongoose.Model<UserModel> =
  mongoose.models.User || model<UserModel>("User", UserSchema);

export default User;
