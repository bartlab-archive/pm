import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'users-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    console.log('UsersListComponent ngOnInit');
  }

}
