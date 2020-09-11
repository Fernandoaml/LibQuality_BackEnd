import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateRelationshipOverRepositoryAndIssues1599424660048
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'issues',
      new TableColumn({
        name: 'repositoryId',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'issues',
      new TableForeignKey({
        name: 'IssueRepository',
        columnNames: ['repositoryId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'repositories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('issues', 'IssueRepository');
    await queryRunner.dropColumn('issues', 'repositoryId');
  }
}
