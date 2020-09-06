import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('issues')
class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  issuesTotal: number;

  @Column()
  oldestIssue: Date;

  @Column()
  newestIssue: Date;

  @Column()
  todayDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Issue;
