import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalService } from '../global/global.service';
import { BehaviorSubject, tap } from 'rxjs';
import { loginResponseInterface, User } from '../interfaces/login-response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private globalService: GlobalService
  ) { }

  login(data: any){
    return this.http.post<loginResponseInterface>(`/api/auth/login`, data).pipe(
        tap(res => {

            this.userSubject.next(res.user);
            
            this.globalService.setToken(res.token);
            this.globalService.setStorageItem('user', JSON.stringify(res.user));
        })
    );
  }

  logout(){
    this.globalService.clearToken();
    window.location.href = '/login';
  }


}