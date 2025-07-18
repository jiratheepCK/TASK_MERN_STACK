import { Router, Request, Response, NextFunction } from 'express'
import dotenv from 'dotenv';
import { TaskService } from './task.service';
import { IResGetAllTask } from './interfaces/task.interface';
dotenv.config();

export class TaskController {

    private taskService: TaskService = new TaskService();
    public router: Router = Router();;
    constructor() {
        this.router.get('/', (req, res, next) => this.getAllTask(req, res, next));
        this.router.post('/', (req, res, next) => this.addTask(req, res, next));
        this.router.put('/:id', (req, res, next) => this.updateTask(req, res, next));
        this.router.delete('/:id', (req, res, next) => this.deleteTask(req, res, next));
    }

    public async getAllTask(request: Request, response: Response, next: NextFunction) {
        try {
            const page: number = parseInt(request.query.page as string) || 1;
            const limit: number = parseInt(request.query.limit as string) || 10;
            const title: string = (request.query.title as string || '').trim();
            const isComplete = request.query.isComplete as string || '';
            const resp: IResGetAllTask = await this.taskService.getAllTask({ page, limit, title, isComplete });
            response.send(resp);
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    public async addTask(request: Request, response: Response, next: NextFunction) {
        try {
            await this.taskService.addTask(request.body);
            response.status(201).send({ statusCode: 201, message: "Created Successful"});
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    public async updateTask(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params;
            await this.taskService.updateTask(id, request.body);
            response.status(200).send({ statusCode: 200, message: "Updated Successful"});
        } catch (err) {
            console.error(err);
            next(err);
        }
    }

    public async deleteTask(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params;
            await this.taskService.deleteTask(id);
            response.status(200).send({ statusCode: 200, message: "Deleted Successful"});
        } catch (err) {
            console.error(err);
            next(err);
        }
    }
}