import { Schema } from "mongoose";
import { IUser } from "./interfaces/IUser";

export const UserSchema = new Schema<IUser>({
  telegramId: { type: String, required: true, index: true },

  subscribedFeeds: {
    type: [String],
    default: () => [],
  },
});
