import { Component, OnInit } from '@angular/core';
import {
  AsyncSubject,
  BehaviorSubject,
  Observable,
  ReplaySubject,
  Subject,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-subject',
  imports: [],
  templateUrl: './subject.html',
  styleUrl: './subject.css',
})
export class SubjectComponent implements OnInit {
  ngOnInit() {
    //---------------observable----------------//
    /* let obs = new Observable((observer) => {
      observer.next(Math.random());
    });*/

    //---------------subject----------------//
    //let subject = new Subject();

    //replay subject
    let subject = new ReplaySubject(2);
    subject.next(100);
    subject.next(200);
    subject.next(300);

    //behavior subject
    //let subject = new BehaviorSubject<number>(100); 

    //subscriber 1
    //it is called every time that a value emitted
    subject.subscribe((data) => {
      console.log('subscriber 1: ' + data);
    });

    //subscriber 2
    //it is called every time that a value emitted
    subject.subscribe((data) => {
      console.log('subscriber 2: ' + data);
    });

    subject.next(2020);

    //subscriber 3
    //it is called every time that a value emitted
    subject.subscribe((data) => {
      console.log('subscriber 3: ' + data);
    });

    subject.next(2025);

    //-------------------AJAX-------------------//
    //it is an HTTP request that returns an observable
    /*  const data = ajax('https://randomuser.me/api/');
    const sub = new Subject();

    sub.subscribe((response) => console.log(response));
    sub.subscribe((response) => console.log(response));
    sub.subscribe((response) => console.log(response));

    //the sub is data consumer
    //1.data observable takes the data from ajax request
    //2.convert them into subject
    //3.then it will pass the same data to subscribers
    data.subscribe(sub); */

    //--------------Async Subject--------------//
    const asyncSub = new AsyncSubject();

    asyncSub.next(100);
    asyncSub.next(200);
    asyncSub.next(300);

    asyncSub.subscribe((data) => console.log(`async subscriber 1: ${data}`));

    asyncSub.complete();
    asyncSub.next(400);
    asyncSub.subscribe((data) => console.log(`async subscriber 2: ${data}`));


    //promises vs observables
    const prom = new Promise((resolve, reject)=>{
        console.log("Promise is called!");
        resolve(100);
    })

    //handle the promise data
    prom.then((data) => {
      console.log(data);
    })

    const newObs = new Observable((observer)=>{
        console.log("Observable is called!");
        observer.next(100);
        observer.next(200);
        observer.next(300);
    });

    newObs.subscribe(data => console.log(data));


  }
}
