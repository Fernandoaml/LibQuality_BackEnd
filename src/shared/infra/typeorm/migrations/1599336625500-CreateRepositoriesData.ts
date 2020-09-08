import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRepositoriesData1599336625500
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'repositories',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'idRepository',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fullName',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ownerLogin',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ownerId',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'ownerAvatarUrl',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'htmlURL',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'size',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'stargazersCount',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'watchersCount',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'language',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'forksCount',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'openIssuesCount',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: true,
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('repositories');
  }
}
