import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ITutor } from 'app/shared/model/tutor.model';
import { TutorService } from './tutor.service';
import { TutorDeleteDialogComponent } from './tutor-delete-dialog.component';

@Component({
  selector: 'jhi-tutor',
  templateUrl: './tutor.component.html',
})
export class TutorComponent implements OnInit, OnDestroy {
  tutors?: ITutor[];
  eventSubscriber?: Subscription;

  constructor(protected tutorService: TutorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.tutorService.query().subscribe((res: HttpResponse<ITutor[]>) => (this.tutors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInTutors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ITutor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInTutors(): void {
    this.eventSubscriber = this.eventManager.subscribe('tutorListModification', () => this.loadAll());
  }

  delete(tutor: ITutor): void {
    const modalRef = this.modalService.open(TutorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.tutor = tutor;
  }
}
