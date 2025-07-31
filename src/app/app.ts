import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('observables-project');
  constructor(private cdr: ChangeDetectorRef) {}

  data: any[] = []; //array of data
  pageTitle = "Observables in Angular";

  //create an observable => we call the observable constructor
  //is the event emitter
  myObservable = new Observable((observer) => {

    //every second we emit a value
    setTimeout(() => { observer.next(1); }, 1000);
    setTimeout(() => { observer.next(2); }, 2000);
    setTimeout(() => { observer.next(3); }, 3000);
    //setTimeout(() => { observer.error(new Error('Something went wrong'));}, 3000);
    setTimeout(() => { observer.next(4); }, 4000);
    setTimeout(() => { observer.next(5); }, 5000);
    setTimeout(() => { observer.next(6); }, 6000);
    setTimeout(() => { observer.next(7); }, 7000);
    setTimeout(() => { observer.complete(); }, 3000);
  });

  GetAsyncData(){
    this.myObservable.subscribe({
      //with the arrow function this keyword will point an instance of appComponent
      //in different way it will point an instance of this object that we don't have a 
      //property with name data etc.
      next: (val: any) => { 
         this.data.push(val);
         this.cdr.detectChanges(); //something change inform the DOM
      }, 
      error(err){
          alert(err.message);
      },
      complete(){
         alert('All the data are streamed!');
      }
    })
  }

}

//------------the deprecated way---------------//
  //observer is the event listener
  /* GetAsyncData() {
    //subscribe to observable
    //val is the data that next emit
    this.myObservable.subscribe((val: any) => {
      this.data.push(val);
      this.cdr.detectChanges(); //something change inform the DOM
    }, 
    (err)=>{alert(err.message)}, //error handling
    () => { alert('All the data are streamed!')} //this call back function is for complete handling
);}
} */

/*my way to send values per second
myObservable = new Observable((observer) => {
    /*for (let i = 1; i < 8; i++) {
      if(i==3){
        observer.error(new Error('Something went wrong'));
      }
      setTimeout(() => {
        observer.next(i);
      }, i * 1000);
    }
}*/ 
