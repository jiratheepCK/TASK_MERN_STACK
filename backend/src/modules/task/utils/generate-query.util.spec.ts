import { IReqQueryTask } from "../interfaces/task.interface";
import { generateQueryTask } from "./generate-query.util";

describe('GenerateQueryTask', () => {
    it('GenerateQueryTask WithTitle', () => {
        const req: IReqQueryTask = { title: 'Test', isComplete: '' } as IReqQueryTask;
        const query = generateQueryTask(req);
        expect(query).toEqual({ title: { $regex: 'Test', $options: 'i' } });
    });

    it('GenerateQueryTask WithIsComplete', () => {
        const req: IReqQueryTask = { isComplete: 'true' } as IReqQueryTask;
        const query = generateQueryTask(req);
        expect(query).toEqual({ isComplete: true });
    });

    it('GenerateQueryTask WithNoFields', () => {
        const req: IReqQueryTask = { } as IReqQueryTask;
        const query = generateQueryTask(req);
        expect(query).toEqual({});
    });

    it('GenerateQueryTask WithNonStringTitle', () => {
        const req: IReqQueryTask = { title: '123' } as IReqQueryTask;
        const query = generateQueryTask(req);
        expect(query).toEqual({ title: { $regex: '123', $options: 'i' } });
    });

    it('GenerateQueryTask WithNonStringIsComplete', () => {
        const req: IReqQueryTask = { } as IReqQueryTask;
        const query = generateQueryTask(req);
        expect(query).toEqual({});
    });

    it('GenerateQueryTask WithTitleAndIsComplete', () => {
        const req: IReqQueryTask = { title: 'Test', isComplete: 'false' } as IReqQueryTask;
        const query = generateQueryTask(req);
        expect(query).toEqual({ title: { $regex: 'Test', $options: 'i' }, isComplete: false });
    });
});