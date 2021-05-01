import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { RepetitionStudentUpdateComponent } from 'app/entities/repetition-student/repetition-student-update.component';
import { RepetitionStudentService } from 'app/entities/repetition-student/repetition-student.service';
import { RepetitionStudent } from 'app/shared/model/repetition-student.model';

describe('Component Tests', () => {
  describe('RepetitionStudent Management Update Component', () => {
    let comp: RepetitionStudentUpdateComponent;
    let fixture: ComponentFixture<RepetitionStudentUpdateComponent>;
    let service: RepetitionStudentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [RepetitionStudentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RepetitionStudentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepetitionStudentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepetitionStudentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new RepetitionStudent(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new RepetitionStudent();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
