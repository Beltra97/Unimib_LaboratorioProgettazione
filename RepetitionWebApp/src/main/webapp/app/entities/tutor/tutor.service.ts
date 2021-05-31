import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ITutor } from 'app/shared/model/tutor.model';

type EntityResponseType = HttpResponse<ITutor>;
type EntityArrayResponseType = HttpResponse<ITutor[]>;

@Injectable({ providedIn: 'root' })
export class TutorService {
  public resourceUrl = SERVER_API_URL + 'api/tutors';

  constructor(protected http: HttpClient) {}

  create(tutor: ITutor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tutor);
    return this.http
      .post<ITutor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(tutor: ITutor): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(tutor);
    return this.http
      .put<ITutor>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ITutor>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  getTutorByUser(): Observable<EntityResponseType> {
    return this.http
      .get<ITutor>(`${this.resourceUrl}-user`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ITutor[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(tutor: ITutor): ITutor {
    const copy: ITutor = Object.assign({}, tutor, {
      birthDate: tutor.birthDate && tutor.birthDate.isValid() ? tutor.birthDate.toJSON() : undefined,
      dateCreated: tutor.dateCreated && tutor.dateCreated.isValid() ? tutor.dateCreated.toJSON() : undefined,
      dateModified: tutor.dateModified && tutor.dateModified.isValid() ? tutor.dateModified.toJSON() : undefined,
      dateDeleted: tutor.dateDeleted && tutor.dateDeleted.isValid() ? tutor.dateDeleted.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.birthDate = res.body.birthDate ? moment(res.body.birthDate) : undefined;
      res.body.dateCreated = res.body.dateCreated ? moment(res.body.dateCreated) : undefined;
      res.body.dateModified = res.body.dateModified ? moment(res.body.dateModified) : undefined;
      res.body.dateDeleted = res.body.dateDeleted ? moment(res.body.dateDeleted) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((tutor: ITutor) => {
        tutor.birthDate = tutor.birthDate ? moment(tutor.birthDate) : undefined;
        tutor.dateCreated = tutor.dateCreated ? moment(tutor.dateCreated) : undefined;
        tutor.dateModified = tutor.dateModified ? moment(tutor.dateModified) : undefined;
        tutor.dateDeleted = tutor.dateDeleted ? moment(tutor.dateDeleted) : undefined;
      });
    }
    return res;
  }
}
