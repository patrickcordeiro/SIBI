import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget) private readonly repository: Repository<Budget>,
  ) {}

  create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const budget = this.repository.create(createBudgetDto);
    return this.repository.save(budget);
  }

  findAll(): Promise<Budget[]> {
    return this.repository.find({
      relations: {
        category: true,
      },
    });
  }

  findOne(id: string): Promise<Budget> {
    return this.repository.findOne({
      where: { id },
      relations: { category: true },
    });
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.repository.preload({
      id: id,
      isActive: updateBudgetDto.isActive,
      category: updateBudgetDto.category,
    });

    if (!budget) {
      throw new NotFoundException(`Item ${id} not found`);
    }

    return this.repository.save(budget);
  }

  async remove(id: string) {
    const budget = await this.findOne(id);
    this.repository.remove(budget);

    return 'Budget deleted!';
  }
}
