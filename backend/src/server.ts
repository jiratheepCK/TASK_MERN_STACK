import express from 'express';
import { connectDB } from './@main/config/database.config';
import { errorHandler } from './@main/middleware/error-handle.middleware';
import { TaskController } from './modules/task/task.controller';

const app: express.Application = express()
app.use(express.json())

const taskController: TaskController = new TaskController();

app.use("/tasks", taskController.router)
app.use(errorHandler);

connectDB().then(() => {
    app.listen(3000, () => {
        console.log(`Server running`);
    })
})
