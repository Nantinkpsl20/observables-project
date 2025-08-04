import { NgFor } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-unsubscribe',
  imports: [NgFor],
  templateUrl: './unsubscribe.html',
  styleUrl: './unsubscribe.css',
})
export class Unsubscribe {
  constructor(private cdr: ChangeDetectorRef) {}
  //after one sec it will emit a number in a sequence 0, 1, 2, 3,...infinity
  //and it will run out of memory
  counter = interval(1000);
  data1: number[] = [];
  data2: number[] = [];
  data3: number[] = [];
  subscriber1!: Subscription;
  subscriber2!: Subscription;
  subscriber3!: Subscription;


  OnSubscribe1() {
    this.subscriber1 = this.counter.subscribe((val) => {
      this.data1.push(val);
      this.cdr.detectChanges();
    });
  }

  OnUnsubscribe1() {
    this.subscriber1.unsubscribe();
  }

  OnSubscribe2() {
    this.subscriber2 = this.counter.subscribe((val) => {
      this.data2.push(val);
      this.cdr.detectChanges();
    });
  }

  OnUnsubscribe2() {
    this.subscriber2.unsubscribe();
  }
  OnSubscribe3() {
    this.subscriber3 = this.counter.subscribe((val) => {
      this.data3.push(val);
      this.cdr.detectChanges();
    });
  }

  OnUnsubscribe3() {
    this.subscriber3.unsubscribe();
  }
}
