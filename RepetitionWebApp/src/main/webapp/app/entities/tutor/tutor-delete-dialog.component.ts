import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITutor } from 'app/shared/model/tutor.model';
import { TutorService } from './tutor.service';

@Component({
  templateUrl: './tutor-delete-dialog.component.html',
})
export class TutorDeleteDialogComponent {
  tutor?: ITutor;

  constructor(protected tutorService: TutorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tutorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('tutorListModification');
      this.activeModal.close();
    });
  }
}
