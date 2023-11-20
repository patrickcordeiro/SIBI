import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  UpdateDateColumn,
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

export enum BudgetType {
  RECEITA = 'Receita',
  DESPESA = 'Despesa',
}

@Entity({ name: 'budget' })
export class Budget extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name', type: 'varchar', default: '' })
  name: string;

  @Column({ name: 'description', type: 'varchar', length: 50 })
  description: string;

  @Column({ name: 'value', type: 'decimal', scale: 2 })
  value: number;

  @Column({
    type: 'enum',
    enum: BudgetType,
  })
  type: BudgetType;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'is_active', type: 'boolean', default: true })
  isActive: boolean;

  @ManyToOne(() => Category, (category) => category.budgets)
  @JoinColumn({ name: 'id_category' })
  category: Relation<Category>;
}
