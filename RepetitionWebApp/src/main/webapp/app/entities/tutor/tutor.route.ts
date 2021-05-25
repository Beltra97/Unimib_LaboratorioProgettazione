import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ITutor, Tutor } from 'app/shared/model/tutor.model';
import { TutorService } from './tutor.service';
import { TutorComponent } from './tutor.component';
import { TutorDetailComponent } from './tutor-detail.component';
import { TutorUpdateComponent } from './tutor-update.component';

@Injectable({ providedIn: 'root' })
export class TutorResolve implements Resolve<ITutor> {
  constructor(private service: TutorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ITutor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((tutor: HttpResponse<Tutor>) => {
          if (tutor.body) {
            return of(tutor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Tutor());
  }
}

export const tutorRoute: Routes = [
  {
    path: '',
    component: TutorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.tutor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TutorDetailComponent,
    resolve: {
      tutor: TutorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.tutor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TutorUpdateComponent,
    resolve: {
      tutor: TutorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.tutor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TutorUpdateComponent,
    resolve: {
      tutor: TutorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.tutor.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
