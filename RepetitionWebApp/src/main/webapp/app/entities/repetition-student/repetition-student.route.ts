import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRepetitionStudent, RepetitionStudent } from 'app/shared/model/repetition-student.model';
import { RepetitionStudentService } from './repetition-student.service';
import { RepetitionStudentComponent } from './repetition-student.component';
import { RepetitionStudentDetailComponent } from './repetition-student-detail.component';
import { RepetitionStudentUpdateComponent } from './repetition-student-update.component';

@Injectable({ providedIn: 'root' })
export class RepetitionStudentResolve implements Resolve<IRepetitionStudent> {
  constructor(private service: RepetitionStudentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRepetitionStudent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((repetitionStudent: HttpResponse<RepetitionStudent>) => {
          if (repetitionStudent.body) {
            return of(repetitionStudent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RepetitionStudent());
  }
}

export const repetitionStudentRoute: Routes = [
  {
    path: '',
    component: RepetitionStudentComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.repetitionStudent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RepetitionStudentDetailComponent,
    resolve: {
      repetitionStudent: RepetitionStudentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.repetitionStudent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RepetitionStudentUpdateComponent,
    resolve: {
      repetitionStudent: RepetitionStudentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.repetitionStudent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RepetitionStudentUpdateComponent,
    resolve: {
      repetitionStudent: RepetitionStudentResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'repetitionWebApp.repetitionStudent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
