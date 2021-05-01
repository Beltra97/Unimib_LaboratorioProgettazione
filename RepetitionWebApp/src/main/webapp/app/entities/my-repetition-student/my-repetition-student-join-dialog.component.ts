import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';
import { MyRepetitionStudentService } from './my-repetition-student.service';

@Component({
  templateUrl: './my-repetition-student-join-dialog.component.html',
})
export class MyRepetitionStudentJoinDialogComponent {
  myRepetitionStudent?: IMyRepetitionStudent;

  constructor(
    protected myRepetitionStudentService: MyRepetitionStudentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmJoin(myRepetitionStudent: IMyRepetitionStudent): void {
    this.myRepetitionStudentService.create(myRepetitionStudent).subscribe(() => {
      this.eventManager.broadcast('myRepetitionStudentListModification');
      this.activeModal.close();
    });
  }
}
