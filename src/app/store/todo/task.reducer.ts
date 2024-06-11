import { Task } from '../../model/task.model';
import { addTask, deleteTask, updateTask, loadTasks, loadTasksSuccess, loadTasksFailure } from './task.action';
import { createReducer, on } from '@ngrx/store';

export interface TaskState {
  tasks: Task[];
}

export const initialState: TaskState = {
  tasks: []
};


export const taskReducer = createReducer(
  initialState,
  on(loadTasks, state => ({ ...state})),
  on(loadTasksSuccess, (state, { tasks }) => ({ ...state, data: tasks})),
  on(loadTasksFailure, (state, { tasks }) => ({ ...state, error: tasks})),
  on(addTask, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(updateTask, (state, { task }) => ({ ...state, tasks: state.tasks.map(t => t.id === task.id ? task : t) })),
  on(deleteTask, (state, { id }) => ({ ...state, tasks: state.tasks.filter(t => t.id !== id) }))
);
