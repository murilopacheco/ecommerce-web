import {Component, OnInit} from '@angular/core';
import {AuthGuardService} from './guards/auth.guard.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ecommerce-web';

  isLoggedIn$: Observable<boolean>;                  // {1}

  constructor(private authService: AuthGuardService) { }

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn; // {2}
  }

  onLogout(): void {
    this.authService.logout();                      // {3}
  }
}
