import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ApicallService } from '../services/apicall.service';

@Injectable()
export class AuthGuard implements CanActivate {
  allow: Observable<boolean>;
  constructor(private router: Router, private apicall: ApicallService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    console.log(this.getUser())
    return this.getUser();

  }

  getUser() {
   
    if (localStorage.getItem('currentToken')) {
      
      this.allow = new Observable(observer => {
        this.apicall.userAuthentication().subscribe(res => {
          if (res.message == 'valid') {
            observer.next(true);
            observer.complete();
          } else {
            localStorage.clear();
            this.router.navigate(['/']);
            observer.next(false);
            observer.complete();
          }

        })

      });
      return this.allow;
    } else {
      localStorage.clear();
      this.router.navigate(['/']);
      return false;
    }

  }
}

