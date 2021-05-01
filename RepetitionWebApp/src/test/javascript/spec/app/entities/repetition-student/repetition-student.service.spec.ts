import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { RepetitionStudentService } from 'app/entities/repetition-student/repetition-student.service';
import { IRepetitionStudent, RepetitionStudent } from 'app/shared/model/repetition-student.model';

describe('Service Tests', () => {
  describe('RepetitionStudent Service', () => {
    let injector: TestBed;
    let service: RepetitionStudentService;
    let httpMock: HttpTestingController;
    let elemDefault: IRepetitionStudent;
    let expectedResult: IRepetitionStudent | IRepetitionStudent[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(RepetitionStudentService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new RepetitionStudent(0, currentDate, currentDate, currentDate);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
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

      it('should create a RepetitionStudent', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            dateDeleted: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            dateCreated: currentDate,
            dateModified: currentDate,
            dateDeleted: currentDate,
          },
          returnedFromService
        );

        service.create(new RepetitionStudent()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a RepetitionStudent', () => {
        const returnedFromService = Object.assign(
          {
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            dateDeleted: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
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

      it('should return a list of RepetitionStudent', () => {
        const returnedFromService = Object.assign(
          {
            dateCreated: currentDate.format(DATE_TIME_FORMAT),
            dateModified: currentDate.format(DATE_TIME_FORMAT),
            dateDeleted: currentDate.format(DATE_TIME_FORMAT),
          },
          elemDefault
        );

        const expected = Object.assign(
          {
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

      it('should delete a RepetitionStudent', () => {
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
