import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMyRepetitionStudent } from 'app/shared/model/my-repetition-student.model';
import { MyRepetitionStudentService } from './my-repetition-student.service';

@Component({
  templateUrl: './my-repetition-student-update-dialog.component.html',
})
export class MyRepetitionStudentUpdateDialogComponent {
  myRepetitionStudent?: IMyRepetitionStudent;
  topic: string;

  constructor(
    protected myRepetitionStudentService: MyRepetitionStudentService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {
    this.topic = "";
  }

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmBook(myRepetitionStudent: IMyRepetitionStudent): void {

    myRepetitionStudent.topic = this.topic;
    this.myRepetitionStudentService.create(myRepetitionStudent).subscribe(() => {
      this.eventManager.broadcast('myRepetitionStudentListModification');
      this.activeModal.close();
    });
  }
}
