import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRepetitionStudent } from 'app/shared/model/repetition-student.model';

type EntityResponseType = HttpResponse<IRepetitionStudent>;
type EntityArrayResponseType = HttpResponse<IRepetitionStudent[]>;

@Injectable({ providedIn: 'root' })
export class RepetitionStudentService {
  public resourceUrl = SERVER_API_URL + 'api/repetition-students';

  constructor(protected http: HttpClient) {}

  create(repetitionStudent: IRepetitionStudent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(repetitionStudent);
    return this.http
      .post<IRepetitionStudent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(repetitionStudent: IRepetitionStudent): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(repetitionStudent);
    return this.http
      .put<IRepetitionStudent>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRepetitionStudent>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRepetitionStudent[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(repetitionStudent: IRepetitionStudent): IRepetitionStudent {
    const copy: IRepetitionStudent = Object.assign({}, repetitionStudent, {
      dateCreated:
        repetitionStudent.dateCreated && repetitionStudent.dateCreated.isValid() ? repetitionStudent.dateCreated.toJSON() : undefined,
      dateModified:
        repetitionStudent.dateModified && repetitionStudent.dateModified.isValid() ? repetitionStudent.dateModified.toJSON() : undefined,
      dateDeleted:
        repetitionStudent.dateDeleted && repetitionStudent.dateDeleted.isValid() ? repetitionStudent.dateDeleted.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateCreated = res.body.dateCreated ? moment(res.body.dateCreated) : undefined;
      res.body.dateModified = res.body.dateModified ? moment(res.body.dateModified) : undefined;
      res.body.dateDeleted = res.body.dateDeleted ? moment(res.body.dateDeleted) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((repetitionStudent: IRepetitionStudent) => {
        repetitionStudent.dateCreated = repetitionStudent.dateCreated ? moment(repetitionStudent.dateCreated) : undefined;
        repetitionStudent.dateModified = repetitionStudent.dateModified ? moment(repetitionStudent.dateModified) : undefined;
        repetitionStudent.dateDeleted = repetitionStudent.dateDeleted ? moment(repetitionStudent.dateDeleted) : undefined;
      });
    }
    return res;
  }
}
