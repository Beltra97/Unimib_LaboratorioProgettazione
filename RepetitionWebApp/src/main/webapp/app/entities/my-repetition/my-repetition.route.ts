import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMyRepetition, MyRepetition } from 'app/shared/model/my-repetition.model';
import { MyRepetitionService } from './my-repetition.service';
import { MyRepetitionComponent } from './my-repetition.component';
import { MyRepetitionDetailComponent } from './my-repetition-detail.component';
import { MyRepetitionUpdateComponent } from './my-repetition-update.component';

@Injectable({ providedIn: 'root' })
export class MyRepetitionResolve implements Resolve<IMyRepetition> {
  constructor(private service: MyRepetitionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMyRepetition> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((myRepetition: HttpResponse<MyRepetition>) => {
          if (myRepetition.body) {
            return of(myRepetition.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MyRepetition());
  }
}

export const myRepetitionRoute: Routes = [
  {
    path: '',
    component: MyRepetitionComponent,
    data: {
      authorities: [Authority.TUTOR],
      pageTitle: 'repetitionWebApp.myRepetition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MyRepetitionDetailComponent,
    resolve: {
      myRepetition: MyRepetitionResolve,
    },
    data: {
      authorities: [Authority.TUTOR],
      pageTitle: 'repetitionWebApp.myRepetition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MyRepetitionUpdateComponent,
    resolve: {
      myRepetition: MyRepetitionResolve,
    },
    data: {
      authorities: [Authority.TUTOR],
      pageTitle: 'repetitionWebApp.myRepetition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MyRepetitionUpdateComponent,
    resolve: {
      myRepetition: MyRepetitionResolve,
    },
    data: {
      authorities: [Authority.TUTOR],
      pageTitle: 'repetitionWebApp.myRepetition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
