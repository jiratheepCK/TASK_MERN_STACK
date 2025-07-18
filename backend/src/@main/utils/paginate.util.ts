import { IGeneratePagination } from "../interfaces/pagination.interface";

export function generatePagination(limit: number, page: number): IGeneratePagination {
    const skip: number = (page - 1) * limit;
    return {
        page: page || 1,
        limit: limit || 20,
        skip,
    };
  }