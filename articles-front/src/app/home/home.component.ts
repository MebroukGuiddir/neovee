import { Component, OnInit } from '@angular/core';
import {ArticleService} from "@app/_services";
import {BehaviorSubject, Observable} from "rxjs";
import {Article} from "@app/_models/Article";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  obsPatentsArray: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  articles$: Observable<Article[]> = this.obsPatentsArray.asObservable();
  constructor(public articleService :ArticleService) {
    this.articleService.getArticles$.subscribe((data) => {
      this.articles$ = data;
    });
  }

  ngOnInit(): void {
this.articleService.getArticles("",10,1);
console.log(this.articles$);
  }

}
