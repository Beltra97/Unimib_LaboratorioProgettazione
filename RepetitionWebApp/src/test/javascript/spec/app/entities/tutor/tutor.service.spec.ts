import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { TutorService } from 'app/entities/tutor/tutor.service';
import { ITutor, Tutor } from 'app/shared/model/tutor.model';

describe('Service Tests', () => {
  describe('Tutor Service', () => {
    let injector: TestBed;
    let service: TutorService;
    let httpMock: HttpTestingController;
    let elemDefault: ITutor;
    let expectedResult: ITutor | ITutor[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(TutorService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Tutor(0, 'AAAAAAA', 'AAAAAAA', currentDate, 'AAAAAAA', currentDate, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            birthDate: currentDate.format(DATE_TIME_FORMAT),
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

      it('should create a Tutor', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            birthDate: currentDate.format(DATE_TIME_FORMAT),
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            dateDeleted: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthDate: currentDate,
            dateCreated: currentDate,
            dateModified: currentDate,
            dateDeleted: currentDate,
          },
          returnedFromService
        );

        service.create(new Tutor()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Tutor', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            surname: 'BBBBBB',
            birthDate: currentDate.format(DATE_TIME_FORMAT),
            degree: 'BBBBBB',
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            dateDeleted: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthDate: currentDate,
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

      it('should return a list of Tutor', () => {
        const returnedFromService = Object.assign(
          {
            name: 'BBBBBB',
            surname: 'BBBBBB',
            birthDate: currentDate.format(DATE_TIME_FORMAT),
            degree: 'BBBBBB',
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            dateDeleted: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            birthDate: currentDate,
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

      it('should delete a Tutor', () => {
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
