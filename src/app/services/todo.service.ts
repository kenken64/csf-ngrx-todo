import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { firstValueFrom } from 'rxjs';
import { Task } from '../model/task.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
    constructor(private httpClient: HttpClient) { }

    getTodo(todoId: string) {
        return firstValueFrom(
          this.httpClient.get<Task>('/api/v1/todo/' + todoId)
        );
    }
    
    getAllTodo() {
        return this.httpClient.get<Task[]>('/api/v1/todo');
    }
    
}