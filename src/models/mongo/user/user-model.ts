import mongoose, { model } from "mongoose";

import { UserSchema } from "./user-schema";
import { UserModel } from "./user.types";

const User: UserModel = mongoose.models.User || model("User", UserSchema);

export default User;
