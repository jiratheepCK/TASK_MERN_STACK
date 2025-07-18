import { Schema, model, Document, Types } from 'mongoose';

export interface ITask {
  _id?: Types.ObjectId;
  title: string;
  isComplete: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const TaskSchema = new Schema<ITask>(
  {
    title: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
  },
  { 
    timestamps: true,
    versionKey: false,
  }
);

export const TaskModel = model<ITask>('Task', TaskSchema);