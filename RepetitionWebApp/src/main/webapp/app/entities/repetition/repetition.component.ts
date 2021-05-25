import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRepetition } from 'app/shared/model/repetition.model';
import { RepetitionService } from './repetition.service';
import { RepetitionDeleteDialogComponent } from './repetition-delete-dialog.component';

@Component({
  selector: 'jhi-repetition',
  templateUrl: './repetition.component.html',
})
export class RepetitionComponent implements OnInit, OnDestroy {
  repetitions?: IRepetition[];
  eventSubscriber?: Subscription;

  constructor(protected repetitionService: RepetitionService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.repetitionService.query().subscribe((res: HttpResponse<IRepetition[]>) => (this.repetitions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRepetitions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRepetition): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRepetitions(): void {
    this.eventSubscriber = this.eventManager.subscribe('repetitionListModification', () => this.loadAll());
  }

  delete(repetition: IRepetition): void {
    const modalRef = this.modalService.open(RepetitionDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.repetition = repetition;
  }
}
