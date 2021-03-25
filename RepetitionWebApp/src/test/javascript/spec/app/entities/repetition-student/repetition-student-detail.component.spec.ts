import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { RepetitionStudentDetailComponent } from 'app/entities/repetition-student/repetition-student-detail.component';
import { RepetitionStudent } from 'app/shared/model/repetition-student.model';

describe('Component Tests', () => {
  describe('RepetitionStudent Management Detail Component', () => {
    let comp: RepetitionStudentDetailComponent;
    let fixture: ComponentFixture<RepetitionStudentDetailComponent>;
    const route = ({ data: of({ repetitionStudent: new RepetitionStudent(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [RepetitionStudentDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(RepetitionStudentDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RepetitionStudentDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load repetitionStudent on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.repetitionStudent).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
