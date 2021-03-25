import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { RepetitionStudentComponent } from 'app/entities/repetition-student/repetition-student.component';
import { RepetitionStudentService } from 'app/entities/repetition-student/repetition-student.service';
import { RepetitionStudent } from 'app/shared/model/repetition-student.model';

describe('Component Tests', () => {
  describe('RepetitionStudent Management Component', () => {
    let comp: RepetitionStudentComponent;
    let fixture: ComponentFixture<RepetitionStudentComponent>;
    let service: RepetitionStudentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [RepetitionStudentComponent],
      })
        .overrideTemplate(RepetitionStudentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepetitionStudentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepetitionStudentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RepetitionStudent(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.repetitionStudents && comp.repetitionStudents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
