import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateRepositorieIssuesData1599351890029
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'issues',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'issuesTotal',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'meanOfIssue',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'deviationOfIssue',
            type: 'numeric',
            isNullable: true,
          },
          {
            name: 'oldestIssue',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'newestIssue',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'searchedDate',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('issues');
  }
}
