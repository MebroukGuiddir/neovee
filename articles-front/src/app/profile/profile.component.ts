import { Component, OnInit } from '@angular/core';
import {AccountService} from "@app/_services";
import {User} from "@app/_models/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user : User | undefined;
  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.user =this.accountService.userValue;
  }

}
