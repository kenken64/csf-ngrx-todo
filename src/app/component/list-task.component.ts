import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Task } from '../model/task.model';
import { Observable } from 'rxjs';
import { loadTasks, updateTask} from '../store/todo/task.action';
import { selectTasks } from '../store/todo/task.selector';
import { Store } from '@ngrx/store';
import { TaskState } from '../store/todo/task.reducer';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit, OnDestroy{
  @Output() editTodo = new EventEmitter<Task>();
  tasks$: Observable<any>;
  tasks: Task[] = [];

  constructor(private store: Store<TaskState>){
    this.tasks$ = this.store.select(selectTasks);
    console.log('Tasks: ', this.tasks$);
    this.store.dispatch(loadTasks());
  }

  ngOnInit(): void {
    this.tasks$.subscribe(tasks => {
      console.log('Tasks:', tasks.tasks);
      this.tasks = tasks.tasks;
    });
  }

  ngOnDestroy(): void {
    this.tasks$.subscribe().unsubscribe();
  }

  edit(todo: Task){
    this.editTodo.emit(todo);
  }

  delete(todo: Task){
    console.log("delete task");
  }

  toggleComplete(todoId: number){
    let foundElem = this.tasks.find((t: Task) => t.id === todoId);
    const updatedTask: Task = {
          ...foundElem!,
          status: 1
        };
    this.store.dispatch(updateTask({task: updatedTask}));
    
  }

  toggleUndo(todoId: number){
    let foundElem = this.tasks.find((t: Task) => t.id === todoId);
    const updatedTask: Task = {
          ...foundElem!,
          status: 0
        };
    this.store.dispatch(updateTask({task: updatedTask}));
  }
}
