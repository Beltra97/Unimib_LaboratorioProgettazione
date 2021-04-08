import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { MyRepetitionStudentComponent } from 'app/entities/my-repetition-student/my-repetition-student.component';
import { MyRepetitionStudentService } from 'app/entities/my-repetition-student/my-repetition-student.service';
import { MyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';

describe('Component Tests', () => {
  describe('MyRepetitionStudent Management Component', () => {
    let comp: MyRepetitionStudentComponent;
    let fixture: ComponentFixture<MyRepetitionStudentComponent>;
    let service: MyRepetitionStudentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [MyRepetitionStudentComponent],
      })
        .overrideTemplate(MyRepetitionStudentComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MyRepetitionStudentComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MyRepetitionStudentService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new MyRepetitionStudent(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.myRepetitionStudents && comp.myRepetitionStudents[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
