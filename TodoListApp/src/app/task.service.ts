import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8950/task';

  constructor(private http: HttpClient) { }
  
  loadTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addTask(taskData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, taskData);
  }

  getTasks(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  updateTask(taskId: number, taskData: any): Observable<any> {
    console.log(taskData);
    const updateUrl = `${this.apiUrl}/${taskId}`;
    return this.http.put<any>(updateUrl, taskData);
  }

  deleteTask(taskId: number): Observable<any> {
    const deleteUrl = `${this.apiUrl}/${taskId}`;
    return this.http.delete<any>(deleteUrl);
  }
}
