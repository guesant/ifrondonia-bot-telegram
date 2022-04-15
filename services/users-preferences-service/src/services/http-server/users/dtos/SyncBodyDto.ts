import { Type } from "class-transformer";
import { ValidateNested, IsArray } from "class-validator";
import { SyncBodyDtoAction } from "./SyncBodyDtoAction";

export class SyncBodyDto {
  @ValidateNested()
  @IsArray()
  @Type(() => SyncBodyDtoAction)
  actions!: SyncBodyDtoAction[];
}
