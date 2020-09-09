export default interface ICreateInternalRepositoriesDTO {
  idRepository: number;
  name: string;
  fullName: string;
  ownerLogin: string;
  ownerId: number;
  ownerAvatarUrl: string;
  htmlURL: string;
  createdAt: string;
  updatedAt: string;
  size: number;
  stargazersCount: number;
  watchersCount: number;
  language: string;
  forksCount: number;
  openIssuesCount: number;
}
