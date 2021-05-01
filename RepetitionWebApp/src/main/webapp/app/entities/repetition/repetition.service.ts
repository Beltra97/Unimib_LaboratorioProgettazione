import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IRepetition } from 'app/shared/model/repetition.model';

type EntityResponseType = HttpResponse<IRepetition>;
type EntityArrayResponseType = HttpResponse<IRepetition[]>;

@Injectable({ providedIn: 'root' })
export class RepetitionService {
  public resourceUrl = SERVER_API_URL + 'api/repetitions';

  constructor(protected http: HttpClient) {}

  create(repetition: IRepetition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(repetition);
    return this.http
      .post<IRepetition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(repetition: IRepetition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(repetition);
    return this.http
      .put<IRepetition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IRepetition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IRepetition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(repetition: IRepetition): IRepetition {
    const copy: IRepetition = Object.assign({}, repetition, {
      dateRepetition: repetition.dateRepetition && repetition.dateRepetition.isValid() ? repetition.dateRepetition.toJSON() : undefined,
      dateCreated: repetition.dateCreated && repetition.dateCreated.isValid() ? repetition.dateCreated.toJSON() : undefined,
      dateModified: repetition.dateModified && repetition.dateModified.isValid() ? repetition.dateModified.toJSON() : undefined,
      dateDeleted: repetition.dateDeleted && repetition.dateDeleted.isValid() ? repetition.dateDeleted.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateRepetition = res.body.dateRepetition ? moment(res.body.dateRepetition) : undefined;
      res.body.dateCreated = res.body.dateCreated ? moment(res.body.dateCreated) : undefined;
      res.body.dateModified = res.body.dateModified ? moment(res.body.dateModified) : undefined;
      res.body.dateDeleted = res.body.dateDeleted ? moment(res.body.dateDeleted) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((repetition: IRepetition) => {
        repetition.dateRepetition = repetition.dateRepetition ? moment(repetition.dateRepetition) : undefined;
        repetition.dateCreated = repetition.dateCreated ? moment(repetition.dateCreated) : undefined;
        repetition.dateModified = repetition.dateModified ? moment(repetition.dateModified) : undefined;
        repetition.dateDeleted = repetition.dateDeleted ? moment(repetition.dateDeleted) : undefined;
      });
    }
    return res;
  }
}
