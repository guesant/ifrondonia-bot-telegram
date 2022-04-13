import { model } from "mongoose";
import { IUser } from "./interfaces/IUser";
import { UserSchema } from "./User.schema";

export const UserModel = model<IUser>("User", UserSchema);
