import { Component, EventEmitter, OnDestroy, OnInit, Output, inject } from '@angular/core';
import { Task } from '../model/task.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { TaskStore } from '../store/todo/todo.store';
import { TodoService } from '../services/todo.service';
import { timeStamp } from 'console';

@Component({
  selector: 'app-list-task',
  templateUrl: './list-task.component.html',
  styleUrl: './list-task.component.css'
})
export class ListTaskComponent implements OnInit, OnDestroy{
  @Output() editTodo = new EventEmitter<Task>();
  private readonly tdStore = inject(TaskStore);
  tasks$!: Task[];
  
  constructor(private todoSvc: TodoService){
  
  }

  ngOnInit(): void {

    if(this.tasks$?.length > 0){
      console.log("tasks already loaded")
      this.tdStore.getFullSavedTodos.subscribe((tasks: Task[]) => {
        this.tasks$ = tasks;
      });
    }else{
      console.log("tasks not loaded")
      this.todoSvc.getAllTodo().subscribe((tasks: Task[]) => {
        this.tasks$ = tasks;
        for(let task of tasks){
          this.tdStore.saveTasks(task);
        }
      });
    }
    
  }

  ngOnDestroy(): void {
    //this.tasks$.subscribe().unsubscribe();
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
