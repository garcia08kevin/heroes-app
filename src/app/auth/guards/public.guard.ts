import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRouteSnapshot, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, map, of, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PublicGuard {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  private checkPublicStatus(): boolean | Observable<boolean> {
    return this.authService.checkAuth().pipe(
      tap((resp: boolean) => resp ? of(false) : of(true)),
      tap(resp => {
        if (resp) {
          this.router.navigateByUrl('/heroes')
        }
      }),
      map(resp => !resp)
    )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkPublicStatus()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkPublicStatus()
  }

}
