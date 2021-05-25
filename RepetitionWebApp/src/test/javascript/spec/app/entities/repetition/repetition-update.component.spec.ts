import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { RepetitionUpdateComponent } from 'app/entities/repetition/repetition-update.component';
import { RepetitionService } from 'app/entities/repetition/repetition.service';
import { Repetition } from 'app/shared/model/repetition.model';

describe('Component Tests', () => {
  describe('Repetition Management Update Component', () => {
    let comp: RepetitionUpdateComponent;
    let fixture: ComponentFixture<RepetitionUpdateComponent>;
    let service: RepetitionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [RepetitionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(RepetitionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RepetitionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RepetitionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Repetition(123);
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
        const entity = new Repetition();
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
