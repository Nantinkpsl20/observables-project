import { Component, inject, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.html',
  styleUrl: './new-task.css'
})
export class NewTask {
 newTask: string = '';
 
 //constructor(private taskService: TaskService){};
 taskService = inject(TaskService);

 OnCreateTask(){
  console.log(this.newTask);
  this.taskService.onCreateTask(this.newTask);//send the value into service
 }
}
