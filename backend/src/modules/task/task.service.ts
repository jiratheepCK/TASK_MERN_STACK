import { Types } from "mongoose";
import HttpException from "../../@main/exceptions/bad-request.exception";
import { taskRepository } from "../../@main/repositories/task.repository";
import { generatePagination } from "../../@main/utils/paginate.util";
import { IResGetAllTask, IReqQueryTask, IReqBodyTask } from "./interfaces/task.interface";
import { generateQueryTask } from "./utils/generate-query.util";

export class TaskService {

    public async getAllTask(reqQuery: IReqQueryTask): Promise<IResGetAllTask> {
        const query = generateQueryTask(reqQuery);
        const pagination = generatePagination(reqQuery.limit, reqQuery.page);
        const [data, count] = await Promise.all([
            taskRepository.findAllPaginatedByKeyword(query, pagination),
            taskRepository.countAllByKeyword(query)
        ]);
        return {
            data: data,
            pagination: {
                page: pagination.page,
                limit: pagination.limit,
                count: count,
            }
        };
    }
    public async addTask(body: IReqBodyTask): Promise<void> {
        if(!body?.title) throw new HttpException(400, "Title is required");
        await taskRepository.create({
            title: body.title,
            isComplete: body.isComplete,
        });
    }

    public async updateTask(id: string, body: IReqBodyTask): Promise<void> {
        if(!id || !Types.ObjectId.isValid(id)) throw new HttpException(400, `Invalid task ID format: ${id}`);
        await taskRepository.update(id, {
            title: body.title,
            isComplete: body.isComplete,
        });
    }

    public async deleteTask(id: string): Promise<void> {
        if(!id || !Types.ObjectId.isValid(id)) throw new HttpException(400, `Invalid task ID format: ${id}`);
        await taskRepository.delete(id);
    }

}