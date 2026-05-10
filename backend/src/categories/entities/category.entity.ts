import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum CategoryType {
  CIVIC = 'civic',
  CRIME = 'crime',
}

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: CategoryType,
  })
  type: CategoryType;

  @Column({ nullable: true })
  description?: string;
}
