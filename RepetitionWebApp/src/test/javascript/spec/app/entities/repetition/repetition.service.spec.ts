import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RepetitionService } from 'app/entities/repetition/repetition.service';
import { IRepetition, Repetition } from 'app/shared/model/repetition.model';

describe('Service Tests', () => {
  describe('Repetition Service', () => {
    let injector: TestBed;
    let service: RepetitionService;
    let httpMock: HttpTestingController;
    let elemDefault: IRepetition;
    let expectedResult: IRepetition | IRepetition[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RepetitionService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Repetition(0, 'AAAAAAA', 'AAAAAAA', currentDate, 0, 0, 0, 'AAAAAAA', currentDate, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            dateRepetition: currentDate.format(DATE_TIME_FORMAT),
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            dateDeleted: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Repetition', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateRepetition: currentDate.format(DATE_TIME_FORMAT),
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            dateDeleted: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateRepetition: currentDate,
            dateCreated: currentDate,
            dateModified: currentDate,
            dateDeleted: currentDate,
          },
          returnedFromService
        );

        service.create(new Repetition()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Repetition', () => {
        const returnedFromService = Object.assign(
          {
            topic: 'BBBBBB',
            additionalNote: 'BBBBBB',
            dateRepetition: currentDate.format(DATE_TIME_FORMAT),
            nPartecipants: 1,
            duration: 1,
            price: 1,
            meetingLink: 'BBBBBB',
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            dateDeleted: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateRepetition: currentDate,
            dateCreated: currentDate,
            dateModified: currentDate,
            dateDeleted: currentDate,
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Repetition', () => {
        const returnedFromService = Object.assign(
          {
            topic: 'BBBBBB',
            additionalNote: 'BBBBBB',
            dateRepetition: currentDate.format(DATE_TIME_FORMAT),
            nPartecipants: 1,
            duration: 1,
            price: 1,
            meetingLink: 'BBBBBB',
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            dateDeleted: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateRepetition: currentDate,
            dateCreated: currentDate,
            dateModified: currentDate,
            dateDeleted: currentDate,
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Repetition', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
