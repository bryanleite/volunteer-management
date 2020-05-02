import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.less']
})
export class ForbiddenComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  home() {
    this._router.navigate(['home']);
  }

}
