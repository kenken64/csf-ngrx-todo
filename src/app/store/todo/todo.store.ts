import { Injectable } from "@angular/core";
import { Task, TaskResultSlice } from "../../model/task.model";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";


const INIT_VALUE : TaskResultSlice = {
    tasks: []
}

export interface TaskState {
    tasks: Task[];
}

@Injectable()
export class TaskStore extends ComponentStore<TaskResultSlice>{
    constructor(){
        super(INIT_VALUE);
    }

    readonly tasks$: Observable<Task[]> 
                    = this.select(state => state.tasks);

    readonly saveTasks = this.updater<Task>((_currStore: TaskResultSlice, task: Task) => {
        const newStore: TaskResultSlice = { ..._currStore }
        newStore.tasks.push(task)
        return newStore
    });

    readonly updateTask = this.updater<Task>((_currStore: TaskResultSlice, task: Task) => {
        const newStore: TaskResultSlice = { ..._currStore }
        const idx = newStore.tasks.findIndex((t: Task) => t.id === task.id);
        newStore.tasks[idx] = task;
        return newStore;
    });
}