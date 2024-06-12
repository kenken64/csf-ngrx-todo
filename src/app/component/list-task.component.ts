import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { Task } from '../model/task.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TaskStore } from '../store/todo/todo.store';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit, OnDestroy{
  @Output() editTodo = new EventEmitter<Task>();
  private readonly tdStore = inject(TaskStore);
  tasks$!: Promise<Task[]>;
  constructor(private todoSvc: TodoService){
  
  }

  ngOnInit(): void {
    this.tasks$ = this.todoSvc.getAllTodo();
    this.tasks$.then((tasks: Task[]) => {
      for(let task of tasks){
        this.tdStore.saveTasks(task);
      }
    });
  }

  ngOnDestroy(): void {
    
  }

  edit(todo: Task){
    this.editTodo.emit(todo);
  }

  delete(todo: Task){
    console.log("delete task");
  }

  toggleComplete(todoId: number){
    // let foundElem = this.tasks.find((t: Task) => t.id === todoId);
    // const updatedTask: Task = {
    //       ...foundElem!,
    //       status: 1
    //     };
    // this.store.dispatch(updateTask({task: updatedTask}));
    
  }

  toggleUndo(todoId: number){
    // let foundElem = this.tasks.find((t: Task) => t.id === todoId);
    // const updatedTask: Task = {
    //       ...foundElem!,
    //       status: 0
    //     };
    // this.store.dispatch(updateTask({task: updatedTask}));
  }
}
