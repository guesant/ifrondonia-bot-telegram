import { FilterQuery } from "mongoose";
import { Service } from "typedi";
import { IUser } from "../../database/models/User/interfaces/IUser";
import { UserModel } from "../../database/models/User/User.model";
import { getFeedsParents } from "@ifrondonia-bot-telegram/shared/lib/features/utils/feed/get-feeds-parents";
import { IFindUsersOptions } from "./types/IFindUsersOptions";

@Service()
export class UserRepository {
  async create() {
    const user = new UserModel();

    return user;
  }

  async findAll(findUsersOptions: IFindUsersOptions = {}) {
    const usersQueryFilter: FilterQuery<IUser> = {};

    const { feedOr = [] } = findUsersOptions;

    if (feedOr.length > 0) {
      const feedOrWithParents = getFeedsParents(feedOr);

      usersQueryFilter.$or ||= [];

      usersQueryFilter.$or.push(
        ...feedOrWithParents.map((feed) => ({
          subscribedFeeds: { $all: [feed] },
        }))
      );
    }

    const users = await UserModel.find({ ...usersQueryFilter }).lean();

    return users;
  }

  async findByTelegramId(chatId: string) {
    const user = await UserModel.findOne({ telegramId: chatId });

    return user;
  }

  async createOrFindByTelegramId(chatId: string) {
    const userWasFoundInDatabase = await this.findByTelegramId(chatId);

    if (userWasFoundInDatabase) {
      return userWasFoundInDatabase;
    }

    const newUser = await this.create();

    newUser.telegramId = chatId;

    await newUser.save();

    return newUser;
  }
}
