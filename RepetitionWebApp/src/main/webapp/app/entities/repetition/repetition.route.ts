import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRepetition, Repetition } from 'app/shared/model/repetition.model';
import { RepetitionService } from './repetition.service';
import { RepetitionComponent } from './repetition.component';
import { RepetitionDetailComponent } from './repetition-detail.component';
import { RepetitionUpdateComponent } from './repetition-update.component';

@Injectable({ providedIn: 'root' })
export class RepetitionResolve implements Resolve<IRepetition> {
  constructor(private service: RepetitionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRepetition> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((repetition: HttpResponse<Repetition>) => {
          if (repetition.body) {
            return of(repetition.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Repetition());
  }
}

export const repetitionRoute: Routes = [
  {
    path: '',
    component: RepetitionComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.repetition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RepetitionDetailComponent,
    resolve: {
      repetition: RepetitionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.repetition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RepetitionUpdateComponent,
    resolve: {
      repetition: RepetitionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.repetition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RepetitionUpdateComponent,
    resolve: {
      repetition: RepetitionResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.repetition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
