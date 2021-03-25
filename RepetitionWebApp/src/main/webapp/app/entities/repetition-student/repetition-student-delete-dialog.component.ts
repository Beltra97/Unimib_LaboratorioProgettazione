import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepetitionStudent } from 'app/shared/model/repetition-student.model';
import { RepetitionStudentService } from './repetition-student.service';

@Component({
  templateUrl: './repetition-student-delete-dialog.component.html',
})
export class RepetitionStudentDeleteDialogComponent {
  repetitionStudent?: IRepetitionStudent;

  constructor(
    protected repetitionStudentService: RepetitionStudentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.repetitionStudentService.delete(id).subscribe(() => {
      this.eventManager.broadcast('repetitionStudentListModification');
      this.activeModal.close();
    });
  }
}
