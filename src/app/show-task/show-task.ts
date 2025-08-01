import { NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-show-task',
  standalone: true,
  imports: [NgFor],
  templateUrl: './show-task.html',
  styleUrl: './show-task.css',
})

export class ShowTask implements OnInit{
  tasks: string[] = ['task 1', 'task 2', 'task 3'];
  taskService = inject(TaskService);
  
  ngOnInit(){
    //with subscribe listens the CreateTask emitter and inform the tasks
    //add the task to the tasks array and inform the ui
     this.taskService.CreateTask.subscribe((value)=>{
        this.tasks.push(value);
     })
  }
}
