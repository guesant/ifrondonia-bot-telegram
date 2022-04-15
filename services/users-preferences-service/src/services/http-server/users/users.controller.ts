import { ensureArray } from "@ifrondonia-bot-telegram/shared/lib/features/utils/ensure-array";
import {
  Body,
  JsonController,
  Controller,
  Get,
  Post,
  QueryParam,
} from "routing-controllers";
import { Service } from "typedi";
import { SyncBodyDto } from "./dtos/SyncBodyDto";
import { UsersService } from "./users.service";

@Service()
@JsonController("/users")
export class UsersController {
  constructor(readonly usersService: UsersService) {}

  @Get("/")
  list(
    @QueryParam("feed", { type: String })
    feeds: string | string[]
  ) {
    return this.usersService.list(feeds ? ensureArray(feeds) : []);
  }

  @Post("/sync")
  sync(@Body() body: SyncBodyDto) {
    return this.usersService.sync(body);
  }
}
