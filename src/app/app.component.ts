import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'Music';

  constructor(public authService: AuthService, private router: Router) {}
  ngOnInit() {
    let isloggedin: string = 'false';
    let loggedUser: string = '';

    if (typeof localStorage !== 'undefined') {
      isloggedin = localStorage.getItem('isloggedIn') ?? 'false';
      loggedUser = localStorage.getItem('loggedUser') ?? '';
    }

    if (isloggedin !== 'true' || !loggedUser) {
      this.router.navigate(['/login']);
    } else {
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
    }
  }

  onLogout() {
    this.authService.logout();
  }
}
