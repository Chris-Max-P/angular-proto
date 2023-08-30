import {Component, Input} from '@angular/core';

@Component({
  selector: 'done-button',
  templateUrl: './done-button.component.html',
  styleUrls: ['./done-button.component.scss']
})
export class DoneButtonComponent {
  @Input() isReady: boolean = false;
  @Input() text: string = 'app.done';
}
