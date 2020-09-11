import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

import Issues from './Issue';

@Entity('repositories')
class Repository {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  idRepository: number;

  @OneToMany(() => Issues, issue => issue.repository)
  issuesId: Issues[];

  @Column()
  name: string;

  @Column()
  fullName: string;

  @Column()
  ownerLogin: string;

  @Column()
  ownerId: number;

  @Column()
  ownerAvatarUrl: string;

  @Column()
  htmlURL: string;

  @Column()
  size: number;

  @Column()
  stargazersCount: number;

  @Column()
  watchersCount: number;

  @Column()
  language: string;

  @Column()
  forksCount: number;

  @Column()
  openIssuesCount: number;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}

export default Repository;
