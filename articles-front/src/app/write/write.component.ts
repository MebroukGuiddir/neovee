import { Component, OnInit } from '@angular/core';
import {AccountService} from "@app/_services";

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.scss']
})
export class WriteComponent implements OnInit {
  title: any;
  content: any;

  constructor( public accountService: AccountService) {

  }

  ngOnInit(): void {

  }

}
