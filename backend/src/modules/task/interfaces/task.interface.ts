import { IGeneral } from "../../../@main/interfaces/base.interface";
import { IPagination } from "../../../@main/interfaces/pagination.interface";
import { ITask } from "../../../@main/models/task.model";

export interface IReqBodyTask {
    title: string;
    isComplete: boolean;
}

export interface IReqQueryTask {
    page: number;
    limit: number;
    title?: string;
    isComplete?: string;
}

export interface IResGetAllTask {
    data: ITask[];
    pagination: IPagination;
}