import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IHistoryRepetition, HistoryRepetition } from 'app/shared/model/history-repetition.model';
import { HistoryRepetitionService } from './history-repetition.service';
import { HistoryRepetitionComponent } from './history-repetition.component';

@Injectable({ providedIn: 'root' })
export class HistoryRepetitionResolve implements Resolve<IHistoryRepetition> {
  constructor(private service: HistoryRepetitionService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IHistoryRepetition> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((historyRepetition: HttpResponse<HistoryRepetition>) => {
          if (historyRepetition.body) {
            return of(historyRepetition.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new HistoryRepetition());
  }
}

export const historyRepetitionRoute: Routes = [
  {
    path: '',
    component: HistoryRepetitionComponent,
    data: {
      authorities: [Authority.TUTOR],
      pageTitle: 'repetitionWebApp.historyRepetition.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
