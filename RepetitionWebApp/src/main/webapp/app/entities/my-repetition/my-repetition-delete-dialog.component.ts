import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMyRepetition } from 'app/shared/model/my-repetition.model';
import { MyRepetitionService } from './my-repetition.service';

@Component({
  templateUrl: './my-repetition-delete-dialog.component.html',
})
export class MyRepetitionDeleteDialogComponent {
  myRepetition?: IMyRepetition;

  constructor(
    protected myRepetitionService: MyRepetitionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.myRepetitionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('myRepetitionListModification');
      this.activeModal.close();
    });
  }
}
