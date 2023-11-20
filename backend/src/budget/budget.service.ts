import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';
import { Budget } from './entities/budget.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}

  create(createBudgetDto: CreateBudgetDto): Promise<Budget> {
    const budget = this.budgetRepository.create(createBudgetDto);
    return this.budgetRepository.save(budget);
  }

  findAll(): Promise<Budget[]> {
    return this.budgetRepository.find({
      relations: {
        category: true,
      },
    });
  }

  findOne(id: string): Promise<Budget> {
    const budget = this.budgetRepository.findOne({
      where: { id },
      relations: { category: true },
    });

    if (!budget) {
      throw new NotFoundException(`Budget ${id} not found`);
    }

    return budget;
  }

  async update(id: string, updateBudgetDto: UpdateBudgetDto): Promise<Budget> {
    const budget = await this.budgetRepository.preload({
      id: id,
      isActive: updateBudgetDto.isActive,
      category: updateBudgetDto.category,
    });

    if (!budget) {
      throw new NotFoundException(`Budget ${id} not found`);
    }

    return this.budgetRepository.save(budget);
  }

  async remove(id: string): Promise<string> {
    const budget = await this.findOne(id);
<<<<<<< HEAD
    this.repository.remove(budget);
=======

    if (!budget) {
      throw new NotFoundException(`Budget ${id} not found`);
    }

    this.budgetRepository.remove(budget);
>>>>>>> 8d76e4b4386b619a8954b9f426b26416b049d325

    return 'Budget deleted!';
  }
}
