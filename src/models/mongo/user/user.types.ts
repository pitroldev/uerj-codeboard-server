import { type Document } from "mongoose";

export interface UserProps {
  name: string;
  email: string;
  password: string;
  profilePictureUrl?: string;
  createdAt: Date;
}

export interface UserModel extends UserProps, Document {
  generateAuthToken: () => Promise<string>;
  compareHash: (hash: string) => Promise<boolean>;
}
