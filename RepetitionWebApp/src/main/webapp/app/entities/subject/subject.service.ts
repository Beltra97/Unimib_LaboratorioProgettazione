import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { ISubject } from 'app/shared/model/subject.model';

type EntityResponseType = HttpResponse<ISubject>;
type EntityArrayResponseType = HttpResponse<ISubject[]>;

@Injectable({ providedIn: 'root' })
export class SubjectService {
  public resourceUrl = SERVER_API_URL + 'api/subjects';
  public mySubjectsResourceUrl = SERVER_API_URL + 'api/my-subjects';

  constructor(protected http: HttpClient) {}

  create(subject: ISubject): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subject);
    return this.http
      .post<ISubject>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(subject: ISubject): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(subject);
    return this.http
      .put<ISubject>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<ISubject>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISubject[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  queryMySubjects(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<ISubject[]>(this.mySubjectsResourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(subject: ISubject): ISubject {
    const copy: ISubject = Object.assign({}, subject, {
      dateCreated: subject.dateCreated && subject.dateCreated.isValid() ? subject.dateCreated.toJSON() : undefined,
      dateModified: subject.dateModified && subject.dateModified.isValid() ? subject.dateModified.toJSON() : undefined,
      dateDeleted: subject.dateDeleted && subject.dateDeleted.isValid() ? subject.dateDeleted.toJSON() : undefined,
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
      res.body.forEach((subject: ISubject) => {
        subject.dateCreated = subject.dateCreated ? moment(subject.dateCreated) : undefined;
        subject.dateModified = subject.dateModified ? moment(subject.dateModified) : undefined;
        subject.dateDeleted = subject.dateDeleted ? moment(subject.dateDeleted) : undefined;
      });
    }
    return res;
  }
}
