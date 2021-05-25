import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';
import { MyRepetitionStudentService } from './my-repetition-student.service';

@Component({
  templateUrl: './my-repetition-student-delete-dialog.component.html',
})
export class MyRepetitionStudentDeleteDialogComponent {
  myRepetitionStudent?: IMyRepetitionStudent;

  constructor(
    protected myRepetitionStudentService: MyRepetitionStudentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.myRepetitionStudentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('myRepetitionStudentListModification');
      this.activeModal.close();
    });
  }
}
