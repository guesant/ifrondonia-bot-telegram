import { Type } from "class-transformer";
import {
  IsString,
  ArrayUnique,
  ValidateNested,
  Allow,
  IsArray,
} from "class-validator";
import { SyncBodyDtoActionFeed } from "./SyncBodyDtoActionFeed";

export class SyncBodyDtoAction {
  @ArrayUnique()
  @IsString({ each: true })
  @Type(() => String)
  targets!: string[];

  @ValidateNested()
  @IsArray()
  @Type(() => SyncBodyDtoActionFeed)
  feeds!: SyncBodyDtoActionFeed[];
}
