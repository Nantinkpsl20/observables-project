import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, signal, ViewChild, AfterViewInit, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { filter, from, fromEvent, map, Observable, of } from 'rxjs';
import { NewTask } from './new-task/new-task';
import { ShowTask } from './show-task/show-task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgFor, NewTask, ShowTask],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App implements AfterViewInit{
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

  //-----------------of operator------------------//
  oddArray = [1, 3, 5, 7, 9];
  abcArray = ['A', 'B', 'C', 'D'];

  //create an observable from of operator
  ofObservable = of(this.oddArray, this.abcArray);

  //-----------------from operator------------------//
  fromObservable = from('hello');

  //----------convert promise into observable------------//

  //create a promise
  promiseData = new Promise((resolve, reject)=>{
     resolve(this.oddArray);//returns these data
  });

  convObservable = from(this.promiseData);

    //-----------------create observable map operator------------------//
    //result -> 10, 20, 30, 40, 50, 60 it means every element * 5
    even = [2, 4, 6, 8, 10, 12];
    convMapObservable = from(this.even);
    transformedObs = this.convMapObservable.pipe(map((value)=>{
        return value * 5;
    }))

    //-----------------create observable filter operator------------------//
    //based on codition it will return/emit only the numbers that can be divided by 4
    //20, 40, 60
    filteredObservable = this.transformedObs.pipe(filter((value) => {
       return value % 4 === 0; //the condition
    }))

    //chain from, map & filter operators
    chainOpObs = from(this.even).pipe(map((value)=>{
        return value * 5;
    }), filter((value) => {
       return value % 4 === 0; //the condition
    }));

  GetAsyncData(){
    this.chainOpObs.subscribe({
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

   //------Create observable with fromEvent Operator------//
  @ViewChild('createBtn') createBtn!: ElementRef; //it stores a button reference of DOM
  destroyRef = inject(DestroyRef);
  items: string[] = [];
  
  buttonClicked(){
    let count = 0;
    const fromEvObservable = fromEvent(this.createBtn.nativeElement, 'click')
                           .pipe(takeUntilDestroyed(this.destroyRef))
                           .subscribe((data)=>{
                             console.log(data);
                               this.showItem(++count);
                           });
  }

  //it is a hook that will call the above function when the element is fully initialised
  ngAfterViewInit(){
       this.buttonClicked();
  }

  showItem(count: number){
    this.items.push("Item" + " " + count);
    this.cdr.detectChanges(); //inform Angular for changes
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
