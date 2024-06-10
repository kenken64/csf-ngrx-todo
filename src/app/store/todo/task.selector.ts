import { createSelector } from "@ngrx/store";
import { TaskState } from "./task.reducer";

export const selectTasks = (state: TaskState) => state.tasks;
export const selectTaskById = (id: number) => 
    createSelector(selectTasks, (tasks) => tasks.find(task => task.id === id));