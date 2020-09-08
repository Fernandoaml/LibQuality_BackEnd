export default interface ICreateIssuesDTO {
  issuesTotal: number;
  repositoryId: string;
  oldestIssue: Date;
  newestIssue: Date;

  searchedDate: Date;
}
