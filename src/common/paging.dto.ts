import { Type } from "class-transformer";
import { IsInt, IsOptional, Max } from "class-validator";

export class Paging {
  
  @IsOptional()
  @Type(() => Number)
  @Max(50, {message: "Limit is too big"})
  @IsInt({message: "Limit must be Number"})
  limit: number = 10;
  @IsOptional()
  @Type(() => Number)
  @IsInt({message: "Page must be Number"})
  page: number = 0;

}