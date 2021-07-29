import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import {map, tap} from 'rxjs/operators';


import {User} from '@app/_models/User';
import {environment} from '@environments/environment';
import {MatSnackBar} from "@angular/material/snack-bar";





@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(
    private router: Router,
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse( localStorage.getItem('user') as string));
    let user = JSON.parse( localStorage.getItem('user') as string);
    console.log(user);
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action,{
      verticalPosition: "top",
    });
  }

    login(email: string, password: string):Observable<any>{

    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*');
     return this.http.post<any>(`${environment.api}/users/login`, { email, password }, {headers : httpHeaders})
       .pipe(
         tap( // Log the result or error
           data => {
             localStorage.setItem('user',JSON.stringify(JSON.parse(data.user)));
             this.userSubject.next(data.user);
           },
           error => this.openSnackBar(error.error.message, "close")
         )
      );



  }

  logout(): void {
    // remove user from local storage and set current user to null
    localStorage.removeItem('user');
    // @ts-ignore
    this.userSubject.next(undefined);
    // @ts-ignore
    this.router.navigate(['/']).then(r =>  this.userSubject.next(null));
  }

  register(user: User): Observable<any>{
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*');
   return  this.http.post<any>(`${environment.api}/users/register`, user,{headers : httpHeaders, observe: 'response'})  ;
  }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.api}/users`);
  }


}
