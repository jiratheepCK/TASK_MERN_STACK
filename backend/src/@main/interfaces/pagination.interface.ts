
export interface IPagination {
    count: number;
    page: number;
    limit: number;
}

export interface IGeneratePagination {
    page: number;
    limit: number;
    skip: number;
}