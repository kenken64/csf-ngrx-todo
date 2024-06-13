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
  tasks$!: Observable<Task[]>;
  countTasks : Task[] = [];

  constructor(private todoSvc: TodoService){
  
  }

  ngOnInit(): void {

    if(this.countTasks.length > 0){
      console.log("tasks already loaded")
      this.tasks$ = this.tdStore.getFullSavedTodos;
    }else{
      console.log("tasks not loaded")
      this.tasks$ = this.todoSvc.getAllTodo();
      this.todoSvc.getAllTodo().subscribe((tasks: Task[]) => {
        for(let task of tasks){
          this.countTasks.push(task);
          this.tdStore.saveTasks(task);
        }
      });
    }
    
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
