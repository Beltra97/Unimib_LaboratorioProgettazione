import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IMyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';

type EntityResponseType = HttpResponse<IMyRepetitionStudent>;
type EntityArrayResponseType = HttpResponse<IMyRepetitionStudent[]>;

@Injectable({ providedIn: 'root' })
export class MyRepetitionStudentService {
  public resourceUrl = SERVER_API_URL + 'api/my-repetition-students';

  constructor(protected http: HttpClient) {}

  create(myRepetitionStudent: IMyRepetitionStudent): Observable<EntityResponseType> {
    return this.http.post<IMyRepetitionStudent>(this.resourceUrl, myRepetitionStudent, { observe: 'response' });
  }

  update(myRepetitionStudent: IMyRepetitionStudent): Observable<EntityResponseType> {
    return this.http.put<IMyRepetitionStudent>(this.resourceUrl, myRepetitionStudent, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IMyRepetitionStudent>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IMyRepetitionStudent[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
