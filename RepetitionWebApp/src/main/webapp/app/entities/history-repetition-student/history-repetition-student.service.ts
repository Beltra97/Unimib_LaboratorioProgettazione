import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IHistoryRepetitionStudent } from 'app/shared/model/history-repetition-student.model';

type EntityResponseType = HttpResponse<IHistoryRepetitionStudent>;
type EntityArrayResponseType = HttpResponse<IHistoryRepetitionStudent[]>;

@Injectable({ providedIn: 'root' })
export class HistoryRepetitionStudentService {
  public resourceUrl = SERVER_API_URL + 'api/history-repetition-students';

  constructor(protected http: HttpClient) {}

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IHistoryRepetitionStudent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IHistoryRepetitionStudent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

}
