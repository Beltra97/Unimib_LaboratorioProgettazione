import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistoryRepetitionStudent, HistoryRepetitionStudent } from 'app/shared/model/history-repetition-student.model';
import { HistoryRepetitionStudentService } from './history-repetition-student.service';
import { HistoryRepetitionStudentComponent } from './history-repetition-student.component';

@Injectable({ providedIn: 'root' })
export class HistoryRepetitionStudentResolve implements Resolve<IHistoryRepetitionStudent> {
  constructor(private service: HistoryRepetitionStudentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoryRepetitionStudent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historyRepetitionStudent: HttpResponse<HistoryRepetitionStudent>) => {
          if (historyRepetitionStudent.body) {
            return of(historyRepetitionStudent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoryRepetitionStudent());
  }
}

export const historyRepetitionStudentRoute: Routes = [
  {
    path: '',
    component: HistoryRepetitionStudentComponent,
    data: {
      authorities: [Authority.STUDENT],
      pageTitle: 'repetitionWebApp.historyRepetitionStudent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
