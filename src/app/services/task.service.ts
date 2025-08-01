import { EventEmitter, Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({providedIn: "root"})
export class TaskService{
   //CreateTask = new EventEmitter<string>();

   CreateTask = new Subject<string>();
   
   onCreateTask(value: string){
      this.CreateTask.next(value);//emit the value through event emitter to inform all subscibers
   }
}