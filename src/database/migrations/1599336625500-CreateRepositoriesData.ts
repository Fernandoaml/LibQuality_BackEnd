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
            type: 'decimal',
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
            name: 'private',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'ownerLogin',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ownerId',
            type: 'decimal',
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
            name: 'createdAt',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'updatedAt',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'size',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'stargazersCount',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'watchersCount',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'language',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'forksCount',
            type: 'decimal',
            isNullable: true,
          },
          {
            name: 'openIssuesCount',
            type: 'decimal',
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
