import { FilterQuery } from "mongoose";
import { IGeneratePagination } from "../interfaces/pagination.interface";
import { ITask, TaskModel } from "../models/task.model";

class TaskRepository {
  private model = TaskModel;

  public findAllPaginatedByKeyword(query: FilterQuery<ITask>, pagination: IGeneratePagination): Promise<ITask[]> {
    return this.model.find(query).skip(pagination.skip).limit(pagination.limit).sort({ createdAt: -1 });
  }

  public countAllByKeyword(query: FilterQuery<ITask>): Promise<number> {
    return this.model.countDocuments(query);
  }

  public create(data: Partial<ITask>): Promise<ITask> {
    return this.model.create(data);
  }

  public update(id: string, data: Partial<ITask>): Promise<ITask | null> {
    return this.model.findByIdAndUpdate(id, data, { new: true });
  }

  public delete(id: string): Promise<ITask | null> {
    return this.model.findByIdAndDelete(id);
  }
}

export const taskRepository = new TaskRepository();