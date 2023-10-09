import { Component } from '@angular/core';
import { TaskService } from '../task.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog.component/confirmation-dialog.component.component';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent {
    tasks: any[] = [];
    selectedTask: any = null;
  
    constructor(private dialog: MatDialog, private taskService: TaskService) {
        this.loadTasks();
    }
  
    loadTasks(): void {
      this.taskService.getTasks().subscribe(
        data => {
          this.tasks = data;
        },
        error => {
          console.error('Error fetching tasks:', error);
        }
      );
    }
  
    editTask(task: any): void {
      // Set the selected task for editing
      this.selectedTask = { ...task }; // Create a copy to avoid modifying the original task object
    }
  
    updateTask(updatedTask: any): void {
      console.log(updatedTask);
      this.taskService.updateTask(updatedTask.idTasks, updatedTask).subscribe(
        response => {
          console.log('Task updated successfully:', response);
          this.loadTasks(); // Reload tasks after update
          this.selectedTask = null; // Reset selectedTask after update
        },
        error => {
          console.error('Error updating task:', error);
          // Handle error scenarios here
        }
      );    
      this.loadTasks(); // Reload tasks after update
      this.selectedTask = null; // Reset selectedTask after update
    }
    
  
    deleteTask(taskId: number): void {
        // Open the confirmation dialog
        const dialogRef = this.dialog.open(ConfirmationDialogComponent);
    
        // Subscribe to dialog close event
        dialogRef.afterClosed().subscribe(() => {
          // User closed the confirmation dialog, proceed with deleting the task
          this.taskService.deleteTask(taskId).subscribe(
            response => {
              console.log('Task deleted successfully:', response);
              this.loadTasks();
              // Handle success scenarios here
            },
            error => {
              this.loadTasks();
              console.error('Error deleting task:', error);
              // Handle error scenarios here
            }
          );
          this.loadTasks();
        });
        this.loadTasks();
      }

  addTask(name: string, description: string, date: string, time:string) {
    console.log("CALLING THE TASK SERVICE");
    this.taskService.addTask({
      name: name,
      description: description,
      date: date,
      time: time
    }).subscribe(response => {
      console.log('Response from server:', response);
      // Handle the response data here
      // Optionally, you can reload tasks in the TaskListComponent here as well
    },
    error => {
      console.error('Error:', error);
      // Handle the error here
    });
    this.loadTasks();
  }
}
