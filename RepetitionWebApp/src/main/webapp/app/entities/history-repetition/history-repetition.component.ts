import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistoryRepetition } from 'app/shared/model/history-repetition.model';
import { HistoryRepetitionService } from './history-repetition.service';

@Component({
  selector: 'jhi-history-repetition',
  templateUrl: './history-repetition.component.html',
})
export class HistoryRepetitionComponent implements OnInit, OnDestroy {
  historyRepetitions?: IHistoryRepetition[];
  eventSubscriber?: Subscription;

  constructor(
    protected historyRepetitionService: HistoryRepetitionService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.historyRepetitionService
      .query()
      .subscribe((res: HttpResponse<IHistoryRepetition[]>) => (this.historyRepetitions = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInHistoryRepetitions();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IHistoryRepetition): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInHistoryRepetitions(): void {
    this.eventSubscriber = this.eventManager.subscribe('historyRepetitionListModification', () => this.loadAll());
  }

}
