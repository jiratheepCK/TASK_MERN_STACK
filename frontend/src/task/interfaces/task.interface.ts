export interface ITask {
  _id: string;
  title: string;
  isComplete: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IPagination {
  page: number;
  limit: number;
  count: number;
}
