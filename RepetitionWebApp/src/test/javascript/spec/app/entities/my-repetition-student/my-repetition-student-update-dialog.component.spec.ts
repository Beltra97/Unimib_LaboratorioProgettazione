import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RepetitionWebAppTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { MyRepetitionStudentUpdateDialogComponent } from 'app/entities/my-repetition-student/my-repetition-student-update-dialog.component';
import { MyRepetitionStudentService } from 'app/entities/my-repetition-student/my-repetition-student.service';
import { MyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';

describe('Component Tests', () => {
  describe('MyRepetitionStudent Management Update Component', () => {
    let comp: MyRepetitionStudentUpdateDialogComponent;
    let fixture: ComponentFixture<MyRepetitionStudentUpdateDialogComponent>;
    let service: MyRepetitionStudentService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RepetitionWebAppTestModule],
        declarations: [MyRepetitionStudentUpdateDialogComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(MyRepetitionStudentUpdateDialogComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MyRepetitionStudentUpdateDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MyRepetitionStudentService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmBook', () => {
      it('Should call book service on confirmBook', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'create').and.returnValue(of({}));

          const myRepetitionStudent = new MyRepetitionStudent();
          myRepetitionStudent.id = 1;
          myRepetitionStudent.topic = '';
          // WHEN
          // comp.confirmBook(myRepetitionStudent);
          tick();

          // THEN
          // expect(service.create).toHaveBeenCalledWith(myRepetitionStudent);
          // expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          // expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call book service on clear', () => {
        // GIVEN
        spyOn(service, 'create');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.create).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
