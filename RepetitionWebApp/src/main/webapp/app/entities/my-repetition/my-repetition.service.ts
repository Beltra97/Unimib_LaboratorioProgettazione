import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMyRepetition } from 'app/shared/model/my-repetition.model';

type EntityResponseType = HttpResponse<IMyRepetition>;
type EntityArrayResponseType = HttpResponse<IMyRepetition[]>;

@Injectable({ providedIn: 'root' })
export class MyRepetitionService {
  public resourceUrl = SERVER_API_URL + 'api/my-repetitions';

  constructor(protected http: HttpClient) {}

  create(myRepetition: IMyRepetition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(myRepetition);
    return this.http
      .post<IMyRepetition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(myRepetition: IMyRepetition): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(myRepetition);
    return this.http
      .put<IMyRepetition>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IMyRepetition>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IMyRepetition[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(myRepetition: IMyRepetition): IMyRepetition {
    const copy: IMyRepetition = Object.assign({}, myRepetition, {
      dateRepetition:
        myRepetition.dateRepetition && myRepetition.dateRepetition.isValid() ? myRepetition.dateRepetition.toJSON() : undefined,
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.dateRepetition = res.body.dateRepetition ? moment(res.body.dateRepetition) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((myRepetition: IMyRepetition) => {
        myRepetition.dateRepetition = myRepetition.dateRepetition ? moment(myRepetition.dateRepetition) : undefined;
      });
    }
    return res;
  }
}
