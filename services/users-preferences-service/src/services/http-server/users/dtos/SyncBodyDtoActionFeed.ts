import { IsString, IsEnum } from "class-validator";
import { SyncBodyDtoFeedOperation } from "./SyncBodyDtoFeedOperation";

export class SyncBodyDtoActionFeed {
  @IsString()
  id!: string;

  @IsEnum(SyncBodyDtoFeedOperation)
  operation!: SyncBodyDtoFeedOperation;
}
