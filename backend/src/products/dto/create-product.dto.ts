import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Category } from 'src/categories/entities/category.entity';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  description?: string;

  @Min(0)
  price: number;

  @Min(0)
  @IsNumber()
  quantity: number;

  @IsString()
  photoUrl?: string;

  category?: Partial<Category>;
}
