import { Component, OnInit } from '@angular/core';
import {ArticleService} from "@app/_services";
import {BehaviorSubject, Observable} from "rxjs";
import {Article} from "@app/_models/Article";
import {Router, ActivatedRoute} from "@angular/router";
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  obsPatentsArray: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);
  articles$: Observable<Article[]> = this.obsPatentsArray.asObservable();
  public topics =[
    ' Art and culture',
    'Geography and places',
    'Health and fitness',
    'History and events',
    'Mathematics and abstractions',
    'Natural sciences and nature',
    'People and self',
    'Philosophy and thinking',
    'Religion and spirituality',
    'Social sciences and society',
    'Technology and applied sciences'
  ]
  public selectedId =0;
  search: any;
  constructor(public articleService :ArticleService, private readonly router: Router, private route: ActivatedRoute) {
    this.articleService.getArticles$.subscribe((data) => {
      this.articles$ = data;
    });
  }

  ngOnInit(): void {
    this.articles$ = this.articleService.getArticles("",10,1);
  }

  searchArticles():void{
    console.log(this.search)
    this.articles$ = this.articleService.getArticles(this.search,10,1);
  }

  gotoArticle(article: Article) {
    const articleId = article ? article.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that item.
    this.router.navigate(['/Article', { id: articleId }]);
  }
}
