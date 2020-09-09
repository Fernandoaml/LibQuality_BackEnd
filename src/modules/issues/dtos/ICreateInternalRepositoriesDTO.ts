export default interface ICreateInternalRepositoriesDTO {
  idRepository: number;
  name: string;
  fullName: string;
  ownerLogin: string;
  ownerId: number;
  ownerAvatarUrl: string;
  htmlURL: string;
  createdAt: Date;
  updatedAt: Date;
  size: number;
  stargazersCount: number;
  watchersCount: number;
  language: string;
  forksCount: number;
  openIssuesCount: number;
}
