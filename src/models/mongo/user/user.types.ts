import { Model, type Document } from "mongoose";

export interface UserProps {
  name: string;
  email: string;
  password: string;
  profilePictureUrl?: string;
  createdAt: Date;
}

export interface UserDocument extends UserProps, Document {
  generateAuthToken: () => Promise<string>;
  compareHash: (hash: string) => Promise<boolean>;
}

export interface UserModel extends Model<UserDocument> {}
