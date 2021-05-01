import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRepetition } from 'app/shared/model/repetition.model';
import { RepetitionService } from './repetition.service';

@Component({
  templateUrl: './repetition-delete-dialog.component.html',
})
export class RepetitionDeleteDialogComponent {
  repetition?: IRepetition;

  constructor(
    protected repetitionService: RepetitionService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.repetitionService.delete(id).subscribe(() => {
      this.eventManager.broadcast('repetitionListModification');
      this.activeModal.close();
    });
  }
}
