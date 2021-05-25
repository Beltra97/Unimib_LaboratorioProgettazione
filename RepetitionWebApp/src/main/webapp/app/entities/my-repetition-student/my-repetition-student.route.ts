import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMyRepetitionStudent, MyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';
import { MyRepetitionStudentService } from './my-repetition-student.service';
import { MyRepetitionStudentComponent } from './my-repetition-student.component';

@Injectable({ providedIn: 'root' })
export class MyRepetitionStudentResolve implements Resolve<IMyRepetitionStudent> {
  constructor(private service: MyRepetitionStudentService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMyRepetitionStudent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((myRepetitionStudent: HttpResponse<MyRepetitionStudent>) => {
          if (myRepetitionStudent.body) {
            return of(myRepetitionStudent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new MyRepetitionStudent());
  }
}

export const myRepetitionStudentRoute: Routes = [
  {
    path: '',
    component: MyRepetitionStudentComponent,
    data: {
      authorities: [Authority.STUDENT],
      pageTitle: 'repetitionWebApp.myRepetitionStudent.home.title',
    },
    canActivate: [UserRouteAccessService],
  },
];
