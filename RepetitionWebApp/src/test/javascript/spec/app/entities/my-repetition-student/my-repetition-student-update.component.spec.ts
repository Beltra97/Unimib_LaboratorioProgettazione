import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { MyRepetitionStudentUpdateComponent } from 'app/entities/my-repetition-student/my-repetition-student-update.component';
import { MyRepetitionStudentService } from 'app/entities/my-repetition-student/my-repetition-student.service';
import { MyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';

describe('Component Tests', () => {
  describe('MyRepetitionStudent Management Update Component', () => {
    let comp: MyRepetitionStudentUpdateComponent;
    let fixture: ComponentFixture<MyRepetitionStudentUpdateComponent>;
    let service: MyRepetitionStudentService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [MyRepetitionStudentUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MyRepetitionStudentUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MyRepetitionStudentUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MyRepetitionStudentService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MyRepetitionStudent(123);
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
        const entity = new MyRepetitionStudent();
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
