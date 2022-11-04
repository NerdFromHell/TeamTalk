import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-status',
  templateUrl: './users-status.component.html',
  styleUrls: ['./users-status.component.scss']
})
export class UsersStatusComponent implements OnInit {

  @Input() allUsersObj: any;

  constructor() { }

  ngOnInit(): void {
  }

}
