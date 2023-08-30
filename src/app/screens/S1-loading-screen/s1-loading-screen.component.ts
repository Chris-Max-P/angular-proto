import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";

@Component({
  selector: 'loading-screen',
  templateUrl: 's1-loading-screen.component.html',
  styleUrls: ['s1-loading-screen.component.scss']
})
export class S1LoadingScreenComponent implements OnInit {
  constructor(private router: Router) {
  }

}
