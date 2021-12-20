import { Component, OnInit } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    const source = fromEvent(document, 'mousemove')
      .pipe(
        map((mouseEvent: MouseEvent) => {
          return { x: mouseEvent.clientX, y: mouseEvent.clientY }
        }),
      );
    let word = document.getElementById('helloworld');
    source.subscribe(point => {
      console.log(`x: ${point.x}, y: ${point.y}`);
      console.log(`x': ${word.style.left}, y': ${word.style.top}`);
      word.style.left = point.x.toString();
      word.style.top = point.y.toString();
      console.log(`x': ${word.style.left}, y': ${word.style.top}`);
    });
  }

}
