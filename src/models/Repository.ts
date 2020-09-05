import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('repositories')
class Repository {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  idRepository: number;

  @Column()
  name: string;

  @Column()
  fullName: string;

  @Column()
  private: boolean;

  @Column()
  ownerLogin: string;

  @Column()
  ownerId: number;

  @Column()
  ownerAvatarUrl: string;

  @Column()
  htmlURL: string;

  @Column()
  createdAt: string;

  @Column()
  updatedAt: string;

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
}

export default Repository;
