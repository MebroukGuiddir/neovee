import { Injectable } from '@angular/core';
import {User} from "@app/_models/User";
import {environment} from "@environments/environment";
import {Article} from "@app/_models/Article";
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, Subject} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public article: Article | undefined;
  getArticles$: Observable<Observable<Article[]>>;
  private articlesSubject: Subject<Observable<Article[]>> = new Subject<Observable<Article[]>>();
  constructor(private http: HttpClient, private _snackBar: MatSnackBar) {
    this.getArticles$ = this.articlesSubject.asObservable();
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      verticalPosition: "top",
    });
  }
  createArticle(userId: string, title :string, content: string,description:string, image :string){
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*');
  console.log(userId);
    this.http.post<{article:Article}>(`${environment.api}/articles`, {userId, title,description, content, image }, {headers : httpHeaders, observe: 'response'})
      .subscribe(response => {
          this.openSnackBar("Article published", "close");
        },
        error =>{
          this.openSnackBar(error.error, "close");
        }
      );

  }

  getArticles(title: string , size: number, page: number): Observable<Article[]>{
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*');
    const httpParams = new HttpParams()
      .set('page', String(page))
      .set('size', String(size))
      .set('title', title);
    return this.http.get<Article[]>(`${environment.api}/articles`,   {params: httpParams ,headers : httpHeaders})


  }

  getArticleById(  articleId : string ):Observable<Article>{
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*');

    return this.http.get<Article>(`${environment.api}/articles/`+articleId,   { headers : httpHeaders})

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
