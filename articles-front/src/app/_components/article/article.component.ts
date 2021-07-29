import { Component, OnInit } from '@angular/core';
import {Article} from "@app/_models/Article";
import {ArticleService} from "@app/_services";
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  public article$ : Observable<any> | undefined ;
  constructor(private articleService :ArticleService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if(articleId)
      this.article$ = this.articleService.getArticleById(articleId);
    this.article$?.subscribe(value=>console.log(value));
  }

}
