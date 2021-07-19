import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';


import {User} from '@app/_models/User';
import {environment} from '@environments/environment';





@Injectable({ providedIn: 'root' })
export class AccountService {
  private userSubject: BehaviorSubject<User>;
  public user: Observable<User>;
  constructor(
    private router: Router,
    private http: HttpClient,
  ) {
    this.userSubject = new BehaviorSubject<User>(JSON.parse( localStorage.getItem('user') as string));
    this.user = this.userSubject.asObservable();
  }

  public get userValue(): User {
    return this.userSubject.value;
  }

  login(email: string, password: string){

    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*');
    console.log(email,password);
     this.http.post<{user:User}>(`${environment.api}/users/login`, { email, password }, {headers : httpHeaders})
      .subscribe(res => {

            localStorage.setItem('user', JSON.stringify(res.user));
            this.userSubject.next(res.user);
        },
        error =>{

        }
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

  async register(user: User): Promise<any> {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Access-Control-Allow-Methods', 'POST')
      .set('Access-Control-Allow-Origin', '*');
    this.http.post<any>(`${environment.api}/users/register`, user,{headers : httpHeaders}) .subscribe(res => {
          console.log(res);
        return new Promise(resolve => {
            resolve({"message": "successfully registered"});
        });

      },
      error =>{
        return new Promise(resolve => {
          resolve({"error": error.error});
        });
      }
    );
  }

  getAll(): Observable<User[]>{
    return this.http.get<User[]>(`${environment.api}/users`);
  }


}
