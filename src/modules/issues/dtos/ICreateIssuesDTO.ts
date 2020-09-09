export default interface ICreateIssuesDTO {
  issuesTotal: number;
  repositoryId: string;
  meanOfIssue: number;
  deviationOfIssue: number;
  oldestIssue: Date;
  newestIssue: Date;

  searchedDate: Date;
}
