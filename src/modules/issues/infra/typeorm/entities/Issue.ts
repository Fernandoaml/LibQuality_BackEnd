import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Repository from './Repository';

@Entity('issues')
class Issue {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  issuesTotal: number;

  @Column()
  repositoryId: string;

  @ManyToOne(() => Repository)
  @JoinColumn({ name: 'repositoryId' })
  repository: Repository;

  @Column({ type: 'numeric', precision: 10, scale: 14 })
  meanOfIssue: number;

  @Column({ type: 'numeric', precision: 10, scale: 14 })
  deviationOfIssue: number;

  @Column()
  oldestIssue: Date;

  @Column()
  newestIssue: Date;

  @Column()
  searchedDate: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Issue;
