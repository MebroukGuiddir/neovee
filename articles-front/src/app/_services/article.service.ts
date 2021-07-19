import { Injectable } from '@angular/core';
import {User} from "@app/_models/User";
import {environment} from "@environments/environment";
import {Article} from "@app/_models/Article";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  getArticles$: Observable<Observable<Article[]>>;
  private articlesSubject: Subject<Observable<Article[]>> = new Subject<Observable<Article[]>>();
  constructor(private http: HttpClient,) {
    this.getArticles$ = this.articlesSubject.asObservable();
  }

  createArticle(userId: string, title :string, content: string){
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*');

    this.http.post<{article:Article}>(`${environment.api}/articles/login`, {userId, title, content }, {headers : httpHeaders})
      .subscribe(res => {


        },
        error =>{

        }
      );

  }

  getArticles(title: string , size: number, page: number): void{
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*');
    const httpParams = new HttpParams()
      .set('page', String(page))
      .set('size', String(size))
      .set('title', title);
    this.http.get<any>(`${environment.api}/articles`,   {params: httpParams ,headers : httpHeaders, observe : 'response' })
      .subscribe(res => {
          const articles = new Observable<Article[]>(observer => {
            console.log(res)
            observer.next(res.body);
            observer.complete();
          });
          this.articlesSubject.next(articles);

        },
        error =>{

        }
      );
  }
  getUserArticles( size: number, page: number,userId: string){
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*');
    const httpParams = new HttpParams()
      .set('page', String(page))
      .set('size', String(size))
      .set('userId', userId);
    this.http.get(`${environment.api}/articles`,   {params: httpParams ,headers : httpHeaders })
      .subscribe(res => {


        },
        error =>{

        }
      );
  }

  deleteArticle(userId: string, articleId: string){
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*')
      .set('body', JSON.stringify({ userId,articleId }));
    this.http.delete(`${environment.api}/articles`,   {headers : httpHeaders })
      .subscribe(res => {


        },
        error =>{

        }
      );
  }
  updateArticle(userId: string, articleId: string,title:string , content: string){
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*');
    this.http.put(`${environment.api}/articles`,{userId, articleId, title, content},   {headers : httpHeaders })
      .subscribe(res => {


        },
        error =>{

        }
      );
  }
}
