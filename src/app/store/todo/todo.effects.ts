import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTasks, loadTasksSuccess, loadTasksFailure } from './task.action';
import { of, switchMap, catchError } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Task } from '../../model/task.model';

@Injectable()
export class TodoEffects {
  loadData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTasks),
      switchMap(() =>
        this.http.get<Task[]>('https://jsonplaceholder.typicode.com/posts').pipe(
          map((data :Task[]) => loadTasksSuccess({ tasks: data })),
          catchError(error => of(loadTasksFailure({ tasks: error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private http: HttpClient) {}
}