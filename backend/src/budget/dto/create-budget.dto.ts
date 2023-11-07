import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  description: string;

  @Min(0)
  @IsPositive()
  @IsNumber()
  value: number;
}
