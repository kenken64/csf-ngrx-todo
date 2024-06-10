import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Task } from './model/task.model';
import { Store } from '@ngrx/store';
import { TaskState } from './store/todo/task.reducer';
import { addTask, deleteTask, updateTask, loadTasks} from './store/todo/task.action';
import { Observable } from 'rxjs';
import { selectTasks } from './store/todo/task.selector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'angular-echodo';
  constructor(){
    
  }

  ngOnInit(): void {
  }

  // addNewTask(){
  //   console.log('Adding new task');
  //   const task: Task = {
  //     id: Math.floor(Math.random() * 100),
  //     title: 'New Task',
  //     description: 'Description',
  //     priorty: 'Medium',
  //     status: 0
  //   };
  //   console.log('Adding new task');
    
  //   this.store.dispatch(addTask({task}));
  // }

  // updateTask(task: Task){
  //   const updatedTask: Task = {
  //     ...task,
  //     title: 'Updated Task'
  //   };
  //   this.store.dispatch(updateTask({task: updatedTask}));
  // }

  // deleteTask(id: number){
  //   console.log('Deleting task:', id);
  //   this.store.dispatch(deleteTask({id}));
  // }
}
