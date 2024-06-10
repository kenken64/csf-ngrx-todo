import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { Task } from '../model/task.model';
import { Store } from '@ngrx/store';
import { TaskState } from '../store/todo/task.reducer';
import { addTask} from '../store/todo/task.action';

/**
 * npm i --save-dev @types/uuid
 */
@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  form!: FormGroup;
  priorities: string[] = ['Low', 'Medium' , 'High']; 
  editMode: boolean = false;
  editElemIdx : number = 0;

  constructor(private fb: FormBuilder, private store: Store<TaskState>){
    this.form = this.fb.group({
      task: ['', [Validators.required, Validators.minLength(3)]],
      priority: ['', Validators.required]
    })
  }

  addTodo(){
    console.log('Add todo');
    let desc = this.form.get('task')?.value;
    let priority = this.form.get('priority')?.value;
    let taskId = uuidv4();
    console.log(taskId);
    console.log(desc);
    const task: Task = {
      id: Math.floor(Math.random() * 100),
      title: desc,
      description: desc,
      priorty: priority,
      status: 0
    };
    console.log('Adding new task');
    
    this.store.dispatch(addTask({task}));
  }

  updateTodo(){
    let desc = this.form.get('task')?.value;
    let priority = this.form.get('priority')?.value;
    //this.todos[this.editElemIdx].task = desc;
    //this.todos[this.editElemIdx].priority = priority;
    
  }

  cancelUpdateTodo(){
    this.editMode = false;
    this.form.reset();
  }

  // onEditTodo(todo: Todo){
  //   console.log(todo.taskId);
  //   this.editElemIdx = this.todos.indexOf(todo);
  //   console.log(this.editElemIdx);
  //   console.log(todo.priority);
  //   this.form.get('task')?.setValue(todo.task);  
  //   this.form.get('priority')?.setValue(todo.priority);

  //   this.editMode = true;
  // }
}
