import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {UserDto} from '../../model/User-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  // tslint:disable-next-line:typedef
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  login (user: UserDto) {
    if (user.userName !== '' && user.password !== ''){
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout (){
    this.loggedIn.next(false);
    this.router.navigate(['/login']);
  }
}
