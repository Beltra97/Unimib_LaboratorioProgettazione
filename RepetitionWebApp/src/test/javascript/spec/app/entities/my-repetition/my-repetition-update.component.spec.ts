import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { MyRepetitionUpdateComponent } from 'app/entities/my-repetition/my-repetition-update.component';
import { MyRepetitionService } from 'app/entities/my-repetition/my-repetition.service';
import { MyRepetition } from 'app/shared/model/my-repetition.model';

describe('Component Tests', () => {
  describe('MyRepetition Management Update Component', () => {
    let comp: MyRepetitionUpdateComponent;
    let fixture: ComponentFixture<MyRepetitionUpdateComponent>;
    let service: MyRepetitionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [MyRepetitionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MyRepetitionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MyRepetitionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MyRepetitionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new MyRepetition(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        // expect(service.update).toHaveBeenCalledWith(entity);
        // expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new MyRepetition();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        // expect(service.create).toHaveBeenCalledWith(entity);
        // expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
