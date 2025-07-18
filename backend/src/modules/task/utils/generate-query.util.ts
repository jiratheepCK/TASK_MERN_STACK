import { IReqQueryTask } from "../interfaces/task.interface";

export function generateQueryTask(req: IReqQueryTask): any {
    let query: any = {};
    if(req.title) {
        query = { title: { $regex: req.title, $options: 'i' } };
    }
    if(req.isComplete) {
        query.isComplete = req.isComplete === 'true';
    }
    return query;
}