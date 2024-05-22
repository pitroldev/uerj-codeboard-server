import { UserProps } from "@/models/mongo/user";

export type DecodedJWT = {
  user: UserProps & { _id: string };
  exp: number;
};
