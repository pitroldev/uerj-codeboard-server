import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Schema } from "mongoose";

import { SECRET } from "@/config";

import { userSchema } from "@/schemas/user";

import { type UserDocument } from "./user.types";

const UserSchema = new Schema<UserDocument>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: [
        (v: string) => {
          const result = userSchema.shape.email.safeParse(v);
          return result.success || result.error.message;
        },
      ],
    },
    password: {
      type: String,
      select: false,
      validate: [
        (v: string) => {
          const result = userSchema.shape.password.safeParse(v);
          return result.success || result.error.message;
        },
      ],
    },
    name: {
      type: String,
      required: true,
      trim: true,
      validate: [
        (v: string) => {
          const result = userSchema.shape.name.safeParse(v);
          return result.success || result.error.message;
        },
      ],
    },
    profilePictureUrl: {
      type: String,
      validate: [
        (v: string) => userSchema.shape.profilePictureUrl.safeParse(v).success,
        "Por favor, insira uma URL válida",
      ],
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { collection: "user" }
);

UserSchema.pre("save", { document: true }, async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

UserSchema.methods = {
  async compareHash(password: string) {
    return bcrypt.compare(password, this.password);
  },
  async generateAuthToken(this: UserDocument) {
    const userData = this.toJSON();
    delete userData.password;

    return jwt.sign({ user: userData }, SECRET, { expiresIn: "1d" });
  },
};

export { UserSchema };
