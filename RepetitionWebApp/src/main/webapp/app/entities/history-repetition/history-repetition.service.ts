import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistoryRepetition } from 'app/shared/model/history-repetition.model';

type EntityResponseType = HttpResponse<IHistoryRepetition>;
type EntityArrayResponseType = HttpResponse<IHistoryRepetition[]>;

@Injectable({ providedIn: 'root' })
export class HistoryRepetitionService {
  public resourceUrl = SERVER_API_URL + 'api/history-repetition';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHistoryRepetition>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHistoryRepetition[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

}
